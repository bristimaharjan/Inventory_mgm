import mysql from 'mysql2';

// Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Bri$ti1010', // Replace with your actual database password
  database: 'inventory_dbms', // Replace with your actual database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database');
});

export default db;
