var mongoose = require('mongoose');

var NonprofitSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    address: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    zip_code: {type: Number, default: 0},
    phone_number: {type: Number, default: 0}
}, {versionKey: false} );

module.exports = mongoose.model('Nonprofit', NonprofitSchema);