require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');


const app = express();

app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true
  }));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const userRouter = require('./routes/user');
const reportsRouter = require('./routes/report');
const customerRouter = require('./routes/customer');

app.use(bodyParser.json());
app.use("/user", userRouter);
app.use("/report", reportsRouter);
app.use("/customer", customerRouter);



module.exports = app;