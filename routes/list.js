const express = require('express');
const router = express.Router();
var _ = require('underscore');
const mongo = require('../mongo');
router.post('/', function(req,res) {
  // get a client that can connect to the db
  const client = mongo.get();
  // get the itg db from the client
  const db = client.db('itg');
  // get the simfiles collection from the db
  const coll = db.collection('simfiles');

  let packList = coll.distinct(req.body.field, {})
    .then(packs => {
      let packMap = _.map(packs, packName => {
        let query = {"pack.name" : packName};
        return new Promise((resolve, reject) => {
        coll.countDocuments(query, {})
          .then((count) => resolve({packName, count}))
          .catch((error) => reject(error))
        });
      });
      return Promise.all(packMap);
      // create a new Promise which resolves when the entire list of Promises resolve
      })
      .then(results => {
        // Take the list of {[packName]: count} and send it to the frontend
        res.send(results);
      })
      .catch(err => console.error('Something Went Wrong in packList', err))
});
module.exports = router;
