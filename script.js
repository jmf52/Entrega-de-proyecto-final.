const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const dotenv = require('dotenv');

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());  // Para poder leer datos en formato JSON

// Configuración de la base de datos MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,      // Usando las variables de entorno
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

// Conexión a la base de datos
db.connect(err => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err);
    process.exit(1);  // Detener el servidor si no se puede conectar a la base de datos
  }
  console.log('Conectado a MySQL');
});

// Ruta para agregar datos
app.post('/usuarios', (req, res) => {
  const { nombre, edad } = req.body;
  const query = 'INSERT INTO usuarios (nombre, edad) VALUES (?, ?)';
  db.query(query, [nombre, edad], (err, result) => {
    if (err) {
      console.error('Error al agregar el usuario:', err);
      return res.status(500).send('Hubo un error al agregar el usuario');
    }
    res.status(201).send('Usuario agregado');
  });
});

// Ruta para leer datos
app.get('/usuarios', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) {
      console.error('Error al obtener los usuarios:', err);
      return res.status(500).send('Hubo un error al obtener los usuarios');
    }
    res.status(200).json(results);
  });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

