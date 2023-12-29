const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const User = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Must enter name"]
    },
   
    email: {
        type: String,
        required: [true, "Must enter email"]
    },
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',
        // Set required based on role
        required: function() {
            return this.role === 'Manager' || this.role === 'Employee';
        }
    },
    password: {
        type: String,
        required: [true, "Must enter Password"],
        unique: true,
    },
    role: {
        type: String,
        required: [true, "Must select your role"],
        enum: ['Admin', 'Manager', 'Employee'],
        default: 'Employee'
    }
});

User.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const saltRounds = 10; 
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
});

module.exports = mongoose.model("User", User);
