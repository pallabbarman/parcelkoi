const { saveUser, getAllUsers, userUpdate, deleteUserById } = require('../services');

const addUser = async (req, res) => {
    const { body } = req;
    await saveUser(body);
    res.status(201).send('User added successfully!');
};

const getUsers = async (req, res) => {
    const users = await getAllUsers();
    res.status(200).send(users);
};

const updateUser = async (req, res) => {
    const { body } = req;
    await userUpdate(body);
    res.status(200).send("User information's are updated.");
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    const result = await deleteUserById(id);
    if (result instanceof Error) {
        res.status(404).send(result.message);
    } else {
        res.status(200).send('User has been deleted');
    }
};

module.exports = {
    addUser,
    getUsers,
    updateUser,
    deleteUser,
};
