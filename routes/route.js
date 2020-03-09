const bodyParser = require('./bodyParser');
module.exports = function(app, db, webSocket){
    app.get('/',(req,res,next) =>{
        if(req.cookies.login != undefined && req.cookies.login != ""){
            next();
        }
        else
            res.render('index');
    });


    webSocket.on('connection', ws =>{
        ws.on("message", message => {
            message = JSON.parse(message);
            if(message.operation == "New user"){
                for(let key in global.connectedUsers){
                    global.connectedUsers[key].ws.send(JSON.stringify({operation: "New user"}));
                }
            }
        })
    });

    app.post('/signUp', bodyParser.jsonParser,(req, res) =>{
        let user = {login: req.body.login, password: req.body.password};
        let collection = db.db('MeChat').collection('users');

        let cursor = collection.find({"login" : user.login});
        cursor.toArray((err, results) =>{
            if(results.length > 0)
                res.send({status: "already exists"});
            else{
                collection.insert(user, (err, result) =>{
                    if(err) 
                        res.send('Error');
                    else 
                        res.send({status:"ok"});
                });
            }
        });
    });

    app.post('/signIn', bodyParser.jsonParser, (req, res, next) =>{
        let user = {login: req.body.login, password: req.body.password};
        let collection = db.db('MeChat').collection('users');
        let cursor = collection.find({"login" : user.login, "password": user.password});
        cursor.toArray((err, results) =>{
            if(results.length == 1){
                res.cookie('login' , user.login);
                res.send({validation : true});
            }
            else 
                res.send({validation: false});
        });
    });
}