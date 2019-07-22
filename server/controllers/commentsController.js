const router = require('express').Router();
const Comment = require('../db').import('../models/comments')
const validateSession = require('../middleware/validate-sessions')


// get the comments
router.get("/", (req, res) => {
   Comment.findAll()
       .then( comments => res.status(200).json(comments) )
       .catch( err => res.status(500).json({error: err }) )
})

//should pull from art but heres the spicy bit
router.post("/:id", validateSession, (req, res) => {
    const comments ={
        comment: req.body.comments.comment,
        username: req.user.username,
        post: req.params.id,
        owner: req.user.id
    }
    Comment.create(comments,{where: {post:req.params.id}})
       .then( comment => res.status(200).json(comment) )
       .catch( err => res.status(500).json( {error: err }) );
})



router.get('/:id', validateSession, (req, res) => {
   Comment.findAll({ where: { post: req.params.id }})
     .then(comments => res.status(200).json(comments))
     .catch(err => res.status(500).json({ error: err}))
 })

 //edit

router.put('/:id', validateSession, (req, res) => {
   Comment.update(req.body.comment, { where: { id: req.params.id },returning: true})
     .then(comments => res.status(200).json(comments))
     .catch(err => res.status(500).json({ error: err}))
 })

 //delete

 router.delete('/:id', validateSession, (req, res) => {
     Comment.destroy({ where: { id: req.params.id }})
     .then(comments => res.status(200).json(comments))
     .catch(err => res.status(500).json({ error: err}))
 })

module.exports = router;