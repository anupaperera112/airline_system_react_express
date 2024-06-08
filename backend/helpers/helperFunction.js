const Validator = require('fastest-validator');
function calculate_age(birth_date){
    // Convert birth date string to date object
    const date_birthday = new Date(birth_date);
    // birth_date = date.fromisoformat(birth_date)

    // Get today's date
    const today = new Date();

    // Calculate age in years
    const age = today.getFullYear() - date_birthday.getFullYear() - 
        ((today.getMonth(), today.getDate()) < (date_birthday.getMonth(), date_birthday.getDate()));

    return age;
};

function dateConvert(getDate){
    let date = new Date(getDate);

    let year = date.getFullYear();
    let month = date.getMonth() + 1; // getMonth() returns a 0-based month, so we add 1
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    // Pad single digit month, day, hours, minutes, and seconds with a leading zero
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    let formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return formattedDate;
}

function validate(checkData, schema){
    const v = new Validator();
    const validationResponse = v.validate(checkData, schema);

    if (validationResponse !== true){
        return validationResponse;
    }else{
        return true;
    }
    
}


module.exports={
    calculate_age, dateConvert, validate
}