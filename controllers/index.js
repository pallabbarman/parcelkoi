const { addUser, getUsers, updateUser, deleteUser } = require('./userController');

const controllers = {
    addUser,
    getUsers,
    updateUser,
    deleteUser,
};

module.exports = controllers;
