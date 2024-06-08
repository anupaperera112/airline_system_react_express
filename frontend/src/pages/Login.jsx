import React ,{useEffect, useState}from 'react'
import '../styles/login.css'
import{Container,Row,Col,Form,FormGroup,Button} from 'reactstrap'
import {Link, useNavigate} from 'react-router-dom'
import loginImg from '../assets/images/plane-login.webp'
import axios from 'axios';
// import {FcGoogle} from 'react-icons/fc'
// import {app} from '../config/firebase-config'
// import { getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'

// const [auth, setAuth]= useState(false||window.localStorage.getItem("auth")==="true")
const Login = ({setAuth}) => 
{

  // const firebaseAuth = getAuth(app);
  // const provider = new GoogleAuthProvider();

  const navigate = useNavigate();


  
  const [credentials, setCredentials] = useState({
    email:'',
    password:''
  });

  const token = sessionStorage.getItem("token");
  const flight_schedule_id = sessionStorage.getItem("flight_schedule_id");

  const handleChange = e =>{
    setCredentials(prev => ({ ...prev, [e.target.name]: e.target.value}))
  }


  const handleClick = e => {
    e.preventDefault();
  }

  const navigateto = () => {
    // navigate to /home to select the flight, if already selected the flight, navigate to payment page
    if(flight_schedule_id){
      navigate('/pay');
      window.scrollTo(0, 0);
    }else{
      navigate('/Home');
      window.scrollTo(0, 0);
    }
  };

  const handleLogin = () => {
    // const history = useHistory();
    const userData = {
      // userName: credentials.userName,
      email: credentials.email,
      password: credentials.password,
      token:token
    };
    // console.log(userData);
    // Send a POST request to your Flask backend
    axios.post('http://127.0.0.1:5000/user/login', userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        // Handle the response from the backend (e.g., show a success message)
        if(response.data && response.data.token){
          alert("Successfully Login");
          sessionStorage.setItem("token", response.data.token);
          sessionStorage.setItem("passenger_id", response.data.passenger_id);
          sessionStorage.setItem("email", credentials.email)
          navigateto();
          // return (<MessageComponent content="Please read the comments carefully"></MessageComponent>);
        } else{
          console.error('Invalid response from server:', response.data);
        }
        
      })
      .catch(error => {
        // Handle errors from the backend (e.g., display an error message)
        // console.error(error);
        if(error.response.status===401){
          alert("Invalid Credentials");
        }
      });

  
  };


  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className='m-auto'>
          <div
            className="login__container d-flex justify-content-between"
            style={{ backgroundImage: `url(${loginImg})` }}
          >
              

              <div className="login__form">
                <h2 className='head_login'>Login</h2>
                {/* <Form onSubmit={handleClick}> */}
                  <FormGroup>
                    <input type="email" placeholder="Email" required  name="email" onChange={handleChange}/>
                  </FormGroup>
                  <FormGroup>
                    <input type="password" placeholder="Password" required  name = "password" onChange={handleChange}/>
                  </FormGroup>
                  
                  <Button className="btn_secondary1"  onClick={handleLogin}>
                    Login
                  </Button>
                  {/* <Button className='btn google__btn auth__btn ' type="submit" onClick={loginWithGoogle}>
                  <FcGoogle/>
                    Sign in with Google
                    </Button>
                     */}
                {/* </Form> */}
                <p >Don't have an account?<Link to='/Registered_user' >Create </Link></p>
              </div>
 
            </div>
            
          </Col>
          
        </Row>
      </Container>

    </section>
  )
}

export default Login