const passport = require('passport');
const bcrypt = require('bcrypt-nodejs');
const LocalStrategy = require('passport-local').Strategy;
var MagicLinkStrategy = require('passport-magic-link').Strategy;
var sendgrid = require('@sendgrid/mail');
var randomstring = require("randomstring");
require('dotenv').config();
console.log(process.env);

var GoogleStrategy = require('passport-google-oauth20').Strategy;
const GOOGLE_CLIENT_ID = '1036715965318-i5mupqttdna08509ast9o9ihh0r17gk2.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "https://moviesriders.com/auth/google/callback"
    },
    async (request, accessToken, refreshToken, profile, done) => {
        try {
            let existingUser = await User.findOne({ 'password': profile.id });
            if (existingUser) {
                return done(null, existingUser);
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
            await newUser.save();
            return done(null, newUser);
        } catch (error) {
            return done(error, false)
        }
    }
));

var GitHubStrategy = require('passport-github').Strategy;
const GITHUB_CLIENT_ID = '5647e423502ecbce7055';
const GITHUB_CLIENT_SECRET = 'd6ddb5aa8bb4982608675b0bb9d6707683ea11bd';

passport.use(new GitHubStrategy({
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: "https://moviesriders.com/auth/github/callback"
    },
    async (request, accessToken, refreshToken, profile, done) => {
        try {
            let existingUser = await User.findOne({ 'password': profile.id });
            if (existingUser) {
                return done(null, existingUser);
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
            await newUser.save();
            return done(null, newUser);
        } catch (error) {
            return done(error, false)
        }
    }
));

var TwitterStrategy = require('passport-twitter').Strategy;
const TWITTER_CONSUMER_KEY = 'kEVd09Poz1KP0RKwDvQvgBDuF';
const TWITTER_CONSUMER_SECRET = 'punkebWjfB6QS5iTaWbfZdq1teQPhClEh2pFDnWlnL3s5CwJwO';
passport.use(new TwitterStrategy({
        consumerKey: TWITTER_CONSUMER_KEY,
        consumerSecret: TWITTER_CONSUMER_SECRET,
        userProfileURL: "https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true",
        callbackURL: "https://moviesriders.com/auth/callback/twitter",
        proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            let existingUser = await User.findOne({ 'password': profile.id });
            if (existingUser) {
                return done(null, existingUser);
            }
            console.log('Creating new user...');
            console.log(profile);
            console.log("Picture is "+profile.photos[0].value);
            const newUser = new User();
            newUser.username = profile.username.substring(0,8);
            newUser.password = profile.id;
            newUser.email = "Missing";
            newUser.profilePicture = profile.photos[0].value;
            newUser.source = 'twitter';
            newUser.verified = false;
            await newUser.save();
            return done(null, newUser);
        } catch (error) {
            return done(error, false)
        }
    }
));

var FacebookStrategy = require('passport-facebook').Strategy;
const FACEBOOK_APP_ID = '484179496769129';
const FACEBOOK_APP_SECRET = 'b9c89b0ec0105be7c6627dfa3f77a5ba';

passport.use(new FacebookStrategy({
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: 'https://moviesriders.com/auth/callback/facebook'
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            let existingUser = await User.findOne({ 'password': profile.id });
            if (existingUser) {
                return done(null, existingUser);
            }
            console.log('Creating new user...');
            console.log(profile);
            const newUser = new User();
            if(profile.username !== undefined && profile.username !== null && (profile.displayName === undefined || profile.displayName === null)) {
                newUser.username = profile.username.substring(0,8);
            }
            else {
                newUser.username = profile.displayName.substring(0,8).replace(/\s/g, '');
            }
            newUser.password = profile.id;
            newUser.email = "Missing";
            newUser.source = 'twitter';
            newUser.verified = false;
            await newUser.save();
            return done(null, newUser);
        } catch (error) {
            return done(error, false)
        }
    }
));

sendgrid.setApiKey(process.env['SENDGRID_API_KEY']);

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

        try {
            newUser.save(function (err) {
                if (err) {
                    throw err;
                } else {
                    var link = 'https://moviesriders.com/verify/'+numTimeSeconds+3600+'/'+permalink+'/'+verification_token;
                    var msg = {
                        to: newUser.email,
                        from: process.env['EMAIL'],
                        subject: 'Sign in to MoviesRiders',
                        text: 'Hello '+newUser.username+'!\nThanks for signing up!\nYour account has been created, you can login with the following credentials after you have activated your account by pressing the url below.\nAccount details:\n&#9745; Username: '+newUser.username+'\n&#9745; Password: '+password+'\nPlease click this link to activate your account:\r\n\r\n' + link,
                        html: '<center><img src=" https://img.icons8.com/clouds/100/000000/handshake.png" width="125" height="120" style="display: block; border: 0px;"/></center><h3>Hello '+newUser.username+'!</h3><p>Thanks for signing up!</p><p>Your account has been created, you can login with the following credentials after you have activated your account by pressing the url below.</p><br><p>Account details:</p><p>&#9745; Username: '+newUser.username+'</p><p>&#9745; Password: '+password+'</p><br><p>The link provided will expiry in an hour. Please click this link to activate your account:</p><p><a href="' + link + '">'+link+'</a></p>',
                    };
                    sendgrid.send(msg);
                    console.log("Email sent");
                }
            });
        } catch (err) { console.log(err); }
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
    if (user.verified  == false) {
        return done(null, false, req.flash('signinMessage', 'User is not verified.<br>Please check your email.'));
    }
    if (!user.comparePassword(password)) {
        return done(null, false, req.flash('signinMessage', 'Incorrect password.<br>Please enter a valid password.'));
    }
    return done(null, user);
}));

