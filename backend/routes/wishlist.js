var express = require('express');
var router = express.Router();

var request = require('sync-request')

var userModel = require('../models/users')


// router.post('/wishlist-event', async function(req, res, next) {

//   var newWishlistevent = new eventsModel({
//     titre:req.body.title,
//     description:req.body.desc,
//     photos: req.body.img,
//   })

//   var eventSave = await newWishlistevent.save()

//   var result = false
//   if(eventSave.titre){
//     result = true
//   }

//   res.json({result})
// });

// router.delete('/wishlist-event/:name', async function(req, res, next) {

//   var returnDb = await eventsModel.deleteOne({ titre: req.params.title})

//   var result = false
//   if(returnDb.deletedCount == 1){
//     result = true
//   }

//   res.json({result})
// });

// router.get('/wishlist-event', async function(req, res, next) {

//   var events = await eventsModel.find()

//   res.json({events})
// });


router.post('/addToWishlist', async function (req, res, next) {
  var user = await userModel.findOneAndUpdate(
    { token: req.body.token },
    { $push: { "wishlist": req.body.eventId } }
  );
  if (user) {
    res.json({ result: true });
  } else {
    res.json({ result: false });
  }
})

router.post('/getWishlist', async function (req, res, next) {
  console.log('dans getWishlist');
  var events = await userModel.findOne({ token: req.body.token }).populate('wishlist');
  if (events) {
    res.json(events);
  } else {
    res.json(false);
  }

})

router.post('/deleteFromWishlist', async function (req, res, next) {
  console.log('eventid',req.body.eventId);
  console.log('token',req.body.token);
  var user = await userModel.findOneAndUpdate(
    { token: req.body.token },
    { $pull: { "wishlist": req.body.eventId } },
    { returnDocument: 'after' }
  ).populate('wishlist');
  if (user) {
    res.json({ result: true, user });
  } else {
    res.json({ result: false });
  }
})

module.exports = router;
