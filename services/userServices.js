const models = require('../models');
const { NotFound } = require('../utils/errors');

const saveUser = async (user) => {
    const model = new models.User(user);
    const savedUser = await model.save();
    return savedUser;
};

const getAllUsers = async () => {
    const allUser = models.User;
    const users = await allUser.find();
    return users;
};

const userUpdate = async (user) => {
    const userId = user._id;
    const allUser = models.User;
    const model = await allUser.findById(userId);
    if (model) {
        model.username = user.username;
        model.save();
        return model;
    }

    throw new NotFound('User is not found!');
};

const deleteUserById = async (id) => {
    const allUser = models.User;
    const model = await allUser.findById(id);
    if (model) {
        const result = await allUser.deleteOne({ _id: id });
        return result;
    }

    throw new NotFound('User is not found!');
};

module.exports = {
    saveUser,
    getAllUsers,
    userUpdate,
    deleteUserById,
};
