const express = require("express");
const router = express.Router();
const Like = require("../../models/Like");
const auth = require('../../middleware/auth');

//This gets the likes from the database and sorts them in desc order
router.get('/', (req, res) => {
  console.log("Getting Likes");
  Like.find()
    .sort({ date: -1 })
    .then(likes => res.json(likes));
    //Use console.log(likes) to see what data returns in the terminal
});

router.post('/', (req, res) => {
  const newLike = new Like({
    id: req.body.id,
    name: req.body.name,
    hazardous: req.body.hazardous
  });
  newLike.save().then(like => res.json(like));
});

router.delete('/:id', (req, res) => {
    Like.findById(req.params.id).then(like =>
      like.remove().then(() => res.json({ success: true }))
  )
  .catch(err => res.status(404).json({ success: false }));
})
module.exports = router;
