//var User = require('../models/User');
var User = require('../models/Utilisateur');
require('dotenv').config();
var stripe = require('stripe')
const logger = require('../logger');
const apiKey ='pk_test_51Q1yhoQHJrpVHtr3afeghhDji3SuFGhtG4luIl7oW2VRh3LjY4guFupinTmcjRPux8LUyw2F2eOi1rG5fdg8YGeH00gtoJLYou'
const secretKey ='sk_test_51Q1yhoQHJrpVHtr3S1XQ5MrQWjLTzZcaEuCQvIOkwHU8pNGC6IzifUheGPVWQAKede3xgLXdgxEwJwreF1rGHzBa00it6cYF1E'
const { trace } = require('@opentelemetry/api');
const { diag, DiagConsoleLogger, DiagLogLevel } = require('@opentelemetry/api');
const { NodeTracerProvider } = require('@opentelemetry/node');
const { SimpleSpanProcessor } = require('@opentelemetry/tracing');
const { ConsoleSpanExporter } = require('@opentelemetry/tracing');
const winston = require('winston');

// Setup OpenTelemetry

//stripe.setApiKey(apiKey, secretKey)



  module.exports.payement = async function(req, res){
   
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
           
            logger.info({
                service: 'service-a',
                timestamp: new Date().toISOString(),
                level: 'info',
                requestId: req.rid,
                method: req.method,
                url: req.url,
                statusCode: res.statusCode
              });
           
            /* logger.info('Handling GET request', {
                timestamp: new Date().toISOString(),
                requestId: req.headers['x-request-id'], // ID de requête
            });*/
            
            return res.status(200).json(users);
        }

    }catch(err){
        return res.status(500).send(new Error('Erreur 500...'));
    }
}
