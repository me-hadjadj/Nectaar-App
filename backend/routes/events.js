var express = require('express');
var router = express.Router();
var eventModel = require('../models/events');
var userModel = require('../models/users');

/* GET home page. */
router.get('/getEvents', async function(req, res, next) {
    var getEvents = await eventModel.find();
    if(getEvents.length > 0){
        getEvents = getEvents.filter((elt)=>{
            return Date.now() < new Date(elt.dates).getTime()
        })
        res.json(getEvents);
    }else{
        res.json({result: false});
    }
});

router.post('/addReservation', async function(req,res,next){
    console.log('nombre de tickets: ',req.body.ticketCount)
    var user = await userModel.findOneAndUpdate(
        {token: req.body.token},
       
        {
            $push: {"reservation": {dateOfSubscription: new Date(Date.now()), NumberOfPlacesTaken: req.body.ticketCount, idEvents: req.body.eventId}},
            $inc: {"NumberOfPlacesHave": (req.body.ticketCount*-1)}
            
         },
        {returnDocument: 'after'}
    );
    console.log(req.body.ticketCount)
    console.log(req.body.ticketCount*-1)

    if(user){
        res.json({result: true, user})
    }else{
        res.json({result: false})
    }
})

//récupérer toutes les réservations (à venir ou passé) d'un utilisateur
router.post('/getReservationList', async function(req,res,next){
    var user = await userModel.findOne(
        {token: req.body.token}
    ).populate('reservation.idEvents');
    if(user){
        res.json({result: true, user});
    }else{
        res.json({result: false});
    }
})

module.exports = router;
