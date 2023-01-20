// external imports
const express = require('express');
const winston = require('winston');
const expressWinston = require('express-winston');
const winstonFile = require('winston-daily-rotate-file');
const winstonMongo = require('winston-mongodb');
const { ElasticsearchTransport } = require('winston-elasticsearch');

// internal imports
const connectWithDB = require('./mongoose');
const handleErrors = require('./middlewares/handleError');
const routers = require('./router');

const app = express();

app.use(express.json());

// middleware
const processRequest = async (req, res, next) => {
    let correlationId = req.headers['x-correlation-id'];
    if (!correlationId) {
        correlationId = Date.now().toString();
        req.headers['x-correlation-id'] = correlationId;
    }

    res.set('x-correlation-id', correlationId);

    return next();
};

app.use(processRequest);

const getMessage = (req, res) => {
    const obj = {
        correlationId: req.headers['x-correlation-id'],
        requestBody: req.body,
    };

    return JSON.stringify(obj);
};

const fileInfoTransport = new winston.transports.DailyRotateFile({
    filename: 'log-info-%DATE%.log',
    datePattern: 'yyyy-MM-DD-HH',
});

const fileErrorTransport = new winston.transports.DailyRotateFile({
    filename: 'log-error-%DATE%.log',
    datePattern: 'yyyy-MM-DD-HH',
});

const mongoErrorTransport = new winston.transports.MongoDB({
    db: process.env.MONGO_URL,
    metaKey: 'meta',
});

const elasticsearchOptions = {
    level: 'info',
    clientOpts: {
        node: 'http://localhost:9200',
    },
    indexPrefix: 'log-parcelkoi',
};

const esTransport = new ElasticsearchTransport(elasticsearchOptions);

// logger
const infoLogger = expressWinston.logger({
    transports: [new winston.transports.Console(), fileInfoTransport, esTransport],
    format: winston.format.combine(winston.format.colorize(), winston.format.json()),
    meta: false,
    msg: getMessage,
});

const errorLogger = expressWinston.errorLogger({
    transports: [
        new winston.transports.Console(),
        fileErrorTransport,
        mongoErrorTransport,
        esTransport,
    ],
    format: winston.format.combine(winston.format.colorize(), winston.format.json()),
    meta: true,
    msg: '{ "correlationId": "{{req.headers["x-correlation-id"]}}", "error": "{{err.message}}" }',
});

app.use(infoLogger);

// database
connectWithDB();

// routers refactoring
const { usersRouter } = routers;

// gat all routers
app.use('/users', usersRouter);

// error logger
app.use(errorLogger);

app.use(handleErrors);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = app;
