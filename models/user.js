const mongoose = require('mongoose');

// schema
const { Schema } = mongoose;
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    createdAt: { type: Date, required: true },
});

// reference model
const User = mongoose.model('User', userSchema);

module.exports = User;
