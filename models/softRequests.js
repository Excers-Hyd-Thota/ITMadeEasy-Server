var mongoose = require('mongoose');
var softRequests = mongoose.model('softRequests',{
    softID: {
        type: Number,
        required: true,
        trim: true
    },
    reuqestedBy: {
        type: String,
        required: true,
        trim: true
    },
    requestedAt: {
        type: Date,
        required: true,
        trim: true
    }
});
module.exports = {softRequests};
