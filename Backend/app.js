const express = require("express");
const app = express();
const cors = require("cors");
const ConnectToMongo = require("./database");
const port = process.env.PORT || 5000;

ConnectToMongo();  
app.use(cors());
app.use(express.json()); // parsing body
app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/products"));
app.use("/api/cart", require("./routes/cartItems"));

app.listen(port, () => {
  console.log(`Daraz.pk app listening at http://localhost:${port}`);
});
