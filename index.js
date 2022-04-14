var express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User = require("./models/user");
const path = require('path');
const engine = require('ejs-mate');

mongoose.connect("mongodb://localhost:27017/auth_demo_app", { useNewUrlParser: true, useUnifiedTopology: true });

var secure = require('express-force-https');
var app = express();
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
 
// Showing home page
app.get("/", function (req, res) {
    res.render("index");
});
 
// Showing secret page
app.get("/index", isLoggedIn, function (req, res) {
    res.render("index");
});
 
// Showing register form
app.get("/solitaire", function (req, res) {
    res.render("solitaire");
});
 
// Handling user signup
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
        successRedirect: "/secret",
        failureRedirect: "/login"
    }), function (req, res) {
});
 
//Handling user logout
app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});
 
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
}
 
app.enable('trust proxy');

app.use((req, res, next) => {
    req.secure ? next() : res.redirect('https://' + req.headers.host + req.url)
});

app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});