const { NodeSDK } = require('@opentelemetry/sdk-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');
/*const traceExporter = new OTLPTraceExporter({
  serviceName: 'service-a',
  endpoint: 'http://localhost:4318', // URL de votre collecteur OpenTelemetry
  logSpans: true,
});
const jaegerExporter = new JaegerExporter({
  serviceName: 'service-a',
  endpoint: 'http://localhost:14268/api/traces', // endpoint pour envoyer des traces à Jaeger
});

const sdk = new NodeSDK({
  traceExporter,
 // traceExporter: jaegerExporter,
  instrumentations: [getNodeAutoInstrumentations()],
});/*



/*const sdk = new NodeSDK({
  traceExporter: jaegerExporter,
  instrumentations: [
    // Ajouter les instrumentations pour express, http, etc.
    // Exemple :
    // new ExpressInstrumentation(),
    // new HttpInstrumentation()
  ],
});*/

const sdk = new NodeSDK({
  traceExporter: new JaegerExporter({
    serviceName: 'service-b', // Remplacez par le nom de votre service
    endpoint: 'http://jaeger:14268/api/traces', // Assurez-vous que le service Jaeger est accessible
  }),
  instrumentations: [
    new HttpInstrumentation(),
    new ExpressInstrumentation(),
  ],
});

// Utilisation de sdk.start() de manière synchrone
(async () => {
  try {
    await sdk.start(); // Utilisation correcte d'await
    console.log('OpenTelemetry initialized');
  } catch (error) {
    console.error('Error initializing OpenTelemetry', error);
  }
})();
