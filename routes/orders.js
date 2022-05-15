//Use express router, request
const router = require("express").Router();
const { request } = require("express");
//use Order model
let Order = require("../model/ordermodel");

//add data to order table
//./Order/add
//Post request
router.route("/add").post((req,res)=>{
    const orderItems = req.body.orderItems;
    const price = req.body.price;
    const date = req.body.date;
    const time = req.body.time;

    const newOrder = new Order({
        orderItems,
        price,
        date,
        time
    })

    newOrder.save().then(()=>{
        res.json("Order Added")
    }).catch((err)=>{
        console.log(err);
    })
})

//Get all orders
//Get Request
router.route("/").get((req,res)=>{
    Order.find().then((orders)=>{
        res.json(orders)
    }).catch((err)=>{
        console.log(err)
    })
})

//update a order by id
//Put Request
router.route("/update/:id").put(async (req,res)=>{
    let orderId = req.params.id;
    const {orderItems,price,date,time} = req.body;
    const updateOrder = {
        orderItems,
        price,
        date,
        time
    }

    const update = await Order.findByIdAndUpdate(orderId,updateOrder).then(()=>{
        res.status(200).send({status: "Order Updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data"});
    })
})

//delete order by id
//Delete Request
router.route("/delete/:id").delete(async (req, res)=>{
    let orderId = req.params.id;

    await Order.findByIdAndDelete(orderId).then(()=>{
        res.status(200).send({status: "Order deleted"});
    }).catch((err)=>{
        console.log(err);
    })
})

//find one of the orders by id
router.route("/get/:id").get((req,res)=>{
    let id = req.params.id;
    Order.findById(id).then((order)=>{
        res.json(order)
    }).catch((err)=>{
        console.log(err);
    })
})


module.exports = router;