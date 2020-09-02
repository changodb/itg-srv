const express = require('express');
const router = express.Router();

const mongo = require('../mongo');

router.post('/', function(req,res) {
  // get a client that can connect to the db
  const client = mongo.get();

  // get the itg db from the client
  const db = client.db('itg');

  // get the simfiles collection from the db
  const coll = db.collection('simfiles');

  coll.distinct(req.body.field, {}, function(err, values){
    if(err !== null) {
      console.error(err);
    } else {
      console.log(values);
      res.send(values);
    }
  });
})
module.exports = router;
