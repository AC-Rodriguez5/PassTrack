const User = require('../middleware/user.middleware.js');
const bcrypt = require('bcrypt');

//get all user in schema
const getUser = async(req,res)=>{
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
}

//get user by ID
const getUserById = async(req,res)=>{
    try{
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message : 'user not found' });
        }

        res.status(200).json(user);

    }   catch (error){
        res.status(500).json({message : error.message});
    }
}

//create user in schema
const registerUser = async (req,res) => {
    console.log("REGISTER CONTROLLER HIT");

    console.log(req.body);
    try{
        const{
            firstName, middleName, lastName, email, password
        } = req.body;

        const checkUser = await User.findOne({email : req.body.email}).select('email');

        if(checkUser){

            console.log(`the ${email} is existing`);
            return res.status(409).json({message : `the ${email} is existing`});
            
        }
        console.log(req.body)
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser= new User({
            firstName, middleName, lastName, email, password : hashedPassword
        });

        const savedUser = await newUser.save();
        console.log(savedUser)
        
        res.status(201).json({message : 'account created succesfully'});    
        console.log('account created succesfully')

    } catch(error){
        res.status(500).json({message : error.message});
    }
}

//update user in Schema
const updateUser = async(req,res)=>{
    try{
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, req.body);
        
        if (!user){
            return res.status(404).json({message : "user not found"});
        }
        return res.status(200).json(user);
    }   catch (error){
        res.status(500).json({message : error.message});
    }
}

//delete user in schema
const deleteUser = async(req,res)=>{
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
}



module.exports = {
    getUser, getUserById, registerUser, updateUser, deleteUser
}