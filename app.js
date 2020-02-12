const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const logPage = require('./routes/log');

app.engine('html', mustacheExpress());

app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname , 'public'))); // Отвечает за выдачу статических данных (css js изображений и т.д.)

app.use('/', logPage);

module.exports = app;