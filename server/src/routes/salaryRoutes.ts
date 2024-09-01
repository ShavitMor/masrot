import { Router } from 'express';
import { createSalary, getSalaries, getSalariesInRange,removeSalary } from '../controllers/salaryController';

const router = Router();

router.post('/', createSalary);
router.get('/', getSalaries);
router.get('/range', getSalariesInRange); // Range date filter
router.delete('/:id', removeSalary);

export default router;
