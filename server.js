const express = require('express');
const routes = require('./routes');
const { Sequelize } = require('sequelize'); 

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// Create a Sequelize instance
const sequelize = new Sequelize({
  dialect: 'mysql', // database language
  host: 'localhost', // database host
  username: 'root', // database username
  password: 'atkababy', // database password
  database: 'ecommerce_db', //  database name
});

// Define your models and associations here

// Sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }) 
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    });
  })
  .catch((err) => {
    console.error('Error syncing sequelize models:', err);
  });
