var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('Utilisateur');
var Distributeur = mongoose.model('Utilisateur');
var LocalStrategy = require('passport-local').Strategy;
// const dotenv = require("dotenv");

module.exports.register = function (req, res) {
  var user = new Distributeur();
  var generator = require('generate-password');
  user.name = req.body.name;
  user.email = req.body.email;
  user.tel = req.body.tel;
  user.password = req.body.password;
  var password = user.password;
  user.setPassword(password);
  user.save();
  
  if (user) {
 
 
  return res.status(200).json(user);
 
}

else {
    return res.status(404).send(new Error('Erreur 404...'))
  }
 
};
module.exports.login = function (req, res) {
  username = req.body.email;
  password = req.body.password;

  Distributeur.findOne( { $or: [ { "tel": username }, { "email": { "$eq": username} } ] }, function (err, user) {
    if (err) {
      res.status(404).json(err);
      return;
    }
    // Return if user not found in database
    if (!user) {
      // return new Error('úser not dound');
      return res.json(false);
    }
    // Return if password is wrong
    if (!user.validPassword(password)) {
      return res.json(false);
    }
        // If credentials are correct, return the user object
      if(user){
        var token;
        token = user.generateJwt();
        // console.log('TOKEN:', token);
        res.status(200);
        res.json({
          "token" : token
        });
        process.env.MY_SECRET = token;
      }else{
        return res.json(false);
      }
      //  return res.status(200).json(user)
    });

};


