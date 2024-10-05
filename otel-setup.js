const { NodeSDK } = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
const { diag, DiagConsoleLogger, DiagLogLevel } = require('@opentelemetry/api');

// Configure diagnostic logging for OpenTelemetry
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

// Set up the OpenTelemetry SDK
const sdk = new NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'my-node-api',
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

// Start OpenTelemetry SDK
sdk.start()
  .then(() => {
    console.log('OpenTelemetry SDK initialized');
  })
  .catch((error) => {
    console.error('Error initializing OpenTelemetry SDK', error);
  });

// Gracefully shutdown OpenTelemetry on exit
process.on('SIGTERM', () => {
  sdk.shutdown()
    .then(() => console.log('SDK shut down successfully'))
    .catch((error) => console.log('Error shutting down SDK', error));
});
