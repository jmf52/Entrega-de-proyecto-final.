const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de la base de datos MySQL
const db = mysql.createConnection({
  host: 'TU_HOST_DE_MYSQL', // PlanetScale u otro servicio
  user: 'TU_USUARIO',
  password: 'TU_CONTRASEÑA',
  database: 'TU_BASE_DE_DATOS'
});

db.connect(err => {
  if (err) throw err;
  console.log('Conectado a MySQL');
});

// Ruta para agregar datos
app.post('/usuarios', (req, res) => {
  const { nombre, edad } = req.body;
  const query = 'INSERT INTO usuarios (nombre, edad) VALUES (?, ?)';
  db.query(query, [nombre, edad], (err, result) => {
    if (err) throw err;
    res.send('Usuario agregado');
  });
});

// Ruta para leer datos
app.get('/usuarios', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
