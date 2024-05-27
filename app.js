let express = require('express');
let app = express();
let mongoose = require('mongoose');
let jwt = require('jsonwebtoken');
let multer = require('multer')
let commonVariable = {}
commonVariable.jwtKey = '##$$%%%^&*@1234'
let cors = require('cors');
mongoose.connect('mongodb://localhost:27017/test').then(()=>{
    console.log('db connected')
})

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'static/'); // Destination folder for uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // Use the original name of the file
    }
  });
commonVariable.upload = multer({ storage: storage });

connection = mongoose;

app.use(express.json());
app.use(cors());
app.use(express.static('static'))
app.set('view engine','hbs');
app.listen(3000,()=>{
    console.log('connected')
})

// routes view
// require('./route/indexview')(app,commonVariable);

// route api
require('./route/loginCall')(app,commonVariable);
require('./route/registrationCall')(app,commonVariable);
require('./route/insertSubscription')(app,commonVariable);
require('./route/addMoviesandVideos')(app,commonVariable);
require('./route/subscribepackage')(app,commonVariable);
require('./route/getMoviewsforuser')(app,commonVariable);

// module
require('./module/usermanagement')(connection,commonVariable)
require('./module/subscription')(connection,commonVariable)
require('./module/moviesandvideos')(connection,commonVariable)
require('./module/subscribedpackage')(connection,commonVariable)

/**
 * Generates token
 * @param {*} userinfo 
 * @returns 
 */
commonVariable.generateToken = (userinfo) => {
    let token;
    return new Promise((resolve,reject)=>{
        let userData = {
            email : userinfo.email,
            password : userinfo.password
        }
        try {
            token = jwt.sign({userData},commonVariable.jwtKey,{expiresIn:'2h'});
            resolve(token);
        } catch (error) {
            resolve({error:error,status:'token error'});
        }
    })
}

/**
 * Verify token
 * @param {*} token 
 * @returns 
 */
commonVariable.verifyUserDetails = (token) => {
    return new Promise((resolve,reject)=>{
        try {
            isVerified = jwt.verify(token,commonVariable.jwtKey);
            resolve(isVerified)
        } catch (error) {
            resolve({error:error})
        }
    })  
}

module.exports = app

