const express = require ('express');
const app = express();
const User = require ('../middleware/user.middleware.js');
const PORT = process.env.PORT;
app.use(express.json());

const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

//<-----connection to server and database 
app.get('/', (req,res)=> {
    res.send(`Hello ${PORT}`)
})

mongoose.connect(MONGO_URI).then(()=>{
    console.log (`connected to database!`);
}).catch(()=>{
    console.log(`failed to connect to database`);
});


app.listen(PORT, () => {
 console.log(`Server runnning on ${PORT}`);
})
//------>


//<--- creating a schema to the database
app.post('/api/user', async (req,res) => {
    try{

        const checkUser = await User.findOne({email : req.body.email}).select('email');
        const email = checkUser?.email;
        if(!checkUser){
            const user = await User.create(req.body);
            return res.status(200).json(user);
        }

        console.log(`the ${email} is existing`);
        res.status(200).json({message : `the ${email} is existing`})

    } catch(error){
        res.status(500).json({message : error.message});
    }
});
//--->


//<--- retrieving schema from the database
app.get('/api/user', async(req,res)=>{
    try{
        const users = await User.find({});

        if(await User.countDocuments() === 0){
            console.log(`empty schema`);     
            return res.status(200).json({message : `empty schema`});
            
        }
        res.status(200).json(users);

    }   catch (error){
        res.status(500).json({message : error.message});
    }
});

//retrieve by id
app.get('/api/user/:id', async(req,res)=>{
    try{
        const { id } = req.params;
        const users = await User.findById(id);
        res.status(200).json(users);

    }   catch (error){
        res.status(500).json({message : error.message});
    }
});
//--->


//<--- Update by id
app.put('/api/user/:id', async(req,res)=>{
    try{
        const { id } = req.params;
        const user = await User.findById(id);
        
        if (!user){
            return res.status(200).json({message : "user not found"});
        }
        else{
            const user = await User.findByIdAndUpdate(id, req.body);
            const updatedUser = await User.findById(id);
            return res.status(200).json(updatedUser);
        }
    }   catch (error){
        res.status(500).json({message : error.mesage});
    }
});
//--->


//<--- DELETE by id
app.delete('/api/user/:id', async(req,res)=>{
    try{
        const { id } = req.params;
        const user = await User.findById(id);
        

        if(!user){
            return res.status(404).json({message : `email not found`});
        }
        
        const  email = user.email;
        await User.findByIdAndDelete(id);
        return res.status(200).json({message : `email: ${email} has been deleted`});
        

    }   catch (error){
        return res.status(500).json({message : error.message});
    }
});

