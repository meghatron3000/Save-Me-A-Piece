var mongoose = require('mongoose');

var DishSchema = new mongoose.Schema({
    name: {type: String, required: true},
    restaurant_name: {type: String, required: true},
    restaurant_email:{type: String, required: true},
    price: { type: Number, default: 0 },
    servings: { type: Number, default: 0 }
}, {versionKey: false} );

module.exports = mongoose.model('Dish', DishSchema);