import passport from "passport";
import local from "passport-local";
import userModel from "../dao/mongo/models/user.model.js";
import cartModel from "../dao/mongo/models/cart.model.js";
import { createHash, isValidPassword } from "../utils/utils.js";
import GitHubStrategy from "passport-github2";
import config from "./config.js";
import jwt from "passport-jwt";
import DTOUSer from "../dao/dto/user.dto.js";

const { clientID, clientSecret, callbackUrl, jwtSecret } = config;

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies[config.jwtCookieName];
    }
    return token;
};

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
                        return done(null, false);
                    }

                    const newCart = await cartModel.create({});

                    const newUser = {
                        first_name,
                        last_name,
                        email,
                        age,
                        role: "user",
                        password: createHash(password),
                        cartId: newCart._id,
                    };

                    let userCreated = await userModel.create(newUser);
                    return done(null, userCreated);
                } catch (error) {
                    return done(error);
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
                try {
                    let user = await userModel.findOne({
                        email: username,
                    });
                    if (!user) return done(null, false);

                    if (!isValidPassword(user, password))
                        return done(null, false);

                    user = new DTOUSer(user).getUser();
                    return done(null, user);
                } catch (error) {
                    return done(error);
                }
            }
        )
    );

    passport.use(
        "restorePassword",
        new JWTStrategy(
            {
                jwtFromRequest: ExtractJwt.fromExtractors([(req)=>{
                    let token = null;
                    if (req && req.cookies) {
                        token = req.cookies[config.email.restore_pass_token];
                    }
                    return token;
                }]),
                secretOrKey: config.email.restore_pass_secret,
            },
            async (payload, done) => {
                try {
                    return done(null, payload);
                } catch (error) {
                    return done(error);
                }
            }
        )
    );

    passport.use(
        "jwt",
        new JWTStrategy(
            {
                jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
                secretOrKey: jwtSecret,
            },
            async (payload, done) => {
                try {
                    return done(null, payload);
                } catch (error) {
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
                    let user = await userModel.findOne({
                        email: profile._json.email,
                    });

                    const newCart = await cartModel.create({});

                    if (!user) {
                        let newUser = {
                            first_name: profile._json.name,
                            last_name: "",
                            age: 18,
                            email: profile._json.email,
                            password: "",
                            role: "user",
                            cartId: newCart._id,
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
