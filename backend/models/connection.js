var mongoose = require("mongoose");

var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.connect(
  "mongodb+srv://Nectaar:batch50!@cluster0.nzyvh.mongodb.net/Nectaar?retryWrites=true&w=majority",
  options,
  function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Connection à la base de données réussi");
    }
  }
);
