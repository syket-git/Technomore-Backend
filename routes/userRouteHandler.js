const express = require('express');

const { createUserController } = require('../controllers/userController');
const router = express.Router();

//** Get all users */
router.get('/all', async (req, res) => {});

//** crate user */
router.post('/', createUserController);

module.exports = router;
