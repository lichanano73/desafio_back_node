const bcrypt = require('bcryptjs');

module.exports = async (repository, { username, password }) => {
  const user = await repository.findByUsername(username);
  if (!user) throw new Error('Usuario no encontrado');

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Credenciales inválidas');

  // Podés simular token si no usás JWT
  return { token: 'token-simulado', userId: user.id };
};