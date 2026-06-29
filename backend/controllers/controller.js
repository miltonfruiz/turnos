Aquí te dejo un ejemplo de un controlador CRUD para un sistema de gestión de turnos médicos en JavaScript:
```javascript
class TurnoController {
  constructor(turnos = []) {
    this.turnos = turnos;
  }

  // Crear un nuevo turno
  createTurno(turno) {
    this.turnos.push(turno);
    return turno;
  }

  // Leer todos los turnos
  readTurnos() {
    return this.turnos;
  }

  // Leer un turno por ID
  readTurnoById(id) {
    return this.turnos.find((turno) => turno.id === id);
  }

  // Actualizar un turno
  updateTurno(id, datos) {
    const turno = this.readTurnoById(id);
    if (turno) {
      Object.assign(turno, datos);
      return turno;
    } else {
      return null;
    }
  }

  // Eliminar un turno
  deleteTurno(id) {
    const indice = this.turnos.findIndex((turno) => turno.id === id);
    if (indice !== -1) {
      this.turnos.splice(indice, 1);
      return true;
    } else {
      return false;
    }
  }
}

// Ejemplo de uso:
const turnos = [
  { id: 1, paciente: "Juan", medico: "Dr. Pérez", fecha: "2024-03-01" },
  { id: 2, paciente: "María", medico: "Dr. García", fecha: "2024-03-05" },
];

const controlador = new TurnoController(turnos);

// Crear un nuevo turno
const nuevoTurno = { id: 3, paciente: "Carlos", medico: "Dr. Rodríguez", fecha: "2024-03-10" };
controlador.createTurno(nuevoTurno);
console.log(controlador.readTurnos());

// Leer un turno por ID
const turno = controlador.readTurnoById(2);
console.log(turno);

// Actualizar un turno
const datos = { paciente: "María Luisa" };
controlador.updateTurno(2, datos);
console.log(controlador.readTurnoById(2));

// Eliminar un turno
controlador.deleteTurno(1);
console.log(controlador.readTurnos());
```
Este controlador tiene los siguientes métodos:

* `createTurno(turno)`: Crea un nuevo turno y lo agrega a la lista de turnos.
* `readTurnos()`: Lee todos los turnos y los devuelve en un arreglo.
* `readTurnoById(id)`: Lee un turno por su ID y lo devuelve.
* `updateTurno(id, datos)`: Actualiza un turno con el ID especificado y los datos proporcionados.
* `deleteTurno(id)`: Elimina un turno con el ID especificado.

Espero que esto te sea útil. ¡Si tienes alguna pregunta o necesitas más ayuda, no dudes en preguntar!