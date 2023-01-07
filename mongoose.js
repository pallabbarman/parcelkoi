// external imports
const mongoose = require('mongoose');

// database connection
const connectWithDB = () => {
    mongoose.set('strictQuery', false);
    mongoose
        .connect(process.env.MONGO_URL)
        .then(() => console.log('database connection successful!'))
        .catch((err) => console.error(err));
};

module.exports = connectWithDB;
