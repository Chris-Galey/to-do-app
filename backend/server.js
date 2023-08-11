const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const todoRoutes = require("./routes");

const app = express();

const port = process.env.PORT;
const pass = process.env.DBPASS;
//CORS enabled
app.use(cors({ origin: "http://localhost:3001" }));
// Database

async function connectToDatabase() {
  try {
    const connectionURI = `mongodb+srv://GaleyDesign:${pass}@cranberry-lake-campgrou.ygtmkid.mongodb.net/?retryWrites=true&w=majority`;

    await mongoose.connect(connectionURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
}
connectToDatabase();

app.use(express.json());

//Routes
app.use("/", todoRoutes);

//Server
app.listen(port, () => {
  console.log(`port is running on ${port}`);
});
