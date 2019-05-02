var express = require('express'),
    router = express.Router(),
    nonprofits= require('../models/nonprofit');
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
        nonprofits.find(where, selec).sort(sor).skip(ski).limit(limi).count().exec( (err, res_nonprofits) => {
            if (err) {
                res.status(404).send({
                    message: "Error",
                    data: []
                });
            } else {
                res.status(200).send({
                    message: 'OK',
                    data: res_nonprofits
                })
            }
        })
    }else{
        nonprofits.find(where, selec).sort(sor).skip(ski).limit(limi).exec( (err, res_nonprofits) => {
            if (err) {
                res.status(404).send({
                    message: "Error",
                    data: []
                });
            } else {
                res.status(200).send({
                    message: 'OK',
                    data: res_nonprofits
                })
            }
        })
    }
});

router.post('/', async function (req, res){
    const nonprofit = new nonprofits(req.body);
        nonprofit.save()
        .then(nonprofit => {
        res.status(201).send({
            message : 'nonprofit added successfully',
            data: nonprofit
            });
        })
        .catch(err => {
        res.status(500).send({
            message : "nonprofit not added",
            data: []
            });
        })
});

router.get('/:email', function (req, res) {
    nonprofits.findOne( {"email": req.params.email} ).exec( (err, nonprofit) => {
            if (err) {
                //console.log(err);
                res.status(404).send({
                    message: "Error",
                    data: []
                });
            } else if (!nonprofit) {
                res.status(404).send({
                    message: 'No nonprofits with that email found',
                    data: []
                });
            }
            else {
                res.status(200).send({
                    message: 'OK',
                    data: nonprofit
                })
            }
        }
    )
});

router.put('/:email', function (req, res) {
        nonprofits.findOneAndUpdate( {"email": req.params.email}, req.body, {new: true}, (err, nonprofit) => {
            if (err) {
                res.status(404).send({
                    message: "Error",
                    data: []
                });
            } else if (!nonprofit) {
                res.status(404).send({
                    message: 'No nonprofits with that email found',
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
    nonprofits.findByOneAndDelete( {"email": req.params.email}, (err, nonprofit) => {
        if (err) {
            res.status(404).send({
                message: "Error",
                data: []
            });
        } else if (!nonprofit) {
            res.status(404).send({
                message: 'No nonprofits with that email found',
                data: []
            });
        } else {
            res.status(200).send({
                message: 'Deleted nonprofit',
                data: []
            })
        }
    })
});

module.exports = router;