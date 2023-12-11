const router = require('express').Router();
const expenseControllet = require('../controllers/expenseController');
const requiredUser = require("../middlewares/requiredUser");

router.post('/add-expense', requiredUser, expenseControllet.addExpense);
router.get('/get-expense', requiredUser, expenseControllet.getExpense); 
router.put('/edit-expense/:expenseId', expenseControllet.updateExpense);
router.delete('/delete-expense/:expenseId', expenseControllet.deleteExpense);

module.exports = router;