const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'mysql.railway.internal',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.message);
    return;
  }
  console.log('Conexión a MySQL exitosa ✅');
});

module.exports = connection;