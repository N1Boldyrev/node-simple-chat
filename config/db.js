const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(uri, { useNewUrlParser: true });
const db = 'MeChat';


exports.client = client;