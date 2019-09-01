
const http = require('http');
const fs = require('fs');
const path = require('path');

const logger = require('./lib/logger');

// Check if there is a `apps.json` in the config folder
if (!fs.existsSync(path.resolve(__dirname, '../config/apps.json'))) {
  logger.error('Please copy the file "src/examples/apps.json" => "config/apps.json"');
  process.exit(1);
}

// Check if there is a `config.json` in the config folder
if (!fs.existsSync(path.resolve(__dirname, '../config/config.json'))) {
  logger.error('Please copy the file "src/examples/config.json" => "config/config.json"');
  process.exit(1);
}

const prometheus = require('./lib/prometheus');

// Init the Prometheus metrics
prometheus.init();

function getPayload() {
  return new Promise((resolve, reject) => {
    prometheus.getMetrics()
      .then(resolve)
      .catch((err) => {
        reject(err.message);
      });
  });
}

// Create the HTTP Server
const server = http.createServer();

// The default port for this Prometheus exporter is 9514
// https://github.com/prometheus/prometheus/wiki/Default-port-allocations
server.listen(9514);
server.setTimeout(30000);

server.on('request', (req, res) => {
  if (req.method === 'GET' && req.url === '/metrics') {
    getPayload()
      .then((payload) => {
        res.setHeader('Content-Type', prometheus.getContentType);
        res.end(payload);
      })
      .catch((err) => {
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end(err);
      });
  } else if (req.method === 'HEAD') { // Healthcheck
    res.writeHead(204, { 'Content-Type': 'text/html' });
    res.end('ok');
  } else { // Only allowed to poll prometheus metrics
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('Not Found.');
  }
});

server.on('listening', () => {
  logger.info(`Prometheus App Stores Exporter is listening on http://localhost:${server.address().port}`);
});

// Graceful shutdown
const shutdown = () => {
  server.close(() => {
    process.exit(0);
  });
};
process.on('SIGTERM', () => shutdown());
process.on('SIGINT', () => shutdown());

module.exports = server;
