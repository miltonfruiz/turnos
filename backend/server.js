```javascript
// server.js
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Crear aplicación Express
const app = express();

// Configuración de seguridad
app.use(helmet());
app.use(cors());

// Límite de solicitudes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // 100 solicitudes
});
app.use(limiter);

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/turnos', require('./routes/turnos'));
app.use('/pacientes', require('./routes/pacientes'));
app.use('/medicos', require('./routes/medicos'));

// Iniciar servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
```