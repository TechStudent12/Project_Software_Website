//This schema will be for the user.

const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const { Schema } = mongoose;

const userSchema = new Schema
({
    username: String,
    password: String, 
    email: String,
    nightOrDayVal: { type: Boolean, default: false},
    onlineOrNot: {type: Boolean, default: false},
    contribute: {type: Boolean, default: false}, 
    ContributeMovies:[String],
    ContributePersons:[String], 
    Followers: {type: Number, default: 0},
    Notifications: {type: Number, default: 0}, 
    contributeNum: {type: Number, default: 0}, 
    praises: {type: Number, default: 0}, 
    reviewNum: {type: Number, default: 0}, 
    reviewArray: { type : Array , "default" : [] },
    reviewNumPersonal: {type: Number, default: 0},
    praiseComments: { type : Array , "default" : [] }, 
    Following: { type: Number, default: 0 },
    followerIDs: { type : Array , "default" : [] },
    userFollowingIDs: { type : Array , "default" : [] },
    userMovieList: { type : Array , "default" : [] },
    userMovieListIDs: { type : Array , "default" : [] },
    userCountMovieList: {type: Number, default: 0},
    userYearMovieList: {type: Array, "default" : [] },
    actorNum: { type: Number, default: 0 },
    actorArray: { type : Array , "default" : [] },
    writerNum: { type: Number, default: 0 },
    writerArray: { type : Array , "default" : [] },
    directorNum: { type: Number, default: 0 },
    directorArray: { type : Array , "default" : [] },
    novelArray: { type : Array , "default" : [] },
    recommendationNum: { type: Number, default: 0 },
    recommendationArray: { type : Array , "default" : [] },
    recommendationArrayIDs: { type : Array , "default" : [] },
    profilePicture:  { type: String, default:'https://st.depositphotos.com/2101611/4338/v/600/depositphotos_43381261-stock-illustration-silhouette-of-anonymous-man-with.jpg' },
    backgroundPicture:  { type: String, default: 'https://images5.alphacoders.com/979/thumbbig-979758.jpg'},
    color: { type: String, default: 'yellow'}, 
    bookmarkId: {type: Array,  "default" : [] },
    verified: {type: Boolean, default: false},
    permalink: String,
    verify_token: String,
    bookDayOrNight: { type: String, default: '1'}, 
    chatRoomName: { type : Array , "default" : [] }, 
    chatRoomIDs: { type : Array , "default" : [] },
    expiry_date_link: Date,
    expiry_date_time: {type: Number, default: 0},
    source: { type: String, required: [true, "source not specified"] },
    firstName: String,
    lastName: String
});

userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('user', userSchema);
