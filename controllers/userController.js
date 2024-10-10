//var User = require('../models/User');
var User = require('../models/Utilisateur');
require('dotenv').config();
var stripe = require('stripe')
const logger = require('../logger');

//const { trace } = require('@opentelemetry/api');
const { diag, DiagConsoleLogger, DiagLogLevel } = require('@opentelemetry/api');
const { NodeTracerProvider } = require('@opentelemetry/node');
const { SimpleSpanProcessor } = require('@opentelemetry/tracing');
const { ConsoleSpanExporter } = require('@opentelemetry/tracing');
//stripe.setApiKey(apiKey, secretKey)
const LokiTransport = require('winston-loki');
//diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

const provider = new NodeTracerProvider();
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
provider.register();

const tracer = provider.getTracer('service-a');


  module.exports.payement = async function(req, res){
    console.log("barry");
    try{


        const paymentIntent = stripe.createPaymentIntent({
            amount: 1000,
            currency: 'USD',
            customer: customerId,
          })
          
          paymentIntent.then(function(response) {
            // The payment has been created successfully.
          })
          
          .catch(function(error) {
            // There was an error processing the payment.
          })

    }catch(err){
        return res.status(500).send(new Error('Erreur 500...'));
    }
}

module.exports.allUsers = async function(req, res){

    try{
        let users = await User.find({}).sort({"createdAt": -1});
       
        if(!users){
            return res.status(404).send(new Error('Érror 404 data note found...'));
        }else{
           /* const currentSpan = trace.getSpan(trace.context.active());
            if (currentSpan) {
              const requestId = req.headers['x-request-id'] || 'generated-request-id';
              currentSpan.setAttribute('http.request_id', requestId);
            }*/
            const span = tracer.startSpan('incoming_request', {
                attributes: {
                  'http.method': req.method,
                  'http.url': req.url,
                  'service.name': 'service-b',
                  'request.id': req.rid,
                }
              });
            
            logger.info('Request received', {
                service: 'services-b',
                timestamp: new Date().toISOString(),
                level: 'infos',
                requestId: req.rid,
                method: req.method,
                url: req.url,
                statusCode: res.statusCode
              });
           
            /* logger.info('Handling GET request', {
                timestamp: new Date().toISOString(),
                requestId: req.headers['x-request-id'], // ID de requête
            });*/
           /* logger.add(new LokiTransport({
                host: 'http://loki:3100/loki/api/v1/push',
                labels: { service: 'service-a' },
              }));*/
              
            return res.status(200).json(users);
        }

    }catch(err){
        return res.status(500).send(new Error('Erreur 500...'));
    }
}
