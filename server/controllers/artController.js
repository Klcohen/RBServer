const express = require('express');
const router = express.Router();
const validateSession = require('../middleware/validate-sessions')
const Art = require('../db').import('../models/art');

//post create your art worry about how to get the img in there
router.post("/", validateSession, (req, res) => {
    const artpost ={
        image: req.body.art.image,
        title: req.body.art.title,
        tags: req.body.art.tags,
        owner: req.user.id
    }
    Art.create(artpost)
    .then(art => res.status(200).json(art))
    .catch(err => res.status(500).json({error: err}));
});

module.exports = router;