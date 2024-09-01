import { Router } from 'express';
import { createExpense, getExpenses,getExpensesInRange,removeExpense } from '../controllers/expenseController';

const router = Router();

router.post('/', createExpense);
router.get('/', getExpenses); // Single date filter
router.get('/range', getExpensesInRange); // Range date filter
router.delete('/:id', removeExpense);

export default router;
