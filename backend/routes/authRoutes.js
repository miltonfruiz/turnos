```javascript
// authRoutes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Registro de usuario
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'Usuario creado con éxito' });
  } catch (error) {
    res.status(400).json({ message: 'Error al crear usuario' });
  }
});

// Inicio de sesión
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Correo electrónico o contraseña incorrectos' });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Correo electrónico o contraseña incorrectos' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: 'Error al iniciar sesión' });
  }
});

// Cierre de sesión
router.post('/logout', (req, res) => {
  try {
    req.session.destroy();
    res.clearCookie('authToken');
    res.status(200).json({ message: 'Sesión cerrada con éxito' });
  } catch (error) {
    res.status(400).json({ message: 'Error al cerrar sesión' });
  }
});

module.exports = router;
```