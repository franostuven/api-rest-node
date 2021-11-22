const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'company'
});

mysqlConnection.connect( (err) => {
    if(err){
        console.log(err);
    }else{
        console.log('Db conectada');
    }
});

module.exports = mysqlConnection;