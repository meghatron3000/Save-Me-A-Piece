var express = require('express'),
    router = express.Router(),
    restaurants = require('../models/restaurant');
    dishes = require('../models/dish');
    mongoose = require('mongoose');
var async = require("async");


function getQueryParams(req){
    var where = req.query.where;
    if (where === undefined){
        where = {};
    } else {
        where = JSON.parse(where);
    }

    var sor = req.query.sort;
    if (sor === undefined){
        sor = {};
    } else {
        sor = JSON.parse(sor);
    }

    var selec = req.query.select;
    if (selec === undefined){
        selec = {};
    } else {
        selec = JSON.parse(selec);
    }

    var ski = req.query.skip;
    if (ski === undefined){
        ski = 0;
    } else {
        ski = JSON.parse(ski);
    }

    var limi = req.query.limit;
    if (limi === undefined){
        limi = 0;
    } else {
        limi = JSON.parse(limi);
    }

    var count = req.query.count;
    if (count === '"true"' || count === 'true'){
        count = true;
    } else {
        count = false;
    }
    return [where, sor, selec, ski, limi, count]
}

router.get('/', function (req, res) {
    let [where, sor, selec, ski, limi, count] = getQueryParams(req);
    // console.log(where, sor, selec, ski, limi, count);

    if (count){
        restaurants.find(where, selec).sort(sor).skip(ski).limit(limi).count().exec( (err, res_restaurants) => {
            if (err) {
                res.status(404).send({
                    message: "Error",
                    data: []
                });
            } else {
                res.status(200).send({
                    message: 'OK',
                    data: res_restaurants
                })
            }
        })
    }else{
        restaurants.find(where, selec).sort(sor).skip(ski).limit(limi).exec( (err, res_restaurants) => {
            if (err) {
                res.status(404).send({
                    message: "Error",
                    data: []
                });
            } else {
                res.status(200).send({
                    message: 'OK',
                    data: res_restaurants
                })
            }
        })
    }
});

router.post('/', async function (req, res){
    const restaurant = new restaurants(req.body);
        restaurant.save()
        .then(restaurant => {
        res.status(201).send({
            message :'SUCCESS',
            data: restaurant
            });
        })
        .catch(err => {
        res.status(500).send({
            message : "restaurant not added",
            data: []
            });
        })
});

router.get('/nearmeunder', function (req, res) {
    restaurants.find({ $or: [{"city": req.query.city}, {"zip_code": req.query.zip_code}] }).exec( (err, restaurants) => {
            if (err) {
                //console.log(err);
                res.status(404).send({
                    message: "Error",
                    data: []
                });
            } else if (!restaurants) {
                res.status(404).send({
                    message: 'No restaurants near you found',
                    data: []
                });
            }
            else {
                let d = [];
                var its = 0;
                restaurants.forEach( function(restaurant){
                    dishes.find({$and : [{"price":{$lte: req.query.price}}, {"restaurant_email": restaurant.email}] }).exec( (err, dish) => {
                        if(dish.length > 0){
                            d=d.concat(dish);
                        }
                        its+=1;
                        if (its === restaurants.length) {
                            res.status(200).send({
                                message: 'OK',
                                data: d
                            });
                        }
                    })
                });
            }
    })
});

router.get('/nearmeover', function (req, res) {
    restaurants.find({ $or: [{"city": req.query.city}, {"zip_code": req.query.zip_code}] }).exec( (err, restaurants) => {
            if (err) {
                res.status(404).send({
                    message: "Error",
                    data: []
                });
            } else if (!restaurants) {
                res.status(404).send({
                    message: 'No restaurants near you found',
                    data: []
                });
            }
            else {
                let d = [];
                var its = 0;
                restaurants.forEach( function(restaurant){
                    dishes.find({$and : [{"price":{$gt: req.query.price}}, {"restaurant_email": restaurant.email}] }).exec( (err, dish) => {
                        if(dish.length > 0){
                            d=d.concat(dish);
                        }
                        its+=1;
                        if (its === restaurants.length) {
                            res.status(200).send({
                                message: 'OK',
                                data: d
                            });
                        }
                    })
                });
            }
    })
});


router.get('/:email', function (req, res) {
    console.log(req.params);
    restaurants.findOne( {"email": req.params.email} ).exec( (err, restaurant) => {
            if (err) {
                //console.log(err);
                res.status(404).send({
                    message: "Error",
                    data: []
                });
            } else if (!restaurant) {
                res.status(404).send({
                    message: 'No restaurants with that email found',
                    data: []
                });
            }
            else {
                res.status(200).send({
                    message: 'OK',
                    data: restaurant
                })
            }
        }
    )
});

router.put('/:email', function (req, res) {
        restaurants.findOneAndUpdate( {"email": req.params.email}, req.body, {new: true}, (err, restaurant) => {
            if (err) {
                res.status(404).send({
                    message: "Error",
                    data: []
                });
            } else if (!restaurant) {
                res.status(404).send({
                    message: 'No restaurants with that email found',
                    data: []
                });
            } else {
                res.status(201).send({
                    message: 'OK',
                    data: []
                })
            }
        })
});

router.delete('/:email', function (req, res) {
    restaurants.findByOneAndDelete( {"email": req.params.email}, (err, restaurant) => {
        if (err) {
            res.status(404).send({
                message: "Error",
                data: []
            });
        } else if (!restaurant) {
            res.status(404).send({
                message: 'No restaurants with that email found',
                data: []
            });
        } else {
            res.status(200).send({
                message: 'Deleted restaurant',
                data: []
            })
        }
    })
});

module.exports = router;