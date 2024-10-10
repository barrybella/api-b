const { createLogger, format, transports } = require('winston');
const { diag } = require('@opentelemetry/api');

const winston = require('winston');
const LokiTransport = require('winston-loki'); // Assurez-vous que l'importation est correcte

// Configure Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'isoDateTime' }), // Ajouter un timestamp ISO
    winston.format.json() // Formater les logs en JSON
  ),
  transports: [
    new winston.transports.Console(),
    new LokiTransport({
      host: 'http://loki:3100', // Ou l'URL de votre serveur Loki
      json: true,
      labels: { services: 'service-b' },
    }),
  ],
});

// Function to log OpenTelemetry diagnostics
diag.setLogger({
  error: (msg) => logger.error(msg),
  warn: (msg) => logger.warn(msg),
  info: (msg) => logger.info(msg),
  debug: (msg) => logger.debug(msg)
});

module.exports =  logger;




