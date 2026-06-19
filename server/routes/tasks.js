import express from 'express';
import auth from '../middleware/auth.js';
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskCompletion
} from '../controllers/taskController.js';

const router = express.Router();

// All routes require authentication
router.use(auth);

router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.post('/', createTask);
router.patch('/:id', updateTask);
router.delete('/:id', deleteTask);
router.patch('/:id/toggle', toggleTaskCompletion);

export default router;
