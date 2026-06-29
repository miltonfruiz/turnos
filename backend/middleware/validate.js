```javascript
const { check, body, param } = require('express-validator');

const validate = {
  register: [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio y debe ser válido').not().isEmpty().isEmail(),
    check('password', 'La contraseña es obligatoria y debe tener al menos 8 caracteres').not().isEmpty().isLength({ min: 8 }),
  ],

  login: [
    check('email', 'El email es obligatorio y debe ser válido').not().isEmpty().isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
  ],

  producto: [
    check('nombre', 'El nombre del producto es obligatorio').not().isEmpty(),
    check('precio', 'El precio es obligatorio y debe ser un número').not().isEmpty().isNumeric(),
    check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
  ],

  categoria: [
    check('nombre', 'El nombre de la categoría es obligatorio').not().isEmpty(),
  ],

  id: [
    param('id', 'El id es obligatorio y debe ser un número').not().isEmpty().isNumeric(),
  ],
};

module.exports = validate;
```