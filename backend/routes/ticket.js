var express = require('express');
var router = express.Router();

var request = require('sync-request')

var userModel = require('../models/users')


router.post('/addTicket', async function (req, res, next) {
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