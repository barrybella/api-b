const { createLogger, format, transports } = require('winston');
const { diag } = require('@opentelemetry/api');


// Configure Winston logger
const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  defaultMeta: { service: 'service-b' },
  transports: [
    new transports.Console()
  ]
});

// Function to log OpenTelemetry diagnostics
diag.setLogger({
  error: (msg) => logger.error(msg),
  warn: (msg) => logger.warn(msg),
  info: (msg) => logger.info(msg),
  debug: (msg) => logger.debug(msg)
});

module.exports = logger;



/*const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'your-service-name' },
    transports: [
        new winston.transports.Console(),
        // Vous pouvez ajouter d'autres transports (fichiers, base de données, etc.)
    ],
});

module.exports = logger;*/
