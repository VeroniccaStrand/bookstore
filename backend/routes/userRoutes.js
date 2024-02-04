import express from 'express';
const router = express.Router();

import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  loginUser,
  updateUser,
} from '../controllers/userController.js';

router.route('/').post(createUser).get(getAllUsers);
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);
router.route('/login').post(loginUser);
export default router;
