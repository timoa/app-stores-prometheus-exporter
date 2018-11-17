'use strict';

const client = require('prom-client');

const itunes = require('app-store-scraper');
const gplay = require('google-play-scraper');

const config = require('../config/config.json');
const metrics = require('../config/metrics.json');
const apps = require('../config/apps.json')

const register = new client.Registry();

// Collect Scrape Metrics (duration, memory/CPU used, etc.)
// https://prometheus.io/docs/instrumenting/writing_exporters/#metrics-about-the-scrape-itself
client.collectDefaultMetrics({
  prefix: 'appstores_',
  register
});

let gauges = {};

function createGauge(opt) {
  const gauge = new client.Gauge({
    name: opt.name,
    help: opt.help,
    labelNames: ['app', 'country', 'version']
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
    for (let metric in config.metrics[store]) {
      gauges[store][metric].set({ app: data.appId, country: country, version: data.version }, (data[metric]) ? data[metric] : mapDataToMetric(metric, data));
    }
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
    gauges[store] = {};
    // Metrics enabled only
    for (let metric in config.metrics[store]) {
      // Create gauge
      gauges[store][metric] = createGauge({
        name: metrics[store][metric].name,
        help: metrics[store][metric].help
      });
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
