const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const routes = require('./routes');
const mongoose = require('mongoose');
const config = require('./config/env.json');
const PORT = 3002;

mongoose.connect(`${config.url}${config.host}:${config.port}/${config.db}`, { 
  useNewUrlParser: true,
  useCreateIndex: true,
});

let db = mongoose.connection;

db.once('open', () => {
    console.log('Connected to MongoDB');
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin", "X-Requested-With", "Content-Type", "Accept");
  next();
});

app.use(helmet());
app.use('/', routes);

app.listen(PORT);
console.log(`Auth Service running on ${PORT}`);