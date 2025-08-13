import express from 'express';
import { employeesController } from '../controllers/employeesController.js';

const router = express.Router();

router.get('/', employeesController.fetchAllEmployees);
router.get('/:id', employeesController.fetchEmployee);
router.post('/', employeesController.addEmployee);
router.put('/:id', employeesController.updateEmployee);
router.delete('/:id', employeesController.removeEmployee);

export default router;
