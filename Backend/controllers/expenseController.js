const Expense = require("../models/Expense");
const User = require("../models/User");
const sequelize = require("../util/dbConnect");

const addExpense = async (req, res) => {
    const txn = await sequelize.transaction();

    const { amt, description, category } = req.body;
	try {
		const user = await User.findByPk(req.id);

		const totalAmt = user.totalExpense + parseInt(req.body.amt);

		await User.update({ totalExpense: totalAmt }, { were: { id: req.id } }, { transaction: txn });

		const expense = await Expense.create({
			amt: amt,
			description: description,
			category: category,
			userId: req.id,
		}, { transaction: txn });

        await txn.commit();

		res.send(expense);

	} catch (error) {
        if(txn) {
            await txn.rollback();
        }
		console.log(error);
	}
};

const getExpense = async (req, res) => {
	try {
		const expenses = await Expense.findAll({ where: { userId: req.id } });
		res.send(expenses);
	} catch (error) {
		console.log(error);
	}
};

const deleteExpense = async (req, res) => {
	const expenseId = req.params.expenseId;

	try {
		const expense = await Expense.findByPk(expenseId);
		const result = await expense.destroy();
		res.send(result);
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	addExpense,
	getExpense,
	deleteExpense,
};
