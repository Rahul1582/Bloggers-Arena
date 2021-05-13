const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const user = require("../models/newuser");
const secret = require("../Config/sectoken");

const final = {};
final.jwtFromRequest =  ExtractJwt.fromAuthHeaderAsBearerToken();
final.secretOrKey = secret.sectoken();

module.exports = passport => {
  passport.use(
     new JwtStrategy(final, (jwt_payload, done) => {
        user.findOne({ _id: jwt_payload.id })
           .then(user => {
              if (user) {
                 return done(null, user);
              } 
              
              else {
                 return done(null, false);
              }
           })
           .catch(err =>
              console.log({ error: "Error authenticating the user" })
           );
     })
  );
};

