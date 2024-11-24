
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;


app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


let imageUrls = [];
app.post('/save-image', (req, res) => {
  const { imageUrl } = req.body;  
  if (imageUrl) {
    imageUrls.push(imageUrl);
    res.json({ message: 'Imagen guardada correctamente', imageUrl });
  } else {
    res.status(400).json({ message: 'URL de imagen no proporcionada' });
  }
});


app.get('/get-images', (req, res) => {
  res.json(imageUrls);
});


app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
