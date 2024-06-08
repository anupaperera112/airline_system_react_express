const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {call_db} = require('../DB/db_connection');
const helper = require('../helpers/helperFunction')
const helperSQL = require('../helpers/helperSQL');

async function signup(req, res){
    try{    
        const {firstName, lastName, email, gender, passportNumber, addressLine1, addressLine2, city, country, birthday} = req.body;
        
        const type = req.params.type;
        const exists = await call_db('call check_user_exsits(?,?)', [email, passportNumber]);
        const age = helper.calculate_age(birthday);
        const address = addressLine1 + ' ' + addressLine2 + ' ' + city;
        if(!exists[0][0]){
            if(type == 'r'){
                const hashedPassword = bcrypt.hashSync(req.body.password, 10);
                await call_db('call new_user(?,?,?,?,?,?,?,?,?,?,?,?)', ["new_user", firstName, lastName, 0, age, email, gender, passportNumber, address, country, birthday, hashedPassword]);
            }else if(type == 'g'){
                await call_db('call Unregistered(?,?,?,?,?,?,?,?,?)',[firstName, lastName, age, email, gender, passportNumber, address, country, birthday])
            }
            const passenger_id = await helperSQL.getID('new');

            return res.status(201).json({
                message: 'User created',
                passenger_id : passenger_id
            });
        }else{
            return res.status(401).json({
                message: 'User already exists'
            });
            
        }
    }
    catch(err){
        res.status(400).json({
            status: 'error',
            message: err
        });
    }
}

async function login(req, res){
    try{
        const {email, password} = req.body;
        const storedPassword = (await call_db('call check_login(?)', [email]))[0][0].passenger_password;
        const passenger_id = await helperSQL.getID(email);
        const match = bcrypt.compareSync(password, storedPassword);
        if(storedPassword){
            if(match){
                const token = jwt.sign({
                    email : email,
                    userId : passenger_id
                },process.env.JWT_SECRET,function (err, token) {
                    res.status(200).json({
                        message : 'Auth successful',
                        token : token,
                        email : email,
                        passenger_id : passenger_id

                    })
                })    
            }
            else{
                res.status(401).json({
                    message : 'Invalid credentials'
                })
            }
    
        }else{
            res.status(401).json({
                message : 'Invalid credentials'
            })
        }

    }catch(e){
        res.status(401).json({
            message: 'Invalid credentials'

        });
    }
};

function logout(req, res) {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({
                message: 'There was an error logging out',
                error: err
            });
        }

        res.status(200).json({
            message: 'Logged out successfully'
        });
    });
}

async function getProfile(req, res){
    try{
        const email = req.params.email;
        const results = await call_db('call get_profile(?)', [email]);
        const passenger = results[0][0];
        const response_body = {
            "passenger_id": passenger.passenger_id,
            "email": passenger.email,
            "passenger_id": passenger.passenger_id,
            "booking_frequency": passenger.booking_frequency,
            "first_name": passenger.first_name,
            "last_name": passenger.last_name
        }
        res.status(200).json(response_body);
    }catch(e){
        res.status(400).json({
            status: 'error',
            message: e
        });
    }
};

/**
 * todo:
 * refresh token
 */



module.exports = {
    signup, login, logout, getProfile
}
