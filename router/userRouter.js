// external imports
const router = require('express').Router();

// internal imports
const { getUsers, addUser, updateUser, deleteUser } = require('../controllers');
const handleValidation = require('../middlewares/handleValidations');
const { validators } = require('../models/viewModels');

// destructuring
const { userSchemaValidate } = validators;

// add users
router.get('/', getUsers);
router.post('/add', handleValidation(userSchemaValidate), addUser);
router.put('/edit', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
