var express = require('express');
var router = express.Router();

//Hardcoding state
simfileResults: [
  {
    "songName": "My cool song",
    "songArtist": "DJ SNAZZ",
    "bpm": 69,
    "packName": "Foobar",
    "difficulty": {
      "easy": 3
    },
    "expanded": false
  },
  {
    "songName": "Freaknik is Bacc",
    "songArtist": "T-Pain",
    "bpm": 420,
    "packName": "Rackem",
    "difficulty": {
      "oni": 13
    },
    "expanded": false
  },
  {
    "songName": "Thizzle DanCE",
    "songArtist": "Mac Dre",
    "bpm": 111,
    "packName": "Hoozawutzit",
    "difficulty": {
      "beginner": 1,
      "light": 3,
      "standard": 5,
      "heavy": 8,
      "challenge": 11,
    },
    "expanded": false
  }
]

/* GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Fit Up Your Style' });
});
*/

/* Create POST endpoint for passing search results to itg-frontend. */
router.post('/search', function (req, res) {
  //extract data from request
  //create a database entry?
  res.json(simfileResults);
});

module.exports = router;