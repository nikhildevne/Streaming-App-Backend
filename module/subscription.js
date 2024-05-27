let mongoose = require('mongoose')
let Schema = mongoose.Schema;
let subscription = (connection,commonVariable) => {
    var subscription = new Schema({
        subscription : {
            type:String,
            require:true
        },
        price : {
            type:String,
            require:true
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
    commonVariable.subscription = connection.model('subscription',subscription)
    return commonVariable;
}
module.exports = subscription