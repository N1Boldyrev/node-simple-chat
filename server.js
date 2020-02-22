const express = require('express');
const mustacheExpress = require('mustache-express');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

const port = process.env.PORT || 3000;
const dbUrl = "mongodb://127.0.0.1:27017/";

const WebSocket = require('ws');

const webSocketServer = new WebSocket.Server({port: port + 1});




app.engine('html', mustacheExpress());

app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname , 'public'))); // Отвечает за выдачу статических данных (css js изображений и т.д.)
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

MongoClient.connect(dbUrl, (err, database) => {
    if(err) return console.log(err);
    require('./routes/route')(app, database);
    require('./routes/mainPageRoute')(app,database, ObjectId, webSocketServer);
    app.listen(port, () => console.log(`Server start on port ${port}`));
});
