var jwt = require('jsonwebtoken');
var config = require('../config/config');

function Authenticate(req, res, next){
 // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  //console.log(token);
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {      
      if (err) {
        res.status(403).send({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();  
      }
    });

  } else {

    // if there is no token
    // return an error
    res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
}

module.exports.Authenticate = Authenticate;