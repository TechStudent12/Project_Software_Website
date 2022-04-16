//Required libraries
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const passportLocalMongoose = require("passport-local-mongoose");
const User = require("./models/user");
const path = require('path');
const engine = require('ejs-mate');
const flash = require('connect-flash');
var jsonParser = bodyParser.json();

//Databse connection
mongoose.connect("mongodb://localhost:27017/auth_demo_app", { useNewUrlParser: true, useUnifiedTopology: true });

//The ejs routes
//var secure = require('express-force-https');
var app = express();
require('./routes/local-authentication');
//app.use(secure);
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/json', express.static(__dirname + 'public/json'))
app.use('/logos', express.static(__dirname + 'public/logos'))
app.use('/Images_NotNumbers', express.static(__dirname + 'public/Images_NotNumbers'))
app.use('/Images', express.static(__dirname + 'public/Images'))
app.use('/Image_DayOrNight', express.static(__dirname + 'public/Image_DayOrNight'))
 
app.use(require("express-session")({
    secret: "Solitaire_Secret",
    resave: false,
    saveUninitialized: false
}));
 
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    app.locals.signinMessage = req.flash('signinMessage');
    app.locals.signupMessage = req.flash('signupMessage');
    app.locals.resetMessage = req.flash('resetMessage');
    app.locals.user = req.user;
    console.log(app.locals)
    next();
});

//=====================
// ROUTES
//=====================
 
//Showing home page
app.get("/", (req, res, next) => {
    res.render("index");
});
 
//Showing secret page
app.get("/index", isLoggedIn, (req, res, next) => {
    res.render("index");
});
 
//Showing register form
app.get("/solitaire", (req, res, next) => {
    res.render("solitaire");
});

//Showing logging page
app.get("/logging", isLoggedIn, (req, res, next) => {
    res.render("logging");
});

//Showing loggout page
app.get("/loggout", (req, res, next) => {
    res.render("loggout");
});
 
//Showing login form
app.get("/login", (req, res, next) => {
    res.render("login");
});

//Handling user signup
app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/login',
    failureRedirect: '/login',
    failureFlash: true,
    session: false
}));

//Handling user signin
app.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/logging',
    failureRedirect: '/login',
    failureFlash: true,
    session: true
}));

//Handling user password reset
app.post('/reset', passport.authenticate('local-reset', {
    successRedirect: '/logging',
    failureRedirect: '/forgotpassword',
    failureFlash: true,
    session: true
}));

//Handling user email reset
app.post('/resetEmail', passport.authenticate('local-reset-email', {
    successRedirect: '/logging',
    failureRedirect: '/forgotpassword',
    failureFlash: true,
    session: true
}));

//Showing forgot password form
app.get("/forgotpassword", (req, res, next) => {
    res.render("forgotpassword");
});
 
//Handling user logout
app.get("/logout", (req, res, next) => {
    req.logout();
    res.redirect("/loggout");
});

//Handling user google authentication
app.get('/auth/google', 
    passport.authenticate('google', { scope : ['profile', 'email'] })
);

//Handling user google authentication
app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/logging');
    }
);

//Handling user gihtub authentication
app.get('/auth/github',
    passport.authenticate('github')
);

//Handling user gihtub authentication
app.get('/auth/github/callback', 
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/logging');
    }
);

//Check if user logged in.
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
}
 
//Extra settings for security
//app.enable('trust proxy');

//app.use((req, res, next) => {
//    req.secure ? next() : res.redirect('https://' + req.headers.host + req.url)
//});

function encryptPasswordProfile(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

//Port to open site on. The port for localhost is 3000.
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});