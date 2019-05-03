var express = require('express'),
    router = express.Router(),
    dishes= require('../models/dish');
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
        dishes.find(where, selec).sort(sor).skip(ski).limit(limi).count().exec( (err, res_dishes) => {
            if (err) {
                res.status(404).send({
                    message: "Error",
                    data: []
                });
            } else {
                res.status(200).send({
                    message: 'SUCCESS',
                    data: res_dishes
                })
            }
        })
    }else{
        dishes.find(where, selec).sort(sor).skip(ski).limit(limi).exec( (err, res_dishes) => {
            if (err) {
                res.status(404).send({
                    message: "Error",
                    data: []
                });
            } else {
                res.status(200).send({
                    message: 'SUCCESS',
                    data: res_dishes
                })
            }
        })
    }
});

router.post('/', async function (req, res){
    const dish = new dishes(req.body);
        dish.save()
        .then(dish => {
        res.status(201).send({
            message : 'SUCCESS',
            data: dish
            });
        })
        .catch(err => {
        res.status(500).send({
            message : "dish not added",
            data: []
            });
        })
});

router.get('/:email', function (req, res) {
    dishes.find( {"restaurant_email": req.params.email} ).exec( (err, dish) => {
            if (err) {
                res.status(404).send({
                    message: "Error",
                    data: []
                });
            } else if (dish.length == 0) {
                res.status(404).send({
                    message: 'No dishes with that email found',
                    data: []
                });
            }
            else {
                res.status(200).send({
                    message: 'SUCCESS',
                    data: dish
                })
            }
        }
    )
});

router.put('/', function (req, res) {
        dishes.findOneAndReplace( {"restaurant_email": req.body.restaurant_email, "name": req.body.name}, req.body, (err, dish) => {
            if (err) {
                console.log(err)
                res.status(404).send({
                    message: "Error",
                    data: []
                });
            } else if (!dish) {
                console.log(req.body)
                res.status(404).send({
                    message: 'No dishes with that email found',
                    data: []
                });
            } else {
                res.status(201).send({
                    message: 'SUCCESS',
                    data: []
                })
            }
        })
});

router.delete('/:restaurant_email/:name', function (req, res) {
    dishes.findOneAndDelete( {"restaurant_email": req.params.restaurant_email, "name": req.params.name}, (err, dish) => {
        if (err) {
            res.status(404).send({
                message: "Error",
                data: []
            });
        } else if (!dish) {
            res.status(404).send({
                message: 'No dishes with that email found',
                data: []
            });
        } else {
            res.status(200).send({
                message: 'SUCCESS',
                data: []
            })
        }
    })
});

module.exports = router;