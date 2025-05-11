const mysql = require('mysql2/promise');

let db; 
const connectDB = async () => {
    try {
        db = await mysql.createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
        });
        console.log('Database is connected');
        await db.execute('CREATE TABLE IF NOT EXISTS schools (id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255), address VARCHAR(255), latitude FLOAT, longitude FLOAT)');
    } catch (err) {
        console.error('Error while connecting to the database:', err);
        throw err; 
    }
    return db;
};

module.exports = connectDB;
