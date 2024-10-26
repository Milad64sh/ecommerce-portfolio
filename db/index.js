const { Pool } = require('pg');

const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'ecommerce_db',
  password: 'password',
  port: 5433,
});

module.exports = pool;
