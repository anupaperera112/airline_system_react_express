import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';

const PassengerBelow18 = () => {

    const [reportData, setReportData] = useState({flight_no: ''});
    const [passengers2, setPassengers2] = useState([]);
    const [showPassengers2, setShowPassengers2] = useState(false);

    const handleChange = e =>{
        setReportData(prev => ({ ...prev, [e.target.name]: e.target.value}))
      }

    const handlePassengers_below_18 = () => {
        const sendReportData = {
            flight_no: reportData.flight_no,

        };
        axios.post('http://127.0.0.1:5000/passengers_lst/2', sendReportData, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(response => {
            if(response.status===201){
                alert("Report genarate Successfully");
                setPassengers2(response.data);
                // setShowPassengers1(false);
                setShowPassengers2(true);
                // setShowPassengers3(false);
              }
          })
          .catch(error => {
            if(error.response.status===401){
              alert("No passenger list found");
            }
          });
      };

      return(
        <Container style={{ backgroundColor: '#f0f0f0', borderRadius: '50px' }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                <form className="reservation-form">
                    <h3>Passengers below 18 years of age</h3>
                    <div className="form-group">
                        <label htmlFor="departure-date">Enter flight ID here:</label>
                        <input type="text" id="flight-number" name="flight_no" required className="form-control" onChange={handleChange}/>                                    </div>
    
                </form>
                </div>
                <button className="btn-primary" onClick={handlePassengers_below_18}> Get Report </button>
                <br/>
                {setShowPassengers2 && (
                    
                    <div>
                    
                    {passengers2.length > 0 && (
                      <>
                      <div style={{ textAlign: 'center' }}>
                      <h1>Passenger List</h1>   
                      </div>
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Passenger Name</th>
                          </tr>
                        </thead>
                        <tbody>
                          {passengers2.map(row => (
                            <tr key={row[0]}>
                              {row.map((cell, index) => (
                                <td key={index}>{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      </>
                    )}
                  </div>
                )}
   
            </Container>
      );

};

export default PassengerBelow18;