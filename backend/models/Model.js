```javascript
// Importación de Mongoose
const mongoose = require('mongoose');

// Creación del modelo de Paciente
const pacienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  dni: { type: String, required: true, unique: true },
  telefono: { type: String },
  email: { type: String }
});

// Creación del modelo de Médico
const medicoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  especialidad: { type: String, required: true },
  telefono: { type: String },
  email: { type: String }
});

// Creación del modelo de Turno
const turnoSchema = new mongoose.Schema({
  paciente: { type: mongoose.Schema.Types.ObjectId, ref: 'Paciente' },
  medico: { type: mongoose.Schema.Types.ObjectId, ref: 'Medico' },
  fecha: { type: Date, required: true },
  hora: { type: String, required: true },
  estado: { type: String, enum: ['pendiente', 'atendido', 'cancelado'] }
});

// Compilación de los modelos
const Paciente = mongoose.model('Paciente', pacienteSchema);
const Medico = mongoose.model('Medico', medicoSchema);
const Turno = mongoose.model('Turno', turnoSchema);

// Exportación de los modelos
module.exports = { Paciente, Medico, Turno };
```