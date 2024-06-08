import React ,{useState}from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import './ReservationForm.css';
import axios from 'axios';

const ReservationForm = () => {
  const navigate = useNavigate(); 

  const [trip, setTrip] = useState({
    departureLocation: '',
    departureDate: '',
    arrivalLocation: '',
  });

  const handleChange = e => { setTrip(prev => ({ ...prev, [e.target.name]: e.target.value}))}



  const handleFlight = () => {
    const tripData = {
      departureLocation: trip.departureLocation,
      departureDate: trip.departureDate,
      arrivalLocation: trip.arrivalLocation,
    };

    axios.post('http://127.0.0.1:5000/getflight', tripData,{
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      console.log(response.data);
      if(response.data && response.status===200){
  
          sessionStorage.setItem("flight_schedule_id",response.data.flight_schedule_id);


    
          navigate('/seat');
          window.scrollTo(0, 0);

      }
    })
    .catch(error => {
      // Handle errors from the backend (e.g., display an error message)
      console.error(error);
      if(error.response.status===401){
        alert("there are no flights available for this route");
        navigate('/home');
        window.scrollTo(0, 0);
      }
    });
  };
  
  return (
    <div className="reservation-form-container">
      <Container>
        <br />
        <Row className="justify-content-center align-items-center form-row">
            <Row>
                <form className="reservation-form">
                  <h3>Departure</h3>
                  <div className="form-group">
                    <label htmlFor="departure-location">Location:</label>
                    <select id="departure-location" name="departureLocation" required className="form-control" onChange={handleChange}>
                    <option value="" disabled selected>Select your option</option>
                      <option value="DEL">India, new Delhi</option>
                      <option value="BOM">India, Mumbai</option>
                      <option value="MAA">India, Chennai</option>
                      <option value="CGK">Indonesia, Jakarta</option>
                      <option value="DPS">Indonesia, Bali</option>
                      <option value="SIN">Singapore, Changi</option>
                      <option value="BIA">Sri Lanka, Colombo</option>
                      <option value="HRI">Sri Lanka, Hambanthota</option>
                      <option value="BKK">Thailand, Bangkok, BKK</option>
                      <option value="DMK">Thailand, Bangkok, DMK</option>
                      {/* Add more options as needed */}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="departure-date">Date:</label>
                    <input type="date" id="departure-date" name="departureDate" required className="form-control" onChange={handleChange}/>
                  </div>
                  
                </form>
            </Row>

            {/* Arrival Section */}
            <Row>
                <form className="reservation-form">
                  <h3>Arrival</h3>
                  <div className="form-group">
                    <label htmlFor="arrival-location">Location:</label>
                    <select id="arrival-location" name="arrivalLocation" required className="form-control" onChange={handleChange}>
                    <option value="" disabled selected>Select your option</option>
                      <option value="DEL">India, new Delhi</option>
                      <option value="BOM">India, Mumbai</option>
                      <option value="MAA">India, Chennai</option>
                      <option value="CGK">Indonesia, Jakarta</option>
                      <option value="DPS">Indonesia, Bali</option>
                      <option value="SIN">Singapore, Changi</option>
                      <option value="BIA">Sri Lanka, Colombo</option>
                      <option value="HRI">Sri Lanka, Hambanthota</option>
                      <option value="BKK">Thailand, Bangkok, BKK</option>
                      <option value="DMK">Thailand, Bangkok, DMK</option>
                      {/* Add more options as needed */}
                    </select>
                  </div>
                  
                </form>
            </Row>

            {/* Check   button */}
            <Row>
            <Col lg="12" className="text-right">

            
              <button className="btn-primary" onClick={handleFlight}>

                Check

              </button>
            


            </Col>
            </Row>
        </Row>
      </Container>
    </div>
  );
};

export default ReservationForm;
