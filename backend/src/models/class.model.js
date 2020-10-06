import { Schema, model, version } from 'mongoose'

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
        match:/^\d{4}([\-])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[\-](0[1-9]|1[0-2]) ([0-1][0-9]|2[0-3]):[0-5][0-9]$/g,
        required: true   
    },
    end_date: {
        type: String,
        match:/^\d{4}([\-])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[\-](0[1-9]|1[0-2]) ([0-1][0-9]|2[0-3]):[0-5][0-9]$/g,
        required: true
    }
},{
    timestamps: true,
    versionKey: false,
});

export default model('Class_', class_Shema);