const express = require ('express');
const app = express();
const PORT = process.env.PORT;
const userRoutes = require ('./routes/user.route.js');
const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;


//<----MIDDLEWARE--->
app.use(express.json());

app.use('/api/user', userRoutes);


//<-----connection to server and database 
app.get('/', (req,res)=> {
    res.send(`Hello ${PORT}`)
});

mongoose.connect(MONGO_URI).then(()=>{
    console.log (`connected to database!`);
}).catch(()=>{
    console.log(`failed to connect to database`);
});

app.listen(PORT, () => {
 console.log(`Server runnning on ${PORT}`);
})
