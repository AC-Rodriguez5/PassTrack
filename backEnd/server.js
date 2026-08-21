require("dotenv").config();

const express = require ('express');
const app = express();

const PORT = process.env.PORT;

const userRoutes = require ('./routes/user.route.js');
const accountRoutes = require('./routes/account.routes.js')

const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

const cors = require('cors');

// Allow all origins (Recommended for Expo Go local testing)
app.use(cors());

app.use(express.json());

//api communication
app.use('/api/auth', userRoutes);//for logging and registering
app.use('/api/accounts', accountRoutes);//for accounts info card


//<-----connection to server and database 
app.get('/', (req,res)=> {
    res.send(`Hello ${PORT}`)
});

mongoose.connect(MONGO_URI).then(()=>{
    console.log (`connected to database!`);
}).catch(()=>{
    console.log(`failed to connect to database`);
});

app.listen(PORT,'0.0.0.0', () => {
 console.log(`Server runnning on ${PORT}`);
})
