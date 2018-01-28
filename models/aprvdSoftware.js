var mongoose = require('mongoose');
var AprvdSoftware = mongoose.model('AprvdSoftware',{
    softID: {
        type: Number,
        required: true,
        trim: true
    },
    softName: {
        type: String,
        required: true,
        trim: true
    },
    softType: {
        type: String
    },
    version: {
        type: String
    },
    releaseDate: {
        type: String
    },
    supportedOS: {
        type: String
    }
});

module.exports = { AprvdSoftware };
