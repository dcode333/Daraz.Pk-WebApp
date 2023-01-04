const mongoose = require("mongoose");
const url =
  "mongodb+srv://admin-umair:test123@cluster0.xg387ne.mongodb.net/DarazDB";

const ConnectToMongo = () => {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("DB Connection Succesful");
    })
    .catch((e) => {
      console.log("Something went wrong Umair ! : ", e);
    });
};

module.exports = ConnectToMongo;
