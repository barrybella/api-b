const express = require('express');
const ruid = require('express-ruid');
const app = require('express')();
const { v4: uuidv4 } = require('uuid');
//const LokiTransport = require('winston-loki');
  app.use(ruid());
    path = require('path');
    bodyParser = require('body-parser'),
    cors = require('cors');
    require('dotenv').config();
    const mongoose = require('mongoose'),
    config = require('./DB');
    var passport = require('passport');
    
    //const https = require('https');
    //const fs = require('fs');
    const logger = require('./logger');
    app.use(express.static(path.join(__dirname, '/')));
    const port = process.env.PORT || 3002;
   
    const mongoUrl = process.env.MONGO_URI;
   
    /*logger.add(new LokiTransport({
        host: 'http://loki:3100/loki/api/v1/push',
        labels: { service: 'service-a' },
      }));*/



      mongoose.connect(mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          }).then(() => console.log('Connected to MongoDB'))
            .catch(err => console.error('Failed to connect to MongoDB', err));
     



          
            /*app.use((req, res, next) => {
              console.log('x-request-id:', uuidv4());
              next();
            });*/
            


            
    
        require('./models/Utilisateur');
        
        const userRoutes = require('./routes/user.route');
       

    app.use(function (err, req, res, next) {
        if (err.name === 'UnauthorizedError') {
            res.status(401);
            res.json({"message" : err.name + ": " + err.message});
        }
    });

    app.use(bodyParser.json());
    app.use(cors());
    app.use('/users', userRoutes);
  
    require('./config/passport');
   
    require("dotenv").config();
    app.use(passport.initialize());

   
    const server = app.listen(port, function(){
     console.log('Listening on port ' + port);
     
    });  //SEERVEUR VPS
    
   
    
    //Add the below statement to your controller code
   
