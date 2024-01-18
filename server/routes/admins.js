const express = require('express');
const { creatAdminController, loginAdminController, updataUserByAdminController, deletUserByAdminController } = require('../controller/AdminController');
const router = express.Router();

router.post('/create', creatAdminController);
router.post('/login', loginAdminController);
router.post('/updateuser', updataUserByAdminController);
router.post('/deletuser', deletUserByAdminController);

module.exports = router;