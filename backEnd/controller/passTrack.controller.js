const User = require('../middleware/user.middleware.js');

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
const createUser = async (req,res) => {
    try{
        const checkUser = await User.findOne({email : req.body.email}).select('email');
        const email = checkUser?.email;
        if(!checkUser){
            const user = await User.create(req.body);
            return res.status(200).json(user);
        }

        console.log(`the ${email} is existing`);
        res.status(409).json({message : `the ${email} is existing`})

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
    getUser, getUserById, createUser, updateUser, deleteUser
}