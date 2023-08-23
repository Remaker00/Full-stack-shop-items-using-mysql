const { Sequelize } = require('sequelize'); //{..}-> object destructuring syntax.

// Create a new Sequelize instance
const sequelize = new Sequelize('node-complete', 'root', 'Nish@nt9' ,{
    dialect: 'mysql',
    storage: 'localhost'
});

// Define the User model
const User = sequelize.define('User', {
    name: Sequelize.STRING,
    des: Sequelize.STRING,
    price: Sequelize.FLOAT,
    quan: Sequelize.INTEGER
});



module.exports = {
    sequelize,
    User
};
