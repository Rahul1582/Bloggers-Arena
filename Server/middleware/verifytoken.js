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
          User.findOne({ _id: jwt_payload.id } , (err , user) =>{
              
            if(err){
                return res.json({
                    status: 500,
                    auth: false,
                    message: "Failed to authenticate token.",
                  });
            }

            else if(user){
                return done(null, user);
            }
          });
    
       })
    );
 };

