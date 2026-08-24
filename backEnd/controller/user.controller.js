const User = require('../models/user.models.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { loginUserSchema, registerUserSchema } = require('../validation/auth.validation.js');

//Login function
const loginUser = async(req,res)=>{
    try{
        const result = loginUserSchema.safeParse(req.body);
        if(!result.success){
            return res.status(400).json({message : `Invalid login data`, errors: result.error.issues});
        }

        //get the email and pass after validated
        const {email, password} = result.data;
   
        const user = await User.findOne({ email });
        if(!user){//scan the schema is there is an email existing
            return res.status(401).json({message : 'Email or password is incorrect'});
        }

        const passwordMatch = await bcrypt.compare(//compare the password if match what is in the schema
            password, user.password
        );

        if(!passwordMatch){
            return res.status(401).json({message : 'Email or password is incorrect'});
        }

        const token = jwt.sign({//generate token once logged in
            userId: user._id,
            email: user.email,
        },
            process.env.JWT_SECRET,
        {
            expiresIn: '1d'
        });

        return res.status(200).json({
            message : "Login succesfull",token,
            user:{
                userId: user._id,
                firstName: user.firstName,
                middleName: user.middleName,
                lastName: user.lastName,
                email: user.email

            }
        });
    
    }catch(error){
        console.log('error login', error);

        return res.status(500).json({
            message : 'server error', error
        });

    }
}


//create user in schema
const registerUser = async (req,res) => {
    
    try{

        const result = registerUserSchema.safeParse(req.body)
        if(!result.success){
            return res.status(400).json({message:`invalid data`, errors: result.error.issues});
        } 
        const{
            firstName, middleName, lastName, email, password
        } = result.data;

        const checkUser = await User.findOne({email}).select('email');

        if(checkUser){
            console.log(`the ${email} is existing`);
            return res.status(409).json({message : `the ${email} is existing`});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser= new User({
            firstName, middleName, lastName, email, password : hashedPassword
        });

        await newUser.save();
        console.log('account created succesfully')
        return res.status(201).json({message : 'account created succesfully'});    

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
const logoutUser = async(req,res)=>{
    try{
        console.log('for the moment underdevelopment of log out');

    }   catch (error){
        return res.status(500).json({message : error.message});
    }
}



module.exports = {
    loginUser, registerUser, updateUser, logoutUser
}