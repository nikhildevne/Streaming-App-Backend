let mongoose = require('mongoose')
let Schema = mongoose.Schema;
let subscribedpackage = (connection,commonVariable) => {
    var subscribedpackage = new Schema({
        userid : {
            type: Schema.Types.ObjectId, 
            ref: 'usermanagement' 
        },
        packageid : {
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
    commonVariable.subscribedpackage = connection.model('subscribedpackage',subscribedpackage)
    return commonVariable;
}
module.exports = subscribedpackage