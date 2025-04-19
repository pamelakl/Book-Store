const mongoose = require('mongoose');
const validator = require('validator');

const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/;

const userSchema = new mongoose.Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
        validate: {
            validator: function (value) {
                return passwordRegex.test(value);
            },
            message: 'Password must be at least 8 characters long, include one uppercase letter, one digit, and one non-alphanumeric character.'
        }
    },
    email: {
        type: String,
        required: [true, 'Email name is required'],
        unique: true,
        validate(value){
            if(!validator.isEmail(value))
                throw new Error("Email is not valid")
        }
    },
    admin: {
        type: Boolean,
        required: true
    },
    books: [{ type: mongoose.Types.ObjectId, ref: 'Book'}]
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;

