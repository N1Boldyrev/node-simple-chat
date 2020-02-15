const router = require('express').Router();
const bodyParser = require('./bodyParser');
const db_module = require('../config/db');



router.get('/', (req, res, next) => {
    res.render('index',{title: "MeChat"});
});

router.post('/signUp', bodyParser.jsonParser, (req, res, next) =>{
    const user = {login: req.body.login, password: req.body.password};
    db_module.client.connect(err =>{
        const collection = db_module.client.db("MeChat").collection("users").insert(user);
        db_module.client.close();
        res.send({status: "ok"});
    });
   
});

module.exports = router;