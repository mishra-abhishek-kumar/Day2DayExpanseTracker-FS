const router = require('express').Router();
const expenseControllet = require('../controllers/expenseController');

router.post('/add-expense/:userId', expenseControllet.addExpense);
router.get('/get-expense/:userId', expenseControllet.getExpense); 
router.put('/edit-expense/:expenseId', expenseControllet.updateExpense);
router.delete('/delete-expense/:expenseId', expenseControllet.deleteExpense);

module.exports = router;