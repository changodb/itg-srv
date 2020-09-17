const express = require('express');
const router = express.Router();

const mongo = require('../mongo');

const _generateClauseForSearchAggregation = (query, path) => (
  {
    text: {
      query,
      path,
      fuzzy: {
        maxEdits: 1
      }
    }
  }
)


const generateSingleSearchAggregationStage = (query, path) => (
    {
        $search: _generateClauseForSearchAggregation(query, path)
    }
);

const generateMultiSearchAggregationStage = (searches) => (
  {
    $search: {
      compound: {
        should: searches.map(({ query, path }) => _generateClauseForSearchAggregation(query, path)),
        minimumShouldMatch: 1
      }
    }
  }
);

const generateMatchAggregationStage = (value, path, operation) => (
    {
        $match: {
            [path]: {
                [operation]: value
            }
        }
    }
);

/*POST endpoint */

// construct post endpoint
router.post('/', function (req, res) {
  const pipeline = [];
  const textSearches = [];
  if (req.body.artist !== undefined) {
      textSearches.push({ query: req.body.artist, path: "artist" });
  }
  if (req.body.name !== undefined) {
      textSearches.push({ query: req.body.name, path: "name" });
  }
  if (req.body.packName !== undefined) {
      textSearches.push({ query: req.body.packName, path: "pack.name" });
  }

  if (textSearches.length == 1) {
    pipeline.push(generateSingleSearchAggregationStage(textSearches[0].query, textSearches[0].path));
  }
  else if (textSearches.length > 1) {
    pipeline.push(generateMultiSearchAggregationStage(textSearches));
  }

  if (req.body.minBpm !== undefined) {
      pipeline.push(generateMatchAggregationStage(parseInt(req.body.minBpm), "bpm", "$gte"));
  }
  if (req.body.maxBpm !== undefined) {
      pipeline.push(generateMatchAggregationStage(parseInt(req.body.maxBpm), "bpm", "$lte"));
  }
  if (req.body.minDiff !== undefined) {
      pipeline.push(generateMatchAggregationStage({ $gte: parseInt(req.body.minDiff) }, "difficulties", "$elemMatch"));
  }
  if (req.body.maxDiff !== undefined) {
      pipeline.push(generateMatchAggregationStage({ $lte: parseInt(req.body.maxDiff) }, "difficulties", "$elemMatch"));
  }
  pipeline.push(
    {
      $project: {
        artist: 1,
        name: 1,
        pack: 1,
        difficultyMap: 1,
        game: 1,
        score: {$meta: "searchScore"}}
    }
  );

  // get a client that can connect to the db
  const client = mongo.get();

  // get the itg db from the client
  const db = client.db('itg');

  // get the simfiles collection from the db
  const coll = db.collection('simfiles');

  coll.aggregate(pipeline).toArray((err, docs) => {
      if (err !== null) {
          console.error(err);
      } else {
          console.log("Received " + docs.length + " results.");
          res.send(docs);
      }
  });

  // perform a find on the simfiles collection

  // // invoke toArray to output the cursor contents as an array
  // function getMatches() {
  //   return coll.find(pipeline).toArray();
  // }
  //
  // // define asynchronous function to get the query results
  // // send the array of results to the client
  // async function asyncGet() {
  //   const matches = await getMatches();
  //   res.send(matches);
  // }
  //
  // // invoke the async function that triggers the database operations
  // // and sends the API response to the client
  // asyncGet();
});

module.exports = router;
