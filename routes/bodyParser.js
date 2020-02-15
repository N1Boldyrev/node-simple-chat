const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({extended: false});

exports.bodyParser = bodyParser;
exports.jsonParser = jsonParser;
exports.urlencodedParser = urlencodedParser;
