const express = require('express');
const router = express.Router();

const models = require('../models');
const Simfile = models.Simfile;


/* GET itg data */
router.get('/itg', function(req, res) {
    const filter = {};
    if (req.query.name !== undefined) {
        filter.song_name = req.query.name;
    };
    if (req.query.artist !== undefined) {
        filter.song_artist = req.query.artist;
    };
    if (req.query.minBpm !== undefined) {
        filter.bpm = filter.bpm || {};
        filter.bpm.$gte = Number(req.query.minBpm);
        console.log('filter.bpm.$gte:', filter.bpm.$gte);
    };
    if (req.query.maxBpm !== undefined) {
        filter.bpm = filter.bpm || {};
        filter.bpm.$lte = Number(req.query.maxBpm);
        console.log('filter.bpm.$lte:', filter.bpm.$lte);
    };

    console.log('filter:', JSON.stringify(filter));

    const db = req.db;
    console.log("db:", db);
    Simfile.find(filter)
        .lean()
        .exec((err, simfiles) => {
            if (err) {
                res.json({
                    msg: "Error",
                    err: err
                });
            } else {
                res.json(simfiles);
            }
        });
});

module.exports = router;
