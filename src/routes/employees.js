const express = require('express');
const router = express.Router();
var app = express()

const mysqlConnection = require('../database');

// RUTA DIRECTA SIN PARAMETROS  (GET)
router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM employees', (err, rows, fields) => {
        if(!err){
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

// RUTA DIRECTA CON PARAMETRO (GET)
router.get('/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('SELECT * FROM employees WHERE id = ?', [id], (err, rows, fields) => {
        if(!err){
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    });
});

// RUTA DIRECTA CON BODY (POST)
router.post('/', (req, res) => 
{
    const { id, name, salary } = req.body;                // datos que recibo del usuario
    const query = `CALL employeeAddOrEdit(?, ?, ?);`;     // llamado al proc. almacenado en la base c/par
    mysqlConnection.query(query,[id, name, salary], (err, rows, fields) => {
        if(!err){
            res.json({Status: 'Empleado Guardado'});
        } else {
            console.log(err);
        }

    });
});



//  Llamado al procedimiento almacenado. con el parametro ID del usuario
router.put('/:id', (req, res) => {
    const { name, salary } = req.body;  // datos recibidos del usuario
    const { id } = req.params;  // datos recibidos por la url

    const query =  `CALL employeeAddOrEdit( ?, ?, ?);`;   // var del proc. almacenado con parametros
    mysqlConnection.query(query, [id, name, salary], (err, rows, fields) => { // llamado al proc.almac.
        if(!err){
            res.json({Status: 'Empleado Actualizado'});
        } else {
            console.log(err);
        }
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM employees WHERE id = ?',  [id], (err, rows, fields) => {
        if(!err){
            res.json({Status: 'Empleado Eliminado'});
        } else {
            console.log(err);
        }
    });
});

/*               ejemplos   */


/*   router.get('/user/:id', function (req, res, next) {
    console.log('ID:', req.params.id);
    next();
  }, function (req, res, next) {
    res.send('User Info, ID enviado: ' +  req.params.id);

  }); */
  
  router.get('/user/:id', function (req, res, next) {
    // if the user ID is 0, skip to the next route
    if (req.params.id == 0) next('router');
    // otherwise pass the control to the next middleware function in this stack
    else next(); //
  }, function (req, res, next) {
    // render a regular page
    res.render('regular');
  });
  
  // handler for the /user/:id path, which renders a special page
  app.get('/user/:id', function (req, res, next) {
    res.render('special');
  });

module.exports = router; 