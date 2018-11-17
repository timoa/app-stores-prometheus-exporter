'use strict';

const client = require('prom-client');

// Stores
const itunes = require('app-store-scraper');
const gplay = require('google-play-scraper');

// Config files
const config = require('../config/config.json');
const metrics = require('../config/metrics.json');
const apps = require('../config/apps.json')

const register = new client.Registry();

// Collect Scrape Metrics (duration, memory/CPU used, etc.)
// https://prometheus.io/docs/instrumenting/writing_exporters/#metrics-about-the-scrape-itself
client.collectDefaultMetrics({ register });

let gauges = {};

function getEnabledMetrics(store) {
  let enabledMetrics = [];
  for (let metric in config.metrics) {
    if (config.metrics[metric] && metrics[metric].compatibility.includes(store)) {
      enabledMetrics.push(metric);
    }
  }
  return enabledMetrics;
}

function createGauge(opt) {
  const gauge = new client.Gauge({
    name: opt.name,
    help: opt.help,
    labelNames: ['store', 'country', 'app', 'version']
  });

  register.registerMetric(gauge);

  return gauge;
}

function mapDataToMetric(name, data) {
  let metric = 0;
  if (name === 'ratings1') {
    metric = data.histogram['1'];
  } else if(name === 'ratings2') {
    metric = data.histogram['2'];
  } else if(name === 'ratings3') {
    metric = data.histogram['3'];
  } else if(name === 'ratings4') {
    metric = data.histogram['4'];
  } else if(name === 'ratings5') {
    metric = data.histogram['5'];
  } 

  return metric;
}

function setMetrics(store, country, data) {
  return new Promise(resolve => {
    getEnabledMetrics(store).forEach((metric) => {
      gauges[metric].set({ store: store, country: country, app: data.appId, version: data.version }, (data[metric]) ? data[metric] : mapDataToMetric(metric, data));
    });
    resolve();
  })
  .catch(console.log);
}

function getAppData(store, opt) {
  return new Promise(resolve => {
    if(store === 'itunes') {
      itunes.app({
        appId: opt.appId,
        country: opt.country // TODO: Support more countries
      })
      .then((data) => {
        setMetrics(store, opt.country, data) // TODO: Support more countries
        .then(() => {
          resolve();
        })
        .catch(console.log);     
      })
      .catch(console.log);
    }

    if(store === 'gplay') {
      gplay.app({
        appId: opt.appId,
        country: opt.country // TODO: Support more countries
      })
      .then((data) => {
        setMetrics(store, opt.country, data) // TODO: Support more countries
        .then(() => {
          resolve();
        })
        .catch(console.log);     
      })
      .catch(console.log);
    }
    
  })
  .catch(console.log);
}

async function getAppsData(store) {
  const promises = apps[store].map((opt) => {
    return getAppData(store, opt);
  });

  await Promise.all(promises)
    .catch(console.log);
}

function getStoresData() {
  return new Promise(async (resolve) => {
    if (config.stores.includes('itunes')) {
      await getAppsData('itunes')
        .catch(console.log);
    }
    if (config.stores.includes('gplay')) {
      await getAppsData('gplay')
      .catch(console.log);
    }
    resolve();
  })
    .catch(console.log);
}

// Create the gauges based on the config files
function init() {
  // Load the stores enabled
  config.stores.forEach((store) => {
    // Metrics enabled only
    for (let metric in config.metrics) {
      if(!gauges[metric] && getEnabledMetrics(store).includes(metric)) {
        // Create gauge
        gauges[metric] = createGauge({
          name: metrics[metric].name,
          help: metrics[metric].help
        });
      }
    }
  });
}



module.exports = {
  'init': () => {
    init();
  },

  'getMetrics': () => {
    return new Promise(resolve => {
      getStoresData()
        .then(() => {
          resolve(register.metrics());
        });
    })
      .catch(console.log);
  },

  'getContentType': () => {
    return register.contentType;
  }
}
