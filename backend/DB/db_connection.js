const mysql = require('mysql2');

const pool = mysql.createPool({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
})

const call_db = async (query, arg) => {

    console.log(query);
    
  
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject(err);
            } // not connected!
            
            // Use the connection
            connection.query(query, arg, function (error, results, fields) {
                // When done with the connection, release it.
                connection.release();
                // Handle error after the release.
                if (error) {
                    reject(error);
                }
                resolve(results) ;
                // Don't use the connection here, it has been returned to the pool.
            });
        });
    })
  
  }

  module.exports = {
    pool,
    call_db
};