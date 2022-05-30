var mongoose = require('mongoose');


const subscriptionSchema = mongoose.Schema({
    dateOfSubscription: Date,
    idSubscription: {type: mongoose.Schema.Types.ObjectId, ref: 'abonnements'},
})

const reservationSchema = mongoose.Schema({
    dateOfReservation: Date,
    NumberOfPlacesTaken : Number,
    myRating: Number,
    idEvents: {type: mongoose.Schema.Types.ObjectId, ref: 'events'}
})

var userSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    token: String,
    adresse:String,
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref:'events' }],
    subscription: subscriptionSchema,
    reservation:[reservationSchema],
    NumberOfPlacesHave: Number,
    automaticPayment: Boolean,

    
});

var userModel = mongoose.model('users',userSchema);

module.exports = userModel;