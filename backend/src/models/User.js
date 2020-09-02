const { Schema, model } = require('mongoose');
const userShema = new Schema({
    username:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    name: {
        type: String,
        trim: true,
        maxlength: 30
    },
    lastName: { 
        type: String,
        trim: true,
        maxlength: 30
    },
    email: { 
        type: String, 
        required: true,
        trim: true,
        maxlength: 100,
        match: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/g
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 30
    }


},{
    timestamps: true
});

module.exports = model('User', userShema);