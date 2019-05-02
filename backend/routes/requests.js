var express = require('express'),
    router = express.Router(),
    requests= require('../models/request');
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
        requests.find(where, selec).sort(sor).skip(ski).limit(limi).count().exec( (err, res_requests) => {
            if (err) {
                res.status(404).send({
                    message: "Error",
                    data: []
                });
            } else {
                res.status(200).send({
                    message: 'OK',
                    data: res_requests
                })
            }
        })
    }else{
        requests.find(where, selec).sort(sor).skip(ski).limit(limi).exec( (err, res_requests) => {
            if (err) {
                res.status(404).send({
                    message: "Error",
                    data: []
                });
            } else {
                res.status(200).send({
                    message: 'OK',
                    data: res_requests
                })
            }
        })
    }
});

router.post('/', async function (req, res){
    const request = new requests(req.body);
        request.save()
        .then(request => {
        res.status(201).send({
            message : 'request added successfully',
            data: request
            });
        })
        .catch(err => {
        res.status(500).send({
            message : "request not added",
            data: []
            });
        })
});

router.get('/:email', function (req, res) {
    requests.findOne( {"email": req.params.email} ).exec( (err, request) => {
            if (err) {
                //console.log(err);
                res.status(404).send({
                    message: "Error",
                    data: []
                });
            } else if (!request) {
                res.status(404).send({
                    message: 'No requests with that email found',
                    data: []
                });
            }
            else {
                res.status(200).send({
                    message: 'OK',
                    data: request
                })
            }
        }
    )
});

router.put('/:email', function (req, res) {
        requests.findOneAndUpdate( {"email": req.params.email}, req.body, {new: true}, (err, request) => {
            if (err) {
                res.status(404).send({
                    message: "Error",
                    data: []
                });
            } else if (!request) {
                res.status(404).send({
                    message: 'No requests with that email found',
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
    requests.findByOneAndDelete( {"email": req.params.email}, (err, request) => {
        if (err) {
            res.status(404).send({
                message: "Error",
                data: []
            });
        } else if (!request) {
            res.status(404).send({
                message: 'No requests with that email found',
                data: []
            });
        } else {
            res.status(200).send({
                message: 'Deleted request',
                data: []
            })
        }
    })
});

module.exports = router;