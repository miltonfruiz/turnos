```javascript
// Importaciones necesarias
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

// Configuración del servidor Express
const app = express();
app.use(express.json());

// Configuración del secreto para JWT
const secretKey = 'mi-llave-secreta';

// Base de datos de ejemplo (reemplazar con una base de datos real)
let usuarios = [
  { id: '1', nombre: 'Administrador', email: 'admin@example.com', password: bcrypt.hashSync('admin123', 10) },
];

let turnos = [
  { id: '1', fecha: '2024-09-16', hora: '10:00', paciente: 'Juan Pérez', medico: 'Dr. Smith' },
];

// Función para verificar el token JWT
function verificarToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Acceso denegado. No se proporcionó un token.');

  try {
    const decoded = jwt.verify(token, secretKey);
    req.usuario = decoded;
    next();
  } catch (ex) {
    return res.status(400).send('Token inválido.');
  }
}

// Ruta para login y obtener token JWT
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const usuario = usuarios.find((u) => u.email === email);
  if (!usuario) return res.status(400).send('Usuario o contraseña incorrectos.');

  const isValidPassword = bcrypt.compareSync(password, usuario.password);
  if (!isValidPassword) return res.status(400).send('Usuario o contraseña incorrectos.');

  const token = jwt.sign({ id: usuario.id, nombre: usuario.nombre, email: usuario.email }, secretKey);
  res.send(token);
});

// Ruta protegida para obtener todos los turnos
app.get('/turnos', verificarToken, (req, res) => {
  res.send(turnos);
});

// Ruta protegida para obtener un turno por ID
app.get('/turnos/:id', verificarToken, (req, res) => {
  const id = req.params.id;
  const turno = turnos.find((t) => t.id === id);
  if (!turno) return res.status(404).send('Turno no encontrado.');
  res.send(turno);
});

// Ruta protegida para crear un nuevo turno
app.post('/turnos', verificarToken, (req, res) => {
  const { fecha, hora, paciente, medico } = req.body;
  const nuevoTurno = {
    id: uuidv4(),
    fecha,
    hora,
    paciente,
    medico,
  };
  turnos.push(nuevoTurno);
  res.send(nuevoTurno);
});

// Ruta protegida para actualizar un turno existente
app.put('/turnos/:id', verificarToken, (req, res) => {
  const id = req.params.id;
  const turno = turnos.find((t) => t.id === id);
  if (!turno) return res.status(404).send('Turno no encontrado.');

  const { fecha, hora, paciente, medico } = req.body;
  turno.fecha = fecha;
  turno.hora = hora;
  turno.paciente = paciente;
  turno.medico = medico;
  res.send(turno);
});

// Ruta protegida para eliminar un turno
app.delete('/turnos/:id', verificarToken, (req, res) => {
  const id = req.params.id;
  const indice = turnos.findIndex((t) => t.id === id);
  if (indice === -1) return res.status(404).send('Turno no encontrado.');
  turnos.splice(indice, 1);
  res.send(`Turno ${id} eliminado.`);
});

// Iniciar servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
```