const { saveUser, getAllUsers, userUpdate, deleteUserById } = require('../services');

const addUser = async (req, res, next) => {
    try {
        const { body } = req;
        await saveUser(body);
        return res.status(201).send('User added successfully!');
    } catch (error) {
        return next(error, req, res);
    }
};

const getUsers = async (req, res, next) => {
    try {
        const users = await getAllUsers();
        return res.status(200).send(users);
    } catch (error) {
        return next(error, req, res);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const { body } = req;
        await userUpdate(body);
        return res.status(200).send("User information's are updated.");
    } catch (error) {
        return next(error, req, res);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        await deleteUserById(id);
        return res.status(200).send('User has been deleted');
    } catch (error) {
        return next(error, req, res);
    }
};

module.exports = {
    addUser,
    getUsers,
    updateUser,
    deleteUser,
};
