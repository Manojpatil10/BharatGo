require('dotenv').config();  // Load environment variables first

const express = require("express");
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");
// const multer = require('multer');
const router = require('./routes/main-routes');

app.use(cors({
    origin: "*", 
    methods: "GET,POST,PUT,PATCH,DELETE",
    allowedHeaders: "Content-Type,Authorization"
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));  // If needed for form data

app.use(router);

// const mongodb_url = process.env.MONGODB_URL;

// mongoose.connect(mongodb_url).then(() => {
//     console.log("MongoDB connected successfully");
// }).catch((err) => {
//     console.log("Error in MongoDB connection", err);
// });

const atlas_url = process.env.ATLAS_URL;

mongoose.connect(atlas_url).then((connected)=>{
    console.log("Mongodb connected successfully");
  }).catch((err)=>{
    console.log("error in mongodb connection",err);
  })

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
