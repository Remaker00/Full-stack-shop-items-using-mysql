const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.insertUser);
router.get('/', userController.getAllUsers);
router.delete('/:id', userController.deleteUser);
router.patch('/:id', userController.editUser);
router.put('/:id', userController.buy1User);

module.exports = router;
