const bodyParser = require('./bodyParser');
module.exports = function(app, db){
    app.get('/UsersList', (req, res) => {
        let collection = db.db('MeChat').collection('users');
        let users = collection.find({}, {projection: {password: false}});
        users.toArray((err, results) => {
            res.send(results);
        });
    })
}