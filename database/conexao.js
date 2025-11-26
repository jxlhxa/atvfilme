import mysql from 'mysql2/promise';
import dotenv from 'dotenv'; 

dotenv.config();

const configs = {
    host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_NAME, 
    port: process.env.DB_PORT 
}

const db = await mysql.createConnection(configs);

if (db) console.log('MySQL conectado!');

export default db;