// tracing.js
const { NodeTracerProvider } = require('@opentelemetry/node');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');
const { CollectorTraceExporter } = require('@opentelemetry/exporter-collector');
const { SimpleSpanProcessor } = require('@opentelemetry/tracing');

const provider = new NodeTracerProvider();

// Exporter pour envoyer des traces à un endpoint
const exporter = new CollectorTraceExporter({
    url: 'http://localhost:55681/v1/traces', // URL de votre endpoint de collecte
});

provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
provider.register();

// Instrumentation des applications Express
registerInstrumentations({
    instrumentations: [
        new ExpressInstrumentation(),
    ],
});
