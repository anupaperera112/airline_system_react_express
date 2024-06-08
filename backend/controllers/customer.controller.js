const {call_db} = require('../DB/db_connection');
const helperFunction = require('../helpers/helperFunction');

async function get_flight_details(req, res){
    try{
        const {departureLocation, departureDate, arrivalLocation} = req.body;
        const [results] = await call_db('call RequestFlights(?,?,?)', [departureLocation, arrivalLocation, departureDate]);
        if (results.length > 0){
            res.status(200).json({
                message : "success",
                data : results
            })
        }else{
            res.status(404).json({
                message : "no data found"
             })
        } 
    }catch(e){
        res.status(400).json({
            message : "error",
            error : e
        })
    }
}

async function check_booking(req, res){
    try{
        const {flight_schedule_id, passenger_id, seat_no} = req.body;
        const [availability] = await call_db('select availability from seat where seat_no = ? and flight_schedule_id = ?;', [seat_no, flight_schedule_id ]);
        if (availability.availability == 0){
            const current_date = new Date().toISOString().slice(0, 10);
            await call_db('insert into booking (flight_schedule_id, passenger_id, seat_no, payment_status, booking_date) value (?, ?, ?, true, ?);', [flight_schedule_id, passenger_id, seat_no,current_date]);
            return  res.status(200).json({
                        message : "success"
                    })
        }else{
            res.status(404).json({
                message : "booked seat"
             })
        } 
    }catch(e){
        res.status(400).json({
            message : "error",
            error : e
        })
    }

}

async function viwe_ticket(req, res){
    try{
        const {passenger_id} = req.body;
        let results = await call_db('select * from flightticketbookingview where passenger_id = ?;', [passenger_id]);
        for (let i = 0; i < results.length; i++) {
            let cflight_date = results[i].flight_date;
            let carrival_time = results[i].arrival_time;

            results[i].flight_date = helperFunction.dateConvert(cflight_date);
            results[i].arrival_time = helperFunction.dateConvert(carrival_time);
        }
        if (results.length > 0){
            res.status(200).json({
                message : "success",
                data : results
            })
        }else{
            res.status(404).json({
                message : "no data found"
             })
        } 
    }catch(e){
        res.status(400).json({
            message : "error",
            error : e
        })
    }
}

async function get_flight_schedule_details(req, res){
    try{
        const {get_date} = req.body;
        const [results] = await call_db('call flight_schedule(?)', [get_date]);
        console.log(results);
        if (results.length > 0){
            for (let i = 0; i < results.length; i++) {
                let cdeparture_time = results[i].departure_time;
                let carival_time = results[i].arrival_time;
    
                results[i].departure_time = helperFunction.dateConvert(cdeparture_time);
                results[i].arrival_time = helperFunction.dateConvert(carival_time);
            }
            res.status(200).json({
                message : "success",
                data : results
            })
        }else{
            res.status(404).json({
                message : "no data found"
             })
        } 
    }catch(e){
        res.status(400).json({
            message : "error",
            error : e
        })
    }
}
async function getAircraft_db(req, res){
    try{
        const {flight_schedule_id} = req.body;
        const [results] = await call_db('call get_aircraft_model(?)', [flight_schedule_id]);
        console.log(results);
        if (results.length > 0){
            res.status(200).json({
                message : "success",
                data : results
            })
        }else{
            res.status(404).json({
                message : "no data found"
             })
        } 
    }catch(e){
        res.status(400).json({
            message : "error",
            error : e
        })
    }
}
 
module.exports = {get_flight_details,check_booking, viwe_ticket, get_flight_schedule_details, getAircraft_db}