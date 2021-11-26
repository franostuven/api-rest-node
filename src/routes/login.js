const express = require('express');
const router = express.Router();
let app = express()

// constraseña
const bcrypt = require('bcrypt');

// Token
const jwt = require('jsonwebtoken');

//conexion a base de datos
const mysqlConnection = require('../database');
//-----------------------------------------------------

// RUTA LOGIN CON BODY (POST)  Registro
router.post('/login', async (req, res) => 
{
    let { mail, password } = req.body;       // datos que recibo del usuario
    
    if(mail.trim() === '')  return res.status(400).json({ error: 'El Email no puede estar vacio' });
    if(password.trim() === '' || req.body.password.length < 6 )  return res.status(400).json({ error: 'contraseña debe ser mayor a 5 caracteres' });

    // hash contraseña
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(req.body.password, salt);

    const query = `CALL userAdd(?, ?, ?);`;     // llamado al proc. almacenado en la base c/par

    mysqlConnection.query(query,[0, mail, password], (err, rows, fields) => {
        if(!err){
            console.log(res.data)
            res.json({Status: 'Usuario Registrado'});
            res.json(daata);
        }else {
            console.log(err);
        }

    });

    // create token
   /*  const token = jwt.sign({
        mail: user.mail,
        id: user._id
    }, process.env.TOKEN_SECRET)

    res.header('auth-token', token).json({
        error: null,
        data: {token}
    }) */

});


module.exports = router; 