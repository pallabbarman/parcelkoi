// external imports
const router = require('express').Router();

// internal imports
const { getUsers, addUser, updateUser, deleteUser } = require('../controllers');

// add users
router.get('/', getUsers);
router.post('/add', addUser);
router.put('/edit', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
