let mongoose = require('mongoose')
let Schema = mongoose.Schema;
let moviesandvideos = (connection,commonVariable) => {
    var moviesandvideos = new Schema({
        moviename : {
            type: String,
            require:true
        },
        url : {
            type: String,
            require:true
        },
        genre : {
            type: String,
            require:true
        },
        packagetype : {
            type: Schema.Types.ObjectId, 
            ref: 'subscription' 
        },
        isDelete:{
            type: Number,
            default: 0
        },
        createdOn:{
            type: Date,
            default: new Date(),
            require: true
        }
    })
    commonVariable.moviesandvideos = connection.model('moviesandvideos',moviesandvideos)
    return commonVariable;
}
module.exports = moviesandvideos