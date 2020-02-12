const router = require('express').Router();

router.get('/', (req, res, next) => {
    res.render('index',{title: "test", hello:'hello world'});
});

module.exports = router;