const { User } = require('../database');

exports.insertUser = async (req, res) => {
    const { name, des, price, quan } = req.body;
    try {
        const user = await User.create({ name, des, price, quan });
        res.status(201).json(user); // 201 ->'Created' and send json data as res body to client
    } catch (err) {
        console.error(err);
        res.status(500).send('Inernal server error');
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).send('Error fetching users.');
    }
};

exports.deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findByPk(userId);
        if (user) {
            await user.destroy();
            res.status(200).send('User deleted successfully.');
        } else {
            res.status(404).send('User not found.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting user.');
    }
};

exports.editUser = async (req, res) => {
    const userId = req.params.id;
    const { name, des, price, quan } = req.body;
    try {
        const user = await User.findByPk(userId);
        if (user) {
            await user.update({ name, des, price, quan });
            res.status(200).json(user);
        } else {
            res.status(404).send('User not found.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error editing user.');
    }
};

exports.buy1User = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            res.status(404).send('User not found.');
        } else {
            if(user.quan > 0) {
                user.quan -= 1;
                await user.save();

                res.status(200).send('Quantity updated successfully.');
            }
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating quantity of user.');
    }
};
