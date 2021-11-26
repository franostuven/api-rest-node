const express = require('express');
const app = express();

//-----------------------------------------
const jwt = require('jsonwebtoken');             // Libreria del Token
// constraseña
const bcrypt = require('bcrypt');               // Libreria de Encriptacion

// import routes
const authRoutes = require('./routes/auth');

// route middlewares
app.use('/api/user', authRoutes);
// ----------------------------------------

// Settings servidor
//app.set('port', porcess.env.PORTT || 3000);  //process..... es para que tome el pueteo del servidor, sino toma 3000
app.set('port',  process.env.PORT ||  3000);  //process..... es para que tome el pueteo del servidor, sino toma 3000

// Middlewares (prog. antes de que se ejecuten las rutas )
app.use(express.json());   //convierte los modulo de json cuando los reciba

// Routes (rutas para que se lleguen desde la web) al hacer el require y no usar rutas, toma la raiz /
app.use(require('./routes/employees'));

// Routes (ruta de Loguin y Registro)
app.use(require('./routes/login'));

// Starting the server
app.listen(app.get('port'), ()=> {
    console.log('Serven on port', app.get('port'))
}) ;

const adminRoutes = require('./routes/admin');
const verifyToken = require('./routes/validate-token');

// route middlewares
app.use('/api/admin', verifyToken, adminRoutes);