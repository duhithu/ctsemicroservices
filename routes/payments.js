//Use express router, request
const router = require("express").Router();
const { request } = require("express");
//use Payment model
let Payment = require("../model/paymentmodel");

//add data to payment table
//./Payment/add
//Post request
router.route("/add").post((req,res)=>{
    const orderId = req.body.orderId;
    const amount = req.body.amount;
    const date = req.body.date;
    const time = req.body.time;

    const newPayment = new Payment({
        orderId,
        amount,
        date,
        time
    })

    newPayment.save().then(()=>{
        res.json("Payment Added")
    }).catch((err)=>{
        console.log(err);
    })
})

//Get all payments
//Get Request
router.route("/").get((req,res)=>{
    Payment.find().then((payments)=>{
        res.json(payments)
    }).catch((err)=>{
        console.log(err)
    })
})

//update a payment by id
//Put Request
router.route("/update/:id").put(async (req,res)=>{
    let paymentId = req.params.id;
    const {orderId,amount,date,time} = req.body;
    const updatePayment = {
        orderId,
        amount,
        date,
        time
    }

    const update = await Payment.findByIdAndUpdate(paymentId,updatePayment).then(()=>{
        res.status(200).send({status: "Payment Updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data"});
    })
})

//delete payment by id
//Delete Request
router.route("/delete/:id").delete(async (req, res)=>{
    let paymentId = req.params.id;

    await Payment.findByIdAndDelete(paymentId).then(()=>{
        res.status(200).send({status: "Payment deleted"});
    }).catch((err)=>{
        console.log(err);
    })
})

//find one of the payments by id
router.route("/get/:id").get((req,res)=>{
    let id = req.params.id;
    Payment.findById(id).then((payment)=>{
        res.json(payment)
    }).catch((err)=>{
        console.log(err);
    })
})


module.exports = router;