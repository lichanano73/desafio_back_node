const User = require('../../domain/User');
const bcrypt = require('bcryptjs');

module.exports = async (repository, data) => {

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = new User({ username: data.username, password: hashedPassword });
  
  return await repository.create(user);
};