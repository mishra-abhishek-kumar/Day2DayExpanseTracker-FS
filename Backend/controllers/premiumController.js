const RazorPay = require('razorpay');
const Order = require('../models/Orders');
const User = require('../models/User');
const Expense = require('../models/Expense');
const sequelize = require('../util/dbConnect');

const purchasePremium = async (req, res) => {

    //Creating new razorpay instance
    const rzpInstance = new RazorPay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    });

    const options = {
        amount: 100,
        currency: "INR"
    };

    try {
        //creating new order using razorpay instance
        const order = await rzpInstance.orders.create(options);
        const newOrder = await Order.create({ orderId: order.id, status: 'PENDING' });

        res.status(201).json({ order, key_id: rzpInstance.key_id });
    } catch (error) {
        console.log(error);
        res.status(403).json({ message: `Something went wrong, can't generate order` })
    }
}

const updateTxnStatus = async (req, res) => {
    const { orderId, paymentId } = req.body;
    const userId = req.id;

    try {
        const order = await Order.findAll({ where: { orderId: orderId } });
        const updatedOrder = await Order.update({ paymentId: paymentId, status: 'SUCCESSUL' }, { where: { orderId: orderId }});
        const updatedUser = await User.update({ isPremium: true }, { where: { id: userId }});

        res.status(200).json({successful: true});
    } catch (error) {
        console.log(error);
    }
}

const showLeaderboard = async (req, res) => {
    try {
        // Group by both userId and user.id to avoid ambiguity
        const expenses = await Expense.findAll({ attributes: [ [sequelize.fn('SUM', sequelize.col('amt')), 'totalAmount'] ], include: [ { model: User, attributes: ['name'] } ], group: ['userId', 'user.id', 'user.name'] })
        res.status(200).send(expenses);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    purchasePremium,
    updateTxnStatus,
    showLeaderboard
}