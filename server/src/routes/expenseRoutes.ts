import { Router } from 'express';
import { createExpense, getExpenses,getExpensesInRange } from '../controllers/expenseController';

const router = Router();

router.post('/', createExpense);
router.get('/', getExpenses); // Single date filter
router.get('/range', getExpensesInRange); // Range date filter

export default router;
