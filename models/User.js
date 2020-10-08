const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({

    username: {
        type: String,
        required: true,
        minlength: [3, 'Username minimal length: 3']
    },
    email: {
        type: String,
        required:true,

        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email!'
        }
    },
    password: {
        type: String,
        required: true
    }
});
userSchema.plugin(uniqueValidator);
const User = mongoose.model('User', userSchema);
module.exports = User;