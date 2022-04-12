const client = require('prom-client');

// Stores
const itunes = require('app-store-scraper');
const gplay = require('google-play-scraper');

// Config files
const config = require('../../config/config.json');
const apps = require('../../config/apps.json');
const metrics = require('../config/metrics.json');

const register = new client.Registry();

// Collect Scrape Metrics (duration, memory/CPU used, etc.)
// https://prometheus.io/docs/instrumenting/writing_exporters/#metrics-about-the-scrape-itself
client.collectDefaultMetrics({ register });

const gauges = {};

/**
 * Get enabled metrics from the config file
 * and compatible based on the store
 *
 * @param {String} store
 * @returns
 */
function getEnabledMetrics(store) {
  const enabledMetrics = [];
  Object.keys(config.metrics).forEach((metric) => {
    if (config.metrics[metric] && metrics[metric].compatibility.includes(store)) {
      enabledMetrics.push(metric);
    }
  });

  return enabledMetrics;
}

/**
 * Create a configurable Prometheus gauge
 *
 * @param {Object} opt
 * @returns
 */
function createGauge(opt) {
  const gauge = new client.Gauge({
    name: opt.name,
    help: opt.help,
    labelNames: ['store', 'country', 'app', 'version'],
  });

  register.registerMetric(gauge);

  return gauge;
}

/**
 * Map date that come from the store scrapers
 * and map them to the Prometheus metrics
 * TODO: Create a mapper based on a config file maybe
 *
 * @param {String} name
 * @param {Object} data
 * @returns
 */
function mapDataToMetric(name, data) {
  let metric = 0;
  if (name === 'ratings1') {
    metric = data.histogram['1'];
  } else if (name === 'ratings2') {
    metric = data.histogram['2'];
  } else if (name === 'ratings3') {
    metric = data.histogram['3'];
  } else if (name === 'ratings4') {
    metric = data.histogram['4'];
  } else if (name === 'ratings5') {
    metric = data.histogram['5'];
  }

  return metric;
}

/**
 * Set the Prometheus metrics on existing gauges
 *
 * @param {String} store
 * @param {String} country
 * @param {Object} data
 * @returns
 */
function setMetrics(store, country, data) {
  return new Promise((resolve, reject) => {
    try {
      getEnabledMetrics(store).forEach((metric) => {
        gauges[metric].set({
          store,
          country,
          app: data.appId,
          version: data.version,
        }, (data[metric]) ? data[metric] : mapDataToMetric(metric, data));
      });
      resolve();
    } catch (err) {
      reject(new Error(`Prometheus Client error when setting a metric for the app "${data.appId}" (${store}/${country}): ${err.message}`));
    }
  });
}

/**
 * Create the App Store or Google Play scrapper config
 *
 * @param {String} store
 * @param {Object} opt
 * @param {String} opt.appId
 * @param {String} opt.country
 * @returns
 */
function getScrapperConfig(store, opt) {
  const conf = {
    appId: opt.appId,
    country: opt.country,
  };

  if (store === 'itunes') {
    conf.ratings = true;
  }

  return conf;
}

/**
 * Get the data from a specific store and app
 *
 * @param {String} store
 * @param {Object} opt
 * @returns
 */
function getAppData(store, opt) {
  return new Promise((resolve, reject) => {
    // Default is itunes
    let scrapper = itunes;

    // If store is gplay, use gplay
    if (store === 'gplay') {
      scrapper = gplay;
    }

    // Get the scraper data
    scrapper.app(getScrapperConfig(store, opt))
      .then((data) => {
        setMetrics(store, opt.country, data)
          .then(resolve)
          .catch(reject);
      })
      .catch((err) => {
        reject(new Error(`${store} Scraper error for the app "${opt.appId}" (${opt.country}): ${err.message}`));
      });
  });
}

/**
 * Get the data form all apps from a specific store
 *
 * @param {String} store
 */
function getAppsData(store) {
  return new Promise((resolve, reject) => {
    const promises = apps[store].map((opt) => getAppData(store, opt));

    Promise.all(promises)
      .then(resolve)
      .catch((err) => {
        reject(new Error(err.message));
      });
  });
}

/**
 * Get the data from all the apps and stores
 *
 * @returns
 */
function getStoresData() {
  return new Promise((resolve, reject) => {
    if (config.stores.includes('itunes')) {
      Promise.resolve(getAppsData('itunes'))
        .then(resolve)
        .catch((err) => {
          reject(new Error(err.message));
        });
    }
    if (config.stores.includes('gplay')) {
      Promise.resolve(getAppsData('gplay'))
        .then(resolve)
        .catch((err) => {
          reject(new Error(err.message));
        });
    }
    resolve();
  });
}

/**
 * Create the gauges based on the config file
 *
 * @returns
 */
function init() {
  // Load the stores enabled
  config.stores.forEach((store) => {
    // Metrics enabled only
    Object.keys(config.metrics).forEach((metric) => {
      if (!gauges[metric] && getEnabledMetrics(store).includes(metric)) {
        // Create gauge
        gauges[metric] = createGauge({
          name: metrics[metric].name,
          help: metrics[metric].help,
        });
      }
    });
  });
}

module.exports = {
  // Create Prometheus gauges
  init,

  // Get the Prometheus metrics
  getMetrics: () => new Promise((resolve, reject) => {
    getStoresData()
      .then(() => {
        resolve(register.metrics());
      })
      .catch(reject);
  }),

  // Get the Prometheus Export content type with format revision
  getContentType: register.contentType,

};
