//Required libraries
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const passportLocalMongoose = require("passport-local-mongoose");
const User = require("./models/user");
const path = require('path');
const engine = require('ejs-mate');

//Databse connection
mongoose.connect("mongodb://localhost:27017/auth_demo_app", { useNewUrlParser: true, useUnifiedTopology: true });

//The ejs routes
var secure = require('express-force-https');
var app = express();
require('./routes/local-authentication');
app.use(secure);
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
    secret: "Rusty is a dog",
    resave: false,
    saveUninitialized: false
}));
 
app.use(passport.initialize());
app.use(passport.session());
 
//=====================
// ROUTES
//=====================
 
//Showing home page
app.get("/", function (req, res) {
    res.render("index");
});
 
//Showing secret page
app.get("/index", isLoggedIn, function (req, res) {
    res.render("index");
});
 
//Showing register form
app.get("/solitaire", function (req, res) {
    res.render("solitaire");
});
 
//Handling user signup
app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/login',
    failureRedirect: '/login',
    failureFlash: true,
    session: false
}));
 
//Showing login form
app.get("/login", function (req, res) {
    res.render("login");
});

app.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/logging',
    failureRedirect: '/login',
    failureFlash: true,
    session: true
}));

//Showing forgot password form
app.get("/forgotpassword", function (req, res) {
    res.render("forgotpassword");
});
 
//Handling user login
app.post("/login", passport.authenticate("local", {
    successRedirect: '/logging',
    failureRedirect: '/signin',
    failureFlash: true,
    session: true
}));
 
//Handling user logout
app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});

//Handling user google authentication
app.get('/auth/google', 
    passport.authenticate('google', { scope : ['profile', 'email'] })
);
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
app.enable('trust proxy');

app.use((req, res, next) => {
    req.secure ? next() : res.redirect('https://' + req.headers.host + req.url)
});

//Port to open site on. The port for localhost is 3000.
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});