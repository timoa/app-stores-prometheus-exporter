#!/usr/bin/env node
'use strict';
const http = require('http');

const prometheus = require('./lib/prometheus');

// Init the Prometheus metrics
prometheus.init();

function getPayload() {
  return new Promise(resolve => {
    prometheus.getMetrics()
      .then(data => {
        resolve(data);
      })
      .catch(console.log);
  })
    .catch(console.log);
}

// Create Server
const server = http.createServer();

// The default port for this Exporter is 9514
// https://github.com/prometheus/prometheus/wiki/Default-port-allocations
server.listen(9514);
server.setTimeout(30000);

server.on('request', async (req, res) => {
  // Only allowed to poll prometheus metrics.
  if (req.method !== 'GET' && req.url !== '/metrics') {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    return res.end('Not Found.');
  }
  
  await getPayload()
    .then(payload => {
      res.setHeader('Content-Type', prometheus.getContentType());
      return res.end(payload);
    })
    .catch(() => {
      res.writeHead(500, { 'Content-Type': 'text/html' });
      return res.end('Server Error');
    });
});

server.on('listening', (port) => {
  console.log(`Prometheus App Stores Exporter is listening on http://localhost:${server.address().port}`);
});

// Graceful shutdown
const shutdown = () => {
  server.close(() => {
    process.exit(0);
  });
};
process.on('SIGTERM', () => shutdown());
process.on('SIGINT', () => shutdown());

if (typeof process === 'object') {
  process.on('unhandledRejection', (error, promise) => {
    console.error("== Node detected an unhandled rejection! ==");
    console.error(error.stack);
  });
}

