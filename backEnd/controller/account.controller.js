const Account = require ('../models/account.models.js');
const { updateAccountSchema, createAccountSchema } = require ('../validation/account.validation.js');


//creating accountInfo
const createAccount = async(req,res) =>{
    try{
        const result= createAccountSchema.safeParse(req.body);
        if(!result.success){
            return res.status(400).json({message : `Invalid Account data/s`, errors : result.error.issues});
        }

        const account = await Account.create({
            owner: req.user.userId,
            ...result.data
        });

        return res.status(201).json({
            message: 'Account created succesfully', account
        });

    }catch(err){
        return res.status(500).json({message : err.message});
    }
};


const getAccount = async(req,res) => {
    try{
        const accounts = await Account.find({
            owner: req.user.userId
        }).sort ({createdAt: -1 });
        return res.status(200).json({
            count: accounts.length, accounts
        });
    }catch(err){
        return res.status(500).json({message : err.message});
    }
}

const getAccountById = async(req,res)=>{
    try{
        const { id } = req.params;
        const account = await Account.findOne({
            _id : id,
            owner : req.user.userId 
        });
        if(!account){
            return res.status(404).json({message : 'account not found'});
        }

        return res.status(200).json({ account });

    }catch(error){

        return res.status(500).json({message : error.message})

    }
}


const updateAccount = async(req,res)=>{
    try{
        const { id } = req.params;
        const result= updateAccountSchema.safeParse(req.body);

        if(!result.success){
            return res.status(400).json({message : `Invalid Account update data/s`, errors : result.error.issues});
        }
        const updateData = result.data;

        const account  = await Account.findOneAndUpdate({
            _id : id,
            owner : req.user.userId
        },
            updateData,
        {
            new: true,
            runValidators: true
        });
        if(!account){
            return res.status(404).json({ message : `account not found` });
        }

        return res.status(200).json({ account });
    }catch(err){
        return res.status(500).json({message : err.message});
    }

}

const deleteAccount = async(req,res)=>{
    try{
        const { id } = req.params;
        const account = await Account.findOneAndDelete({
            _id : id,
            owner : req.user.userId
        });
        if(!account){
            return res.status(404).json({message : `account not found`})
        }

        return res.status(200).json({message : `account deleted succesfully`});


    }catch(err){
        return res.status(500).json({message : err.message});
    }
}




module.exports={
    createAccount, getAccount, getAccountById, updateAccount, deleteAccount
}