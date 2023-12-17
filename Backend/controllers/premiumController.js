const RazorPay = require("razorpay");
const Order = require("../models/Orders");
const User = require("../models/Users");
const Expense = require("../models/Expenses");
const sequelize = require("../util/dbConnect");
const Sequelize = require("sequelize");
const { Op } = Sequelize;

const purchasePremium = async (req, res) => {
	//Creating new razorpay instance
	const rzpInstance = new RazorPay({
		key_id: process.env.RAZORPAY_KEY_ID,
		key_secret: process.env.RAZORPAY_KEY_SECRET,
	});

	const options = {
		amount: 100,
		currency: "INR",
	};

	try {
		//creating new order using razorpay instance
		const order = await rzpInstance.orders.create(options);
		const newOrder = await Order.create({
			orderId: order.id,
			status: "PENDING",
			userId: req.id,
		});

		res.status(201).json({ order, key_id: rzpInstance.key_id });
	} catch (error) {
		console.log(error);
		res
			.status(403)
			.json({ message: `Something went wrong, can't generate order` });
	}
};

const updateTxnStatus = async (req, res) => {
	const { orderId, paymentId } = req.body;
	const userId = req.id;

	try {
		const order = await Order.findAll({ where: { orderId: orderId } });
		const updatedOrder = await Order.update(
			{ paymentId: paymentId, status: "SUCCESSUL" },
			{ where: { orderId: orderId } }
		);
		const updatedUser = await User.update(
			{ isPremium: true },
			{ where: { id: userId } }
		);

		res.status(200).json({ successful: true });
	} catch (error) {
		console.log(error);
	}
};

const showLeaderboard = async (req, res) => {
	try {
		// Group by both userId and user.id to avoid ambiguity
		const users = await User.findAll({
			attributes: ["name", "totalExpense"],
			order: [["totalExpense", "DESC"]],
		});

		res.status(200).send(users);
	} catch (error) {
		console.log(error);
	}
};

const dailyExpenseReport = async (req, res) => {
	const today = new Date();
	const todayDate = today.toISOString().split("T")[0]; // Get the current date in 'YYYY-MM-DD' format

	try {
		const dailyReport = await Expense.findAll({
			where: {
				createdAt: {
					[Op.between]: [
						todayDate + "T00:00:00.000Z",
						todayDate + "T23:59:59.999Z",
					],
				},
				userId: req.id,
			},
		});

		res.status(200).json({ dailyReport: dailyReport });
	} catch (error) {
		console.log(error);
	}
};

const monthlyExpenseReport = async (req, res) => {
	try {
		const monthlyReport = await Expense.findAll({
			where: {
				userId: req.id,
				createdAt: {
					[Op.and]: [
						Sequelize.where(
							Sequelize.fn("YEAR", Sequelize.col("createdAt")),
							"=",
							Sequelize.fn("YEAR", Sequelize.fn("CURDATE"))
						),
						Sequelize.where(
							Sequelize.fn("MONTH", Sequelize.col("createdAt")),
							"=",
							Sequelize.fn("MONTH", Sequelize.fn("CURDATE"))
						),
					],
				},
			},
		});

		res.status(200).json({ monthlyReport: monthlyReport });
	} catch (error) {
		console.log(error);
	}
};

const yearlyExpenseReport = async (req, res) => {
	try {
		const yearlyReport = await Expense.findAll({
			where: {
				userId: req.id,
				createdAt: {
					[Op.and]: [
						Sequelize.where(
							Sequelize.fn("YEAR", Sequelize.col("createdAt")),
							"=",
							Sequelize.fn("YEAR", Sequelize.fn("CURDATE"))
						),
					],
				},
			},
		});

        res.status(200).json({ yearlyReport: yearlyReport });
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	purchasePremium,
	updateTxnStatus,
	showLeaderboard,
	dailyExpenseReport,
	monthlyExpenseReport,
	yearlyExpenseReport,
};
