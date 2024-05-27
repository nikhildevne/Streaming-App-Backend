let mongoose = require('mongoose')
let Schema = mongoose.Schema;
let usermanagement = (connection,commonVariable) => {
    var usermanagement = new Schema({
        firstname : {
            type:String,
            require:true
        },
        lastname : {
            type:String,
            require:true
        },
        email:{
            type:String,
            require:true
        },
        role:{
            type:String,
            require:true
        },
        password:{
            type:String,
            require:true
        },
        subscription:{ 
            type: Schema.Types.ObjectId, 
            ref: 'subscription' 
        },
        isDelete:{
            type:Number,
            default:0
        },
        createdOn:{
            type:Date,
            default:new Date(),
        }
    })
    commonVariable.usermanagement = connection.model('usermanagement',usermanagement)
    return commonVariable;
}
module.exports = usermanagement