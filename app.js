// external imports
const express = require('express');

// internal imports
const connectWithDB = require('./mongoose');
const routers = require('./router');

const app = express();

app.use(express.json());

// database
connectWithDB();

// routers refactoring
const { usersRouter } = routers;

// gat all routers
app.use('/users', usersRouter);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
module.exports = app;
