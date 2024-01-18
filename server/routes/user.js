const express = require('express');
const { createUserController, loginUserController, updateUserController, getUserDetailController } = require('../controller/UserController');
const router = express.Router();

router.post('/create', createUserController);
router.post('/login', loginUserController);
router.post('/update', updateUserController)
router.post('/detail', getUserDetailController);

module.exports = router