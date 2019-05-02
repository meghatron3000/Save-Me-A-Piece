var mongoose = require('mongoose');

var ScheduleSchema = new mongoose.Schema({
    email: {type: String, required: true},
    mondaystart: {type: Date},
    mondayend: {type: Date},
    tuesdaystart: {type: Date},
    tuesdayend: {type: Date},
    wednesdaystart: {type: Date},
    wednesdayend: {type: Date},
    thursdaystart: {type: Date},
    thursdayend: {type: Date},
    fridaystart : {type: Date},
    fridayend : {type: Date},
    saturdaystart : {type: Date},
    saturdayend :{type: Date},
    sundaystart :{type: Date},
    sundayend :{type: Date}
}, {versionKey: false} );

module.exports = mongoose.model('Schedule', ScheduleSchema);