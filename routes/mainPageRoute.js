const bodyParser = require('./bodyParser');
module.exports = function(app, db, ObjectId){
    app.get('/UsersList', (req, res) => {
        let collection = db.db('MeChat').collection('users');
        let users = collection.find({}, {projection: {password: false}});
        users.toArray((err, results) => {
            res.send(results);
        });
    });

    app.get('/messages', (req,res) => {
        let destination = req.cookies.destination;
        let login = req.cookies.login;
        let collection = db.db('MeChat').collection('messages');
        let messages = collection.find({$and:[{users: destination}, {users: login}]});
        messages.toArray((err, results) => {
            res.send(results);
        });
    });

    app.post('/sendMessage', bodyParser.jsonParser, (req, res) => {
        let sender = req.cookies.login;
        let getter = req.body.destination;
        let message = req.body.messageText; 

        let insertMessage = {users: [sender, getter], message: message, sender: sender, wasRead: false};

        let collection = db.db('MeChat').collection('messages');
        let sendMessage = collection.insert(insertMessage, (err, result) =>{
            if(err) res.send({response: "Error"})
            else res.send({response: "ok"});
        });
    });

    app.post('/wasRead', bodyParser.jsonParser, (req, res) =>{
        let collection = db.db('MeChat').collection('messages');
        console.log(req.body.id);
        if(req.body.sender != req.cookies.login){
        let wasRead = collection.update({_id: new ObjectId(req.body.id)}, {$set:{wasRead: true}}, (err,result) => {
            if(err) res.send({response: "Error"})
            else res.send({response: "ok"});
        });
    }
    });
}