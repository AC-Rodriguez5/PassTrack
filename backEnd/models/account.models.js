const mongoose = require ('mongoose');

const accountSchema = mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true,
        index: true
    },
    name:{
        type: String,
        required: true,
        trim: true
    },
    username:{
        type: String,
        trim: true,
        default:''
    },
    category:{
        type: String,
        enum:['social','email','banking','finance','work','school','subscription','other'],
        default:'other'
    },
    websiteUrl:{
        type: String,
        trim: true,
        default:''
    },
    notes: {
        type: String,
        trim: true,
        default:''
    },
    status:{
        type: String,
        enum:['active','expired','archived'],
        default:'active'
    },
    renewalDate:{
        type: Date,
        default:null
    },
    expirationDate:{
        type: Date,
        default:null
    },
   
},
 {
        timestamps:true
    });

const Account = mongoose.model('Account', accountSchema)
module.exports= Account;