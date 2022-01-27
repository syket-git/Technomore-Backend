const express = require('express');

const {
  createUserController,
  loginController,
  getAllUsers,
} = require('../controllers/userController');
const router = express.Router();

//** Get all users */
router.get('/all', getAllUsers);

//** crate user */
router.post('/signup', createUserController);

//** Login user */
router.post('/login', loginController);

module.exports = router;
