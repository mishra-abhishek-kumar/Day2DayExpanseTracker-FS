const RazorPay = require('razorpay');
const Order = require('../models/Orders');

const purchasePremium = async (req, res) => {
    try {
        const razorPay = new RazorPay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        })

        const purchaseAmt = 99;

        razorPay.orders.create({ amount, currency: "INR" }, (err, order) => {
            if(err) {
                throw new Error(JSON.stringify(err));
            }
            req.user.createOrder({ orderid: order.id, status: 'PENDING'})
                .then(() => {return res.status(201).json({ order, key_id: razorPay.key_id})})
                .catch(err => {
                    throw new Error(err);
                })
        })

    } catch (error) {
        console.log(error);
        res.status(403).json({ message: 'Something went wrong', error: err});
    }
};

const updateTransactionStatus = async (req, res) => {
    try {
        const { payment_id, order_id } = req.body;
        Order.findOne({ where: { orderId: order_id }}).then(order => {
            order.update({ paymentId: payment_id, status: 'SUCCESSUL'}).then(() => {
                req.user.update({ isPremium: true}).then(() => {
                    return res.status(202).json({success: true, message: "Transction Successful"});
                })
                .catch((err) => {
                    throw new Error(err);
                })
            }).catch(err => {
                throw new Error(err);
            })
        }).catch(err => {
            throw new Error(err);
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    purchasePremium,
    updateTransactionStatus
}