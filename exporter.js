
const http = require('http');
const fs = require('fs');
const path = require('path');

// Check if apps.sample.json has been renamed
if (!fs.existsSync(path.resolve(__dirname, 'config/apps.json'))) {
  console.log('Please rename the file "config/apps.sample.json" => "config/apps.json"');
  process.exit(0);
}

// Check if config.sample.json has been renamed
if (!fs.existsSync(path.resolve(__dirname, 'config/config.json'))) {
  console.log('Please rename the file "config/config.sample.json" => "config/config.json"');
  process.exit(0);
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
  let response = {};
  // Only allowed to poll prometheus metrics.
  if (req.method !== 'GET' && req.url !== '/metrics') {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    response = 'Not Found.';
  }

  getPayload()
    .then((payload) => {
      res.setHeader('Content-Type', prometheus.getContentType());
      response = payload;
    })
    .catch((err) => {
      res.writeHead(500, { 'Content-Type': 'text/html' });
      response = err;
    });

  return res.end(response);
});

server.on('listening', () => {
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
