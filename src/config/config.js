require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  SECRET: process.env.SECRET || '',
  db: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'challenge_db',
  }
}