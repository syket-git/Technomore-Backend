const express = require('express');

const {
  createUserController,
  loginController,
  getAllUsers,
  getUserById,
  updateUserData,
} = require('../controllers/userController');
const checkLogin = require('../middlewares/checkLogin');
const router = express.Router();

//** Get all users */
router.get('/all', checkLogin, getAllUsers);

//** Get Specific User */
router.get('/:id', getUserById);

//** Update user data */
router.put('/:id', checkLogin, updateUserData);

//** crate user */
router.post('/signup', createUserController);

//** Login user */
router.post('/login', loginController);

module.exports = router;
