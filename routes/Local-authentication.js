const passport = require('passport');
const bcrypt = require('bcrypt-nodejs');
const LocalStrategy = require('passport-local').Strategy;
var MagicLinkStrategy = require('passport-magic-link').Strategy;
var sendgrid = require('@sendgrid/mail');
var randomstring = require("randomstring");
require('dotenv').config();
console.log(process.env);

var GoogleStrategy = require('passport-google-oauth20').Strategy;
const GOOGLE_CLIENT_ID = '1011955633562-j5ds90oe8ejbg2q0e1gb1enbo2r1opln.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback"
    },
    async (request, accessToken, refreshToken, profile, done) => {
        try {
            let existingUser = await User.findOne({ 'password': profile.id });
            if (existingUser) {
                await User.findOneAndUpdate({ password: profile.id }, { $set: { onlineOrNot: true }}, {new: true});
                done(null, existingUser);
            }
            console.log('Creating new user...');
            console.log(profile);
            console.log("Picture is "+profile.picture);
            const newUser = new User();
            newUser.username = profile.displayName.substring(0,8);
            newUser.password = profile.id;
            newUser.email = profile.emails[0].value;
            newUser.profilePicture = profile.photos[0].value;
            newUser.source = 'google';
            newUser.verified = true;
            newUser.onlineOrNot = true;
            await newUser.save();
            return done(null, newUser);
        } catch (error) {
            return done(error, false)
        }
    }
));

var GitHubStrategy = require('passport-github').Strategy;
const GITHUB_CLIENT_ID = '26f681bb02ed15076a2c';
const GITHUB_CLIENT_SECRET = '858296c0f925dc1c31b0d11e3c4c6de10c2c402a';

passport.use(new GitHubStrategy({
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/github/callback"
    },
    async (request, accessToken, refreshToken, profile, done) => {
        try {
            let existingUser = await User.findOne({ 'password': profile.id });
            if (existingUser) {
                await User.findOneAndUpdate({ password: profile.id }, { $set: { onlineOrNot: true }}, {new: true});
                done(null, existingUser);
            }
            console.log('Creating new user...');
            console.log(profile);
            console.log("Picture is "+profile.photos[0].value);
            const newUser = new User();
            newUser.username = profile.username.substring(0,8);
            newUser.password = profile.id;
            newUser.email = "Missing";
            newUser.profilePicture = profile.photos[0].value;
            newUser.source = 'github';
            newUser.verified = false;
            newUser.onlineOrNot = true;
            await newUser.save();
            return done(null, newUser);
        } catch (error) {
            return done(error, false)
        }
    }
));

const User = require('../models/user');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const user = await User.findOne({ 'username': username })
    const userEmail = await User.findOne({ 'email': req.body.email })
    console.log(user)
    if (user) {
        return done(null, false, req.flash('signupMessage', username+' is already taken.<br>Please enter another username.'));
    } 
    else if (userEmail) {
        return done(null, false, req.flash('signupMessage', ' Email is already taken.<br>Please enter another email.'));
    }
    else {
        const newUser = new User();
        newUser.username = username;
        newUser.password = newUser.encryptPassword(password);
        newUser.email = req.body.email;
        newUser.source = "None";
        console.log(newUser);

        var permalink = req.body.username.toLowerCase().replace(' ', '').replace(/[^\w\s]/gi, '').trim();

        var verification_token = randomstring.generate({
            length: 64
        });
        
        newUser.permalink = permalink;
        newUser.verified = false;
        newUser.verify_token = verification_token;
        newUser.expiry_date_link = new Date();
        
        var numTimeSeconds = Math.round(newUser.expiry_date_link.getTime() / (1000*60/60));
        newUser.expiry_date_time = numTimeSeconds+3600;

        newUser.save();
        done(null, newUser);
    }
}));

passport.use('local-signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const user = await User.findOne({ username: username });
    if (!user) {
        return done(null, false, req.flash('signinMessage', 'No user found.<br>Please enter a valid username.'));
    }
    if (!user.comparePassword(password)) {
        return done(null, false, req.flash('signinMessage', 'Incorrect password.<br>Please enter a valid password.'));
    }
    else  {
        await User.findOneAndUpdate({ username: username }, { $set: { onlineOrNot: true }}, {new: true});
        done(null, user);
    }
}));

function encryptPasswordNow(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

function encryptPasswordNow(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

passport.use('local-reset', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    console.log(req.body.email);
    const user = await User.findOne({ 'username': username });
    console.log(user);
    if (!user) {
        return done(null, false, req.flash('resetMessage', 'No user found.<br>Incorrect email or username entered.'));
    }
    else {
        await User.findOneAndUpdate({ 'username': username }, { 'password': encryptPasswordNow(password) });
        done(null, user);
    }
}));

passport.use('local-reset-email', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    console.log(req.body.email);
    const user = await User.findOne({ 'username': username });
    console.log(user);
    if (!user) {
        return done(null, false, req.flash('resetMessage', 'No user found.<br>Incorrect email or username entered.'));
    }
    else {
        await User.findOneAndUpdate({ 'username': username }, { 'email': req.body.email });
        done(null, user);
    }
}));