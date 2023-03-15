const mongoose = require("mongoose");
const url =process.env.MONGO_URL;

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
