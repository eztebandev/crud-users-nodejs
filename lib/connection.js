const mysql = require('mysql2/promise');

const connectDB = async () => {
    try {
        const connection = await mysql.createConnection({
            host: '127.0.0.1',
            port: 3306,
            user: 'root',
            password: '',
            database: 'node_db'
        })
        console.log('Conexión a la base de datos exitosa');
        return connection;
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        process.exit(1);
    }
};

module.exports = connectDB;