# Sistema de Gestión de Turnos Médicos
=====================================

## Descripción
---------------

El Sistema de Gestión de Turnos Médicos es una aplicación diseñada para facilitar la administración de turnos médicos en centros de salud. Permite a los pacientes solicitar turnos en línea, a los médicos gestionar sus agendas y a los administradores supervisar y gestionar los turnos.

## Stack Tecnológico
---------------------

* **Backend:** Node.js con Express.js
* **Base de Datos:** MongoDB
* **Autenticación:** JSON Web Tokens (JWT)
* **Frontend:** React.js (no incluido en este repositorio)

## Instalación
---------------

1. Clonar el repositorio: `git clone https://github.com/usuario/repo.git`
2. Instalar dependencias: `npm install`
3. Configurar variables de entorno: `cp .env.example .env` y editar según sea necesario
4. Iniciar servidor: `npm start`

## Docker
---------

1. Construir imagen: `docker build -t sistema-turnos-medicos .`
2. Iniciar contenedor: `docker run -p 3000:3000 sistema-turnos-medicos`

## Endpoints
------------

### Autenticación

* **POST /login**: Iniciar sesión
	+ Parámetros: `email`, `password`
	+ Respuesta: `token` de autenticación
* **POST /register**: Registrar nuevo usuario
	+ Parámetros: `email`, `password`, `nombre`, `apellido`
	+ Respuesta: `token` de autenticación

### Turnos

* **GET /turnos**: Obtener lista de turnos
	+ Parámetros: `fecha` (opcional)
	+ Respuesta: lista de turnos
* **POST /turnos**: Crear nuevo turno
	+ Parámetros: `pacienteId`, `medicoId`, `fecha`, `hora`
	+ Respuesta: turno creado
* **GET /turnos/:id**: Obtener turno por ID
	+ Parámetros: `id`
	+ Respuesta: turno
* **PUT /turnos/:id**: Actualizar turno
	+ Parámetros: `id`, `pacienteId`, `medicoId`, `fecha`, `hora`
	+ Respuesta: turno actualizado
* **DELETE /turnos/:id**: Eliminar turno
	+ Parámetros: `id`
	+ Respuesta: mensaje de confirmación

### Médicos

* **GET /medicos**: Obtener lista de médicos
	+ Parámetros: `especialidad` (opcional)
	+ Respuesta: lista de médicos
* **GET /medicos/:id**: Obtener médico por ID
	+ Parámetros: `id`
	+ Respuesta: médico

### Pacientes

* **GET /pacientes**: Obtener lista de pacientes
	+ Parámetros: `nombre` (opcional)
	+ Respuesta: lista de pacientes
* **GET /pacientes/:id**: Obtener paciente por ID
	+ Parámetros: `id`
	+ Respuesta: paciente

## Seguridad
-------------

* **Autenticación**: se utiliza JSON Web Tokens (JWT) para autenticar a los usuarios
* **Autorización**: se utiliza un sistema de roles para autorizar a los usuarios a realizar acciones específicas
* **Cifrado**: se utiliza HTTPS para cifrar la comunicación entre el cliente y el servidor
* **Validación**: se utiliza validación de datos para garantizar la integridad de los datos ingresados por los usuarios