var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Hello World page. */
router.get('/helloworld', function (req, res) {
    res.render('helloworld', { title: "Hello World!" });
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var coll = db.get('usercollection');
    coll.find({},{},function(e,docs){
            res.render('userlist', {
                "userlist" : docs
            });
    });
});

/* GET itg data */
router.get('/itg', function(req, res) {
    var db = req.db;
    var coll = db.get('simfiles');
    //console.log("coll:", coll);
    coll.find({},{},function(e,docs){
            //console.log("docs:", docs);
            res.render('itg', {
                "itg" : docs
            });
    });
});

module.exports = router;
