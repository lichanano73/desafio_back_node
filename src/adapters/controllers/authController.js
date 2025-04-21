const UserRepositoryMySQL = require('../repositories/userRepositoryMySQL');
const registerUser = require('../../app/usecases/addUser');
const loginUser = require('../../app/usecases/loginUser');

const User = require('../../domain/User');
const { userSchema } = require('../../ports/http/validators/userSchema');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');

const repository = new UserRepositoryMySQL();

exports.addUser = async (req, res) => {
  try {

    const parse = userSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ error: parse.error.format() });
    }    

    console.log(parse.data.password)

    const hash = bcryptjs.hashSync(parse.data.password, 10);

    const nw_user = new User({ 
      username: parse.data.username, 
      password: hash
    });

    const result_id = await registerUser(repository, nw_user);

    nw_user.id = result_id;
    const { password, ...nw_user_sinPass } = nw_user;

    return res.status(201).json(nw_user_sinPass);

  } catch (error) {

    const mensaje = error.sqlMessage ? error.sqlMessage : error.message;
    return res.status(500).json({ error: mensaje });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'El username y la contraseña son obligatorios'});
    }

    // Validación Zod
    const validator = userSchema.safeParse(req.body);
    if (!validator.success) {
      return res.status(400).json({
        error: 'Error al validar los datos',
        details: validator.error.errors,
      });
    }

    const myUser = await repository.findByUsername(username);
    if (!myUser) {
      return res.status(401).json({ error: 'Username no encontrado' });
    }

    // Comparar contraseñas
    const passValid = bcryptjs.compareSync(password, myUser.password);
    if (!passValid) return res.status(401).json({ error: 'Contraseña incorrecta' });

    // Generar token JWT
    const token = jwt.sign(
      { id: myUser.id, username: myUser.username },
      config.SECRET,
      { expiresIn: '6h' }
    );

    // Armar respuesta
    return res.status(200).json({
      mensaje: 'Login exitoso',
      token,
      data: myUser
    });

  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error en el servidor',
      error: error.message,
    });
  }
};
