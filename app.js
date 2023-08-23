const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000 || 4000;

const userRoutes = require('./routes/userRoutse');
const { sequelize } = require('./database');

app.use(bodyParser.json());

app.use(express.static('fronted'));

// Use user routes
app.use(`/api/users`, userRoutes);

// Sync the Sequelize model with the database
sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`App listening at http://localhost:${port}`);
    });
}).catch(err => {
    console.error('Error syncing database:', err);
});
