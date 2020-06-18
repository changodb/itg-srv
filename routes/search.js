const express = require('express');
const router = express.Router();

const mongo = require('../mongo');
const models = require('../models');
const Simfile = models.Simfile;


/*POST endpoint */

// construct post endpoint
router.post('/', function (req, res) {
  const filter = {};
  // construct filter
  if (req.body.name) {
    filter.song_name = req.body.name;
  };
  if (req.body.artist) {
    filter.song_artist = req.body.artist;
  };
  if (req.body.minBpm) {
    filter.bpm = filter.bpm || {};
      filter.bpm.$gte = Number(req.body.minBpm);
  };
  if (req.body.maxBpm) {
    filter.bpm = filter.bpm || {};
    filter.bpm.$lte = Number(req.body.maxBpm);
  };
  console.log("filter:", filter);

  // get a client that can connect to the db
  const client = mongo.get();

  // get the itg db from the client 
  const db = client.db('itg');

  // get the simfiles collection from the db
  const coll = db.collection('simfiles');

  // perform a find on the simfiles collection
  // limit to 4 results - for initial testing
  // invoke toArray to output the cursor contents as an array
  function getMatches() {
    return coll.find(filter).limit(4).toArray();
  }

  // define asynchronous function to get the query results
  // send the array of results to the client
  async function asyncGet() {
    const matches = await getMatches();
    res.send(matches);
  }

  // invoke the async function that triggers the database operations
  // and sends the API response to the client
  asyncGet();
});

module.exports = router;
