var mongoose = require("mongoose");

var eventSchema = mongoose.Schema({
  titre: String,
  dates: Date,
  categorie: String,
  emplacement: String,
  photos: String,
  description: String,
  url: String,
  tags: String,
  remain: Number,
});

var eventModel = mongoose.model("events", eventSchema);

module.exports = eventModel;
