
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


let dataStore = [];
app.post('/save-data', (req, res) => {
  const data = req.body;  
  dataStore.push(data);
  res.json({ message: 'Datos guardados correctamente', data });
});


app.get('/get-data', (req, res) => {
  res.json(dataStore);
});


app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

