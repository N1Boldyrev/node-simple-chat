const bodyParser = require('./bodyParser');
const events = require("events");
const { send } = require('process');
let emitter = new events.EventEmitter();
module.exports = function(app, db, ObjectId, webSocket){
    let connectedUsers = [];
    global.connectedUsers = connectedUsers;
   
    app.get('/', (req, res) => {
        res.render('main');
    });
    
    app.get('/UsersList', (req, res) => {
        let collection = db.db('MeChat').collection('users');
        let users = collection.find({}, {projection: {password: false}});
        users.toArray((err, results) => {
            res.send(results);
        });
    });


    webSocket.on('connection', ws =>{
        ws.on('message', message => {
            message = JSON.parse(message);
            if(message.operation == "User connect"){
                connectedUsers.push({login: message.login, ws: ws});
                global.connectedUsers = connectedUsers;
            }
            else if(message.operation == "Send message"){
                const collection = db.db('MeChat').collection('messages');
                let wsMessage = {operation: message.operation,sender: message.sender, message: message.messageText, id: message.id, wasRead : true}
                for(let key in connectedUsers){
                    if(connectedUsers[key].login == message.destination){
                        connectedUsers[key].ws.send(JSON.stringify(wsMessage));
                    } 
                }
            }
            else if(message.operation == "Was read"){
                let sendObj ={reader: message.reader, id: message.id, operation: message.operation,sender: message.sender, wasRead: false}
                for(let key in connectedUsers){
                    if(connectedUsers[key].login == message.sender && message.wasRead == false){
                        connectedUsers[key].ws.send(JSON.stringify(sendObj));
                    }
                    else if(connectedUsers[key].login == message.sender && message.wasRead == true){
                        sendObj.wasRead = true;
                        connectedUsers[key].ws.send(JSON.stringify(sendObj));
                    }
                }
            }

            else if(message.operation == 'typing'){
                let sendObj = {operation: 'typing', sender: message.sender, typing: message.typing};
                for(let key in connectedUsers){
                    if(connectedUsers[key].login == message.destination){
                        connectedUsers[key].ws.send(JSON.stringify(sendObj));
                    }
                }
            }
        });
        ws.on('close', () =>{
            for(let key in connectedUsers){
                if(connectedUsers[key].ws == ws) connectedUsers.splice(key,1);
            }
        })
    });

    app.get('/messages', (req,res) => {
        let destination = req.cookies.destination;
        let login = req.cookies.login;
        let collection = db.db('MeChat').collection('messages');
        let messages = collection.find({$and:[{users: destination}, {users: login}]});
            messages.toArray((err, results) => {
                if(results.length == 0){
                    res.send({response:'Empty'});
                }
                else{
                res.send(results); 
        }
            });
    });


    app.post('/findMessages', bodyParser.jsonParser, (req, res) => {
        let user = req.body.login;
        let findMessages = {users: user, wasRead: false};
        let collection = db.db('MeChat').collection('messages');
        let messages = collection.find(findMessages);
        messages.toArray((err, results) =>{
            if(err){
                res.send({response:"Error"});
            }
            else if(results.length == 0){
                res.send({response: "Empty"});
            }
            else res.send(results);
        });
    })

    app.post('/sendMessage', bodyParser.jsonParser, (req, res) => {
        let sender = req.cookies.login;
        let getter = req.body.destination;
        let message = req.body.messageText; 
        let insertMessage = {users: [sender, getter], message: message, sender: sender, wasRead: false};

        let collection = db.db('MeChat').collection('messages');
        let sendMessage = collection.insert(insertMessage, (err, result) =>{
            if(err) res.send({response: "Error"})
            else{
                res.send({response: "ok", id: result.insertedIds[0]});
            } 
        });
    });

    app.post('/wasRead', bodyParser.jsonParser, (req, res) =>{
        let collection = db.db('MeChat').collection('messages');
        if(req.body.sender != req.cookies.login){
        let wasRead = collection.update({_id: new ObjectId(req.body.id)}, {$set:{wasRead: true}}, (err,result) => {
            if(err) res.send({response: "Error"})
            else res.send({response: "ok"});
        });
    }
    });

}