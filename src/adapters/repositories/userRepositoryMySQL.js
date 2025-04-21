const db = require('../../infra/db/connection');
const User = require('../../domain/User');

class UserRepositoryMySQL {
  async findByUsername(username) {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM usuarios WHERE username = ?`, [username], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  }

  async create(user) {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO usuarios (username, password) VALUES (?, ?)`,
        [user.username, user.password],
        (err, result) => {
          if (err) return reject(err);
          resolve(result.insertId);
        }
      );
    });
  }
}
module.exports = UserRepositoryMySQL;
