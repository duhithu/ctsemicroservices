//Use mongoose dependency
const mongoose = require('mongoose');
const schema = mongoose.Schema;

// Define a new database schema for payment
const Paymentschema = new schema({
    orderId :{
        type : String,
        required: true
    },
    amount : {
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
const Payment = mongoose.model("payments",Paymentschema);


//Export the order schema so that it can be accessed by other files
module.exports = Payment;