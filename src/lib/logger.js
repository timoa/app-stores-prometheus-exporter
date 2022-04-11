const { createLogger, format, transports } = require('winston');
const uuid = require('uuid');

const env = process.env.NODE_ENV || 'development';
const correlationId = uuid.v1();

const logger = createLogger({
  level: env === 'development' ? 'debug' : 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.json(),
  ),
  transports: [
    new transports.Console({
      level: 'info',
      format: format.combine(
        format.colorize(),
        format.printf(
          (info) => `${correlationId} | ${info.timestamp} | ${info.level}: ${info.message}`,
        ),
      ),
    }),
  ],
});

module.exports = logger;
