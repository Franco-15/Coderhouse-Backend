import passport from "passport";
import local from "passport-local";
import userModel from "../dao/models/user.model.js";
import { createHash, isValidPassword } from "../utils.js";
import GitHubStrategy from "passport-github2";
import config from "../config.js";

const { clientID, clientSecret, callbackUrl } = config;

const LocalStrategy = local.Strategy;

const initializePassport = () => {
    passport.use(
        "register",
        new LocalStrategy(
          {
            passReqToCallback: true,
            usernameField: "email",
          },
          async (req, username, password, done) => {
            try {
              const { first_name, last_name, email, age } = req.body;
    
              let user = await userModel.findOne({ email: username });
              if (user) {
                console.log("User already exists");
                return done(null, false);
              }
    
              const newUser = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password),
              };
    
              let result = await userModel.create(newUser);
    
              return done(null, result);
            } catch (error) {
              return done("Error when trying to find user:" + error);
            }
          }
        )
      );

    passport.use(
        "login",
        new LocalStrategy(
            {
                usernameField: "email",
            },
            async (username, password, done) => {
                const admin = {
                    email: "adminCoder@coder.com",
                    password: "adminCod3r123",
                    name: "Admin Coder",
                };

                let user;

                try {
                    if (username === admin.email && password === admin.password) {
                        user = {
                            first_name: admin.name,
                            last_name: "",
                            email: admin.email,
                            age: undefined,
                            rol: "admin",
                        };
                    } else {
                        let userDB = await userModel.findOne({
                            email: username,
                        });
                        if (!userDB) {
                            console.log("User not found");
                            return done(null, false, {
                                message: "User not found",
                            });
                        }
                        if (!isValidPassword(password, userDB)) {
                            console.log("Invalid password");
                            return done(null, false, {
                                message: "Invalid password",
                            });
                        }

                        user = {
                            first_name: userDB.first_name, 
                            last_name: userDB.last_name,
                            email: userDB.email,
                            age: userDB.age,
                            rol: "user",
                        };
                    }
                    return done(null, user);
                } catch (error) {
                    console.log(error);
                    return done(error);
                }
            }
        )
    );

    passport.use(
        "github",
        new GitHubStrategy(
            {
                clientID,
                clientSecret,
                callbackUrl,
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    // console.log(profile);
                    let user = await userModel.findOne({
                        email: profile._json.email,
                    });
        
                    if (!user) {
                        let newUser = {
                            first_name: profile._json.name,
                            last_name: "",
                            age: 18,
                            email: profile._json.email,
                            password: "",
                        };

                        let result = await userModel.create(newUser);
                        return done(null, { ...result._doc, rol: "user" });
                    }
    
                    return done(null, { ...user._doc, rol: "user" });
                } catch (error) {
                    return done(error);
                }
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        let user = await userModel.findById(id);
        done(null, user);
    });
};

export default initializePassport;
