const { saveUser, getAllUsers, userUpdate, deleteUserById } = require('./userServices');

const services = {
    saveUser,
    getAllUsers,
    userUpdate,
    deleteUserById,
};

module.exports = services;
