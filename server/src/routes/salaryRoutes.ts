import { Router } from 'express';
import { createSalary, getSalaries, getSalariesInRange } from '../controllers/salaryController';

const router = Router();

router.post('/', createSalary);
router.get('/', getSalaries);
router.get('/range', getSalariesInRange); // Range date filter

export default router;
