var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req);
  res.render('index', { title: 'Fit Up Your Style' });
});

/* Create POST endpoint for passing search results to itg-frontend. */
router.post('/', function (req, res) {
  //extract data from request
  //create a database entry?
  console.log(req.body);
  let query = req.body.queryFilters.map((queryFilter) => ({
    [queryFilter.field]:{
      '$eq': queryFilter.value
    }
  }));
  query = {'$and': query}
  console.log(JSON.stringify(query));
  res.status(200).json({message:'ok'});
});

module.exports = router;