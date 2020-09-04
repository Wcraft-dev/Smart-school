const { Schema, model } = require('mongoose');
const class_Shema = new Schema({
    author: {
        type:String,
        required: true   
    },
    text:{
        type:String,
        required: true   
    },
    start_date: {
        type: String,
        match:/^\d{4}([\-])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9]) ([01]?[0-9]|2[0-3]):[0-5][0-9]$/g,
        required: true   
    },
    end_date: {
        type: String,
        match:/^\d{4}([\-])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9]) ([01]?[0-9]|2[0-3]):[0-5][0-9]$/g,
        required: true
    }
},{
    timestamps: true
});

module.exports = model('Class_', class_Shema);