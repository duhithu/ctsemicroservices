//Use mongoose dependency
const mongoose = require('mongoose');
const schema = mongoose.Schema;

// Define a new database schema for order
const Orderschema = new schema({
    orderItems :{
        type : String,
        required: true
    },
    price : {
        type : String,
        required : true
    },
    date : {
        type : String,
        required : true
    },
    time : {
        type : String,
        required : true
    }
})

// create mongoose model
const Order = mongoose.model("orders",Orderschema);


//Export the order schema so that it can be accessed by other files
module.exports = Order;