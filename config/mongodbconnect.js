var mongoose = require('mongoose');

var mongoDB = 'mongodb://admin:admin@ds115768.mlab.com:15768/itmadeeasy';

mongoose.connect(mongoDB);

mongoose.Promise = global.Promise;

//Get the default connection
var db = mongoose.connection;

//validate the connection..
db.on('connected',() => {
    console.log('MongoDB connection is successfully established!');
});

db.on('error',(e) => {
    console.log('Cannot connect to MongoDB', e);
});

module.exports = { mongoose };