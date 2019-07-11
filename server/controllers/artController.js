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

// art/mine  a feed of your art
router.get("/mine", validateSession,  (req, res) => {
      Art.findAll({ where: { owner: req.user.id}})
          .then(art => res.status(200).json(art))
          .catch(err => res.status(500).json({error: err}))
  
  });

  // art/feed  a feed of all art
router.get("/feed", validateSession,  (req, res) => {
    Art.findAll()
        .then(art => res.status(200).json(art))
        .catch(err => res.status(500).json({error: err}))

});

//EDIT
router.put('/:id', validateSession, (req, res) => {
    Art.update(req.body.art, { where: { id: req.params.id, owner: req.user.id},returning: true})
      .then(art => res.status(200).json(art))
      .catch(err => res.status(500).json({ error: err}))
  });

  // DELETE
// Allows individual feeds to be deleted by a user.

router.delete('/:id', validateSession, (req, res) => {
    Art.destroy({where:  {id: req.params.id, owner: req.user.id}})
      .then(art => res.status(200).json(art))
      .catch(err => res.status(500).json({ error: err}))
  })

module.exports = router;