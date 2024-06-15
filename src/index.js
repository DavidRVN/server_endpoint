const express = require('express');
const mongoose = require('mongoose');
const empleadoRoutes = require('./routes/empleado');
const solicitudRoutes = require('./routes/solicitud');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 9000;

// Middleware
app.use(express.json());

// Rutas
app.use('/api', empleadoRoutes);
app.use('/api', solicitudRoutes);
app.use(cors());

// Middlewares
app.use(bodyParser.json());


// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/dbprueba', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.error('Error al conectar a MongoDB', err));

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
