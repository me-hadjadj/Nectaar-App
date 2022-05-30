var mongoose = require('mongoose');

var abonnementSchema = mongoose.Schema({
    nom: String,
    prix: Number,
    description: String,
    places: Number
});

var abonnementModel = mongoose.model('abonnements',abonnementSchema);

module.exports = abonnementModel;