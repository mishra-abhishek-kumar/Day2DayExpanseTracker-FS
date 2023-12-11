const Expense = require('../models/Expense');

const addExpense = async (req, res) => {
    try {
        const expense = await Expense.create({
            amt: req.body.amt,
            description: req.body.description,
            category: req.body.category,
            userId: req.params.userId
        });
        res.send(expense);
    } catch (error) {
        console.log(error);
    }
};

const getExpense = async (req, res) => {
    try {
        console.log(req.params.userId);
        const expenses = await Expense.findAll({ where: { userId: req.params.userId }});
        res.send(expenses);
    } catch (error) {
        console.log(error);
    }
};

const updateExpense = (req, res) => {
    const expenseId = req.params.expenseId;
    const amt = req.body.amt;
    const description = req.body.description;
    const category = req.body.category;

    Expense.findByPk(expenseId)
        .then(expense => {
            expense.amt = amt;
            expense.description = description;
            expense.category = category
            return expense.save();
        })
        .then(result => {
            res.send(result);
        })
        .catch(err => console.log(err));
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
}

module.exports = {
    addExpense,
    getExpense,
    updateExpense,
    deleteExpense
}