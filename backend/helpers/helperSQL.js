const {call_db} = require('../DB/db_connection');

async function getID(email){
    let id;
    if (email == "new"){
        id = (await call_db('SELECT passenger_id FROM passenger ORDER BY passenger_id DESC LIMIT 1', null))[0].passenger_id;
    }else{
        id = (await call_db('SELECT passenger_id FROM registered_passenger where email = ?', [email]))[0].passenger_id;
    }
    return id;
}

module.exports= {
    getID
}