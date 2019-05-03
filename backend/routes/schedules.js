var express = require('express'),
    router = express.Router(),
    schedules= require('../models/schedule');
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
    if (count){
        schedules.find(where, selec).sort(sor).skip(ski).limit(limi).count().exec( (err, res_schedules) => {
            if (err) {
                res.status(404).send({
                    message: "Error",
                    data: []
                });
            } else {
                res.status(200).send({
                    message: 'OK',
                    data: res_schedules
                })
            }
        })
    }else{
        schedules.find(where, selec).sort(sor).skip(ski).limit(limi).exec( (err, res_schedules) => {
            if (err) {
                res.status(404).send({
                    message: "Error",
                    data: []
                });
            } else {
                res.status(200).send({
                    message: 'OK',
                    data: res_schedules
                })
            }
        })
    }
});

router.post('/', async function (req, res){
    const schedule = new schedules(req.body);
        schedule.save()
        .then(schedule => {
        res.status(201).send({
            message : 'SUCCESS',
            data: schedule
            });
        })
        .catch(err => {
        res.status(500).send({
            message : "schedule not added",
            data: []
            });
        })
});

router.get('/:email', function (req, res) {
    schedules.findOne( {"email": req.params.email} ).exec( (err, res_schedules) => {
            if (err) {
                res.status(404).send({
                    message: "Error",
                    data: []
                });
            } else if (!res_schedules) {
                res.status(404).send({
                    message: 'No schedules with that email found',
                    data: []
                });
            }
            else {
                res.status(200).send({
                    message: 'OK',
                    data: res_schedules
                })
            }
        }
    )
});

router.put('/:email', function (req, res) {
        schedules.findOneAndUpdate( {"email": req.params.email}, req.body, {new: true}, (err, schedule) => {
            if (err) {
                res.status(404).send({
                    message: "Error",
                    data: []
                });
            } else if (!schedule) {
                res.status(404).send({
                    message: 'No schedules with that email found',
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
    schedules.findOneAndDelete( {"email": req.params.email}, (err, schedule) => {
        if (err) {
            res.status(404).send({
                message: "Error",
                data: []
            });
        } else if (!schedule) {
            res.status(404).send({
                message: 'No schedules with that email found',
                data: []
            });
        } else {
            res.status(200).send({
                message: 'Deleted schedule',
                data: []
            })
        }
    })
});

module.exports = router;