passport.use('local-verify', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const user = await User.findOne({ username: username });
    if (!user) {
        return done(null, false, req.flash('signinMessage', 'No user found.<br>Please enter a valid username.'));
    }
    if (user.verified  == true) {
        return done(null, false, req.flash('signinMessage', 'User is verified.<br>Please sign-in.'));
    }
    if (user.verified  == false) {
        var permalink = username.toLowerCase().replace(' ', '').replace(/[^\w\s]/gi, '').trim();
        var verification_token = randomstring.generate({
            length: 64
        });
        var numTimeSeconds = Math.round((new Date()).getTime() / (1000*60/60));
        await User.findOneAndUpdate({ 'username': username, 'email': password }, { 'permalink': permalink, 'verify_token': verification_token, 'expiry_date_link': new Date(), 'expiry_date_time': numTimeSeconds+3600 });
        var link = 'https://moviesriders.com/verify/'+numTimeSeconds+3600+'/'+permalink+'/'+verification_token;
        var msg = {
            to: user.email,
            from: process.env['EMAIL'],
            subject: 'Sign in to MoviesRiders',
            text: 'Hello '+user.username+'!\nThanks for signing up!\nYour account has been created, you can login after you have activated your account by pressing the url below.\nPlease click this link to activate your account:\r\n\r\n' + link,
            html: '<center><img src=" https://img.icons8.com/clouds/100/000000/handshake.png" width="125" height="120" style="display: block; border: 0px;"/></center><h3>Hello '+user.username+'!</h3><p>Thanks for signing up!</p><p>Your account has been created, you can login after you have activated your account by pressing the url below.</p><p>The link provided will expiry in an hour. Please click this link to activate your account:</p><p><a href="' + link + '">'+link+'</a></p>',
        };
        sendgrid.send(msg);
    }
    return done(null, user);
}));

function encryptPasswordNow(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

passport.use('local-guestsignin', new LocalStrategy({
    usernameField: 'user',
    passwordField: 'pass',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const user = await User.findOne({ username: username });
    if (!user || !user.comparePassword(password)) {
        return done(null, false, req.flash('signinMessage', 'Database error.<br>Unable to connect to guest account.'));
    }
    return done(null, user);
}));

function encryptPasswordNow(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

passport.use('local-reset', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    console.log(req.body.email);
    const user = await User.findOne({ 'username': username, 'email': req.body.email });
    console.log(user);
    if (!user) {
        return done(null, false, req.flash('resetMessage', 'No user found.<br>Incorrect email or username entered.'));
    }
    else {
        await User.findOneAndUpdate({ 'username': username, 'email': req.body.email }, { 'password': encryptPasswordNow(password) });
        done(null, user);
    }
}));

passport.use('local-email-reset', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    console.log(req.body.email);
    const user = await User.findOne({ 'username': username, 'email': password });
    console.log(user);
    if (!user) {
        return done(null, false, req.flash('resetMessage', 'No user found.<br>Incorrect email or username entered.'));
    }
    else {
        var permalink = username.toLowerCase().replace(' ', '').replace(/[^\w\s]/gi, '').trim();
        var verification_token = randomstring.generate({
            length: 64
        });
        var numTimeSeconds = Math.round((new Date()).getTime() / (1000*60/60));
        await User.findOneAndUpdate({ 'username': username, 'email': password }, { 'permalink': permalink, 'verify_token': verification_token, 'expiry_date_link': new Date(), 'expiry_date_time': numTimeSeconds+3600 });
        var link = 'https://moviesriders.com/reset/'+numTimeSeconds+3600+'/'+permalink+'/'+verification_token;
        var msg = {
            to: user.email,
            from: process.env['EMAIL'],
            subject: 'Resetting your account',
            text: 'Hello '+user.username+'!\nThanks for signing up!\nYour account has been created, you can login after you have activated your account by pressing the url below.\nPlease click this link to activate your account:\r\n\r\n' + link,
            html: '<center><img src=" https://img.icons8.com/clouds/100/000000/handshake.png" width="125" height="120" style="display: block; border: 0px;"/></center><h3>Hello '+user.username+'!</h3><p>Thanks for signing up!</p><p>Your account details were retrieve, you can reset your account after you press the url below.</p><p>The link provided will expiry in an hour. Please click this link to reset your account:</p><p><a href="' + link + '">'+link+'</a></p>',
        };
        sendgrid.send(msg);
    }
    return done(null, user);
}));