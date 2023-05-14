const catchAsync = require('../utils/catchAsync');
const sequelize = require('../server');
exports.getAllUsers = catchAsync(async (req, res, next) => {
  console.log(sequelize);
  // const users = await sequelize.query('SELECT * FROM users');
  sequelize.query('SELECT * FROM users').then((users) => {
    console.log(users);
  });
  res.status(200).json({
    status: 'success',
  });
});
