//Use installed dependencies
const express = require("express"); 
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

//declare a constant variable for express
const app = express();

//use dotenv to load environmental variables from .env file
//to process.env
require("dotenv").config();

//use cors and bodyParser
app.use(cors());
app.use(bodyParser.json());

//MongoDB URL
const URL = process.env.MONGODB_URL;

//Port to run the server
const PORT = process.env.PORT || 8070;


//create mongoose connection
mongoose.connect(URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const connectio = mongoose.connection;
connectio.once("open",()=>{
    console.log("mongoDB connection successful !!!");
})

const paymentRouter = require("./routes/payments.js");
app.use("/payment",paymentRouter);

//run the app using port
app.listen(PORT, () =>{
    console.log(`Server is up and running on port number: ${PORT}`);

})