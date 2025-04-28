// Set repo Company mysql
const companyController      = require('../adapters/controllers/companyController');
const CompanyRepositoryMySQL = require('../adapters/repositories/companyRepositoryMySQL');

const companyRepository = new CompanyRepositoryMySQL();
companyController.setRepository(companyRepository);


// Set repo User mysql
const userController  = require('../adapters/controllers/authController');
const authMiddlewares = require('../infra/middlewares/auth');
const UserRepositoryMySQL = require('../adapters/repositories/userRepositoryMySQL');

const userRepository = new UserRepositoryMySQL();
userController.setRepository(userRepository);
authMiddlewares.setRepository(userRepository);

module.exports = {
  companyRepository,
  userRepository
};
