import passport from "passport";
import local from "passport-local";
import userModel from "../dao/models/user.model.js";
import cartModel from "../dao/models/cart.model.js";
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
                        return done(null, false, {
                            message: "User already exists",
                        });
                    }

                    const newCart = await cartModel.create({});

                    const newUser = {
                        first_name,
                        last_name,
                        email,
                        age,
                        role: "user",
                        password: createHash(password),
                        cartId: newCart._id
                    };

                    let userCreated = await userModel.create(newUser);
                    return done(null, userCreated);
                } catch (error) {
                    console.log(error);
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
                const admin = {
                    email: "adminCoder@coder.com",
                    password: "adminCod3r123",
                    name: "Admin Coder",
                };

                let user;

                try {
                    if (
                        username === admin.email &&
                        password === admin.password
                    ) {
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
                        if (!userDB) return done(null, false);

                        if (!isValidPassword(userDB, password))
                            return done(null, false);

                        user = {
                            ...userDB._doc,
                            rol: "user",
                        };
                    }
                    return done(null, user);
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
