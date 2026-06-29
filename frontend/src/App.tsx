```tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Turno {
  id: number;
  paciente: string;
  medico: string;
  fecha: string;
  hora: string;
}

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  password: string;
}

interface Login {
  email: string;
  password: string;
}

const App: React.FC = () => {
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [login, setLogin] = useState<Login>({ email: '', password: '' });
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      axios.get('http://localhost:5000/turnos', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          setTurnos(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [token]);

  const handleLogin = () => {
    axios.post('http://localhost:5000/login', login)
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem('token', token);
        setToken(token);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const handleCrearTurno = (turno: Turno) => {
    axios.post('http://localhost:5000/turnos', turno, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setTurnos([...turnos, response.data]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEliminarTurno = (id: number) => {
    axios.delete(`http://localhost:5000/turnos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        setTurnos(turnos.filter((turno) => turno.id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      {token ? (
        <div>
          <h1>Turnos Médicos</h1>
          <ul>
            {turnos.map((turno) => (
              <li key={turno.id}>
                <p>Paciente: {turno.paciente}</p>
                <p>Médico: {turno.medico}</p>
                <p>Fecha: {turno.fecha}</p>
                <p>Hora: {turno.hora}</p>
                <button onClick={() => handleEliminarTurno(turno.id)}>Eliminar</button>
              </li>
            ))}
          </ul>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h1>Login</h1>
          <input
            type="email"
            value={login.email}
            onChange={(e) => setLogin({ ...login, email: e.target.value })}
            placeholder="Email"
          />
          <input
            type="password"
            value={login.password}
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
            placeholder="Contraseña"
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

export default App;
```