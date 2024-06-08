const {call_db}= require('../DB/db_connection');
const helperFunction = require('../helpers/helperFunction');

async function passengers_lst(req, res){
    try{
        const flight_no = req.body.flight_no;
        const type = req.params.type;

        const schema = {
            flight_no: {type: "number", optional: false}
        }

        const v = helperFunction.validate({flight_no},schema)
        if (v !== true){
            throw new Error(v);
        }

        if (type == "1"){
            const [results] = await call_db('call get_all_passengers_above_18(?)', [flight_no]);
            res.status(200).json({
                message : "success",
                data : results
            })
        }else if (type == "2"){
            const [results] = await call_db('call get_all_passengers_below_18(?)', [flight_no]);
            res.status(200).json({
                message : "success",
                data : results
            })
        }else if(type == "3"){
            const [results] = await call_db('call get_all_passengers(?)', [flight_no]);
            res.status(200).json({
                message : "success",
                data : results
            })
        }else{
            res.status(400).json({
                message : "error",
                error : "invalid type"
            })
        }
        
// validation error handleing
    }catch(e){
        if(e instanceof Error){
            res.status(400).json({
                message : "validation error",
                error : e.message
            })
            console.log(e.message)
        }else{
            res.status(400).json({
                message : "error",
                error : e
            })
        }

    }
}

async function number_of_passengers_for_dest_range_db(req, res){
    try{
        const {date1_str, date2_str,destination,ptype} = req.body;
        const date1 = new Date(date1_str);
        const date2 = new Date(date2_str);
        const type = req.params.type;
        if(type == "1"){
            [results] = await call_db('call number_of_passengers_for_dest_range(?,?,?)', [destination, date1, date2]);
            if (results[0].passenger_count){
                res.status(200).json({
                    message : "success",
                    data : results[0].passenger_count
                })
            }else{
                res.status(404).json({
                    message : "no data found"
                 })
            } 
        }
        else if(type == "2"){
            [results] = await call_db('select get_bookcount_by_type_date(?,?,?)', [date1, date2, ptype]);
            let value = Object.values(results)[0];
            if (value){
                res.status(200).json({
                    message : "success",
                    data : value
                })
            }else{
                res.status(404).json({
                    message : "no data found"
                 })
            }   
    
        }
        else{
            res.status(400).json({
                message : "error",
                error : "invalid type"
            })
        }


    }catch(e){
        res.status(400).json({
            message : "error",
            error : e
        })
    }
}

async function handleTotalRevenue_db(req, res){
    try{
        const Atype = req.body.Atype;
        const [results] = await call_db('select revenue_by_ac_model(?)', [Atype]);
        let value = Object.values(results)[0];
        if (!value){
            res.status(404).json({
                message : "no data found"
             })
        }else{
            res.status(200).json({
                message : "success",
                data : value
            });
        }


    }catch(e){
        res.status(400).json({
            message : "error",
            error : e
        })
    }
}

async function past_flight_db(req, res){
    try{
        const departureLocation = req.body.departureLocation;
        const arrivalLocation = req.body.arrivalLocation;
        const [results] = await call_db('call past_flight(?,?)', [arrivalLocation, departureLocation]);
        if (results){
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
};

module.exports = {passengers_lst, number_of_passengers_for_dest_range_db,handleTotalRevenue_db, past_flight_db}
