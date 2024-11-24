const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de la base de datos MySQL
const db = mysql.createConnection({
  host: 'TU_HOST_DE_MYSQL',  // Ejemplo: 'localhost', o el host de tu servicio de base de datos
  user: 'TU_USUARIO',
  password: 'TU_CONTRASEÑA',
  database: 'TU_BASE_DE_DATOS'
});

db.connect(err => {
  if (err) throw err;
  console.log('Conectado a MySQL');
});

// Ruta para guardar una imagen vista por un usuario
app.post('/guardar-imagen', (req, res) => {
  const { url_imagen, usuario_id } = req.body;  // La URL de la imagen y el id del usuario

  const query = 'INSERT INTO imagenes_vistas (url_imagen, usuario_id) VALUES (?, ?)';
  db.query(query, [url_imagen, usuario_id], (err, result) => {
    if (err) throw err;
    res.send('Imagen guardada correctamente');
  });
});

// Ruta para obtener las imágenes vistas por un usuario
app.get('/imagenes-vistas/:usuario_id', (req, res) => {
  const usuario_id = req.params.usuario_id;

  const query = 'SELECT * FROM imagenes_vistas WHERE usuario_id = ? ORDER BY fecha DESC';
  db.query(query, [usuario_id], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

