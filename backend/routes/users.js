var express = require('express');
var router = express.Router();
var bcrypt = require("bcrypt");
var uid2 = require("uid2");
var userModel = require("../models/users");
var abonnementModel = require("../models/abonnements");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/sign-up", async function (req, res, next) {
  
  var error = [];
  var result = false;
  var saveUser = null;
 
  var userPassword = req.body.passwordFromFront;
  const hash = bcrypt.hashSync(userPassword, 10);

console.log(req.body.emailFromFront);
  const data = await userModel.findOne({
    email: req.body.emailFromFront,
  });

  if (data != null) {
    error.push("utilisateur déjà présent");
  }

  if (
    req.body.emailFromFront == "" ||
    req.body.passwordFromFront == ""
  ) {
    error.push("champs vides");
  }

  if (error.length == 0) {
    var newUser = new userModel({
      firstname: req.body.firstnameFromFront,
      lastname: req.body.lastnameFromFront,
      email: req.body.emailFromFront,
      password: hash,
      token: uid2(32),
      subscription: {dateOfSubscription: new Date(Date.now())},
      NumberOfPlacesHave: 0
    });
    

    saveUser = await newUser.save();

    if (saveUser) {
      result = true;
    }
  }

  res.json({ result, saveUser, error });
});

router.post("/sign-in", async function (req, res, next) {
  var result = false;
  var user = null;
  var error = [];

  var password = req.body.passwordFromFront;

  if (req.body.emailFromFront == "" || req.body.passwordFromFront == "") {
    error.push("champs vides");
  }

  if (error.length == 0) {
    var user = await userModel.findOne({
      email: req.body.emailFromFront,
      // password: req.body.passwordFromFront,
      // token: req.body.tokenFromFront
    }).populate('subscription.idSubscription');


  if (user) {
    
    if (bcrypt.compareSync(password, user.password)) {
      result = true;
      token = user.token
    } else {
      result = false;
      error.push("Mot de passe incorrect");
    }
  } else {
    error.push("email incorrect");
  }
}
 res.json({result, user, error})
});

router.post('/saveThisSubscription', async function(req,res,next){
  let subscriptionTitle = req.body.subscriptionTitleFromFront;
  let dateOfSubscription = new Date(Date.now())
  let getAbonnement = await abonnementModel.findOne({nom: subscriptionTitle});
  if(getAbonnement){
    let user = await userModel.findOneAndUpdate(
      {token: req.body.token},
      {
        "subscription.dateOfSubscription": dateOfSubscription, 
        "subscription.idSubscription": getAbonnement._id, 
        $inc: {"NumberOfPlacesHave": getAbonnement.places}
      },
      {returnDocument:'after'}
    ).populate('subscription.idSubscription')
    if(user){
      console.log('user',user);
      res.json({result:true,user})
    }else{
      res.json({result:false})
    }
  }
})

//Récupération des infos user via le token
//Cette route est appelée uniquement si l'utilisateur a un token dans son local storage
router.post('/getUserByToken', async function(req,res,next){
  var user = await userModel.findOne({token:req.body.token}).populate('subscription.idSubscription')
  if(user){
    res.json({result:true, user});
  }else{
    res.json({result:false});
  }
})

router.post('/addRating', async function(req,res,next){
  // let subscriptionTitle = req.body.subscriptionTitleFromFront;
  let myRating = req.body.myRatingFromFront;
  let userToken = req.body.tokenFromFront;
  let reservationId = req.body.reservationId;
  console.log('reservationId',reservationId);

  console.log(myRating);
  console.log(userToken);

 

    var user = await userModel.findOneAndUpdate(                       
        {token: userToken, "reservation._id":reservationId},
        {$set:{"reservation.$.myRating":myRating}},
        {returnDocument:'after'}
       )
    console.log('user',user)
  
    if(user){
    res.json({result: true, user, myRating, userToken})
}else{
    res.json({result: false})
}
})

module.exports = router;
