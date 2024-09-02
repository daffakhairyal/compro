import mysql from 'mysql2';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'compro',
});

db.connect((err) => {
  if (err) {
    console.log('Database connection failed: ', err);
  } else {
    console.log('Database connected.');
  }
});

export default db;
