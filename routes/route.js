const bodyParser = require('./bodyParser');
module.exports = function(app, db){
    app.get('/',(req,res,next) =>{
        if(req.cookies.login != undefined)
            next();
        else
            res.render('index');
    });

    app.get('/', (req, res) => {
        res.render('main');
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
            console.log(results.length);
            if(results.length == 1){
                res.cookie('login' , user.login);
                res.send({validation : true});
            }
            else 
                res.send({validation: false});
        });
    });
}