var mongoose = require('mongoose');

var RequestSchema = new mongoose.Schema({
    restaurant_email: {type: String, required: true},
    nonprofit_email: {type: String, required: true},
    nonprofit_name: {type: String, required: true},
    dish: {type: String, required: true},
    servings: {type: Number, default: 0}
}, {versionKey: false} );

module.exports = mongoose.model('Request', RequestSchema);