const dotenv = require('dotenv');
const cors = require('cors');
const express = require('express');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;
const userRouter = require('./routers/userRouter');

dotenv.config({ path: './.env' });

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: 'localhost',
    dialect: 'mysql',
  }
);

const app = express();

app.use(cors());
app.use(express.json());

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    // sequelize.query('SELECT * FROM users').then((users) => {
    //   console.log(users);
    // });
  })
  .catch((error) => {
    console.error('Unable to connect to the database: ', error);
  });

app.use('/api/v1/', userRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

sequelize.query('SELECT * FROM users').then((users) => {
  console.log(users);
});

module.exports = sequelize;
