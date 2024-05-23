const express = require('express')
const dotenv = require('dotenv')
const morgan = require("morgan")
dotenv.config();
const mongoose = require('mongoose');


// getting Routes
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/posts");

mongoose.connect(process.env.DATABASE_URL).then(() => console.log("MongoDB Connected"));


// Creating server application
const app = express();



// middlewares
app.use(express.urlencoded({ extended : false }));
app.use(express.json());
app.use(morgan("common"));

// using routes
app.get("/", (req,res)=> res.send("Welcome to social media API homepage"));
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);


// server listening on port
app.listen(process.env.PORT, () => { console.log("Server is runnung") })
