module.exports = (app,commonVariable) => {

    /**
     * user registratoin api
     * @param {*} req 
     * @param {*} res 
     */
    const registrationCall = async (req,res) => {
        let responseJson = {}
        let saveResponse;

        let email = req.body.email?req.body.email:'';
        let firstname = req.body.firstname?req.body.firstname:'';
        let lastname = req.body.lastname?req.body.lastname:'';
        let password = req.body.password?req.body.password:'';
        let role = req.body.role?req.body.role:'';

        // if email and password no valid return
        if(!email && email === '' && !password && password === ''){
            responseJson.status = 'incorrect data';
            responseJson.code = 1;
            res.send(responseJson)
        }

        // if user exists return
        let isUserExists = await commonVariable.usermanagement.findOne({email:email});
        if(isUserExists){
            responseJson.status = 'User Exists';
            responseJson.code = 1;
            res.send(responseJson)
        }

        try {
            saveResponse = new commonVariable.usermanagement({});
        } catch (error) {
            console.log(error);
            responseJson.error = error;
            responseJson.status = 'Issue occured in usermangent module';
        }

        saveResponse.firstname = firstname;
        saveResponse.lastname = lastname;
        saveResponse.email = email;
        saveResponse.password = password;
        saveResponse.role = role;

        try {
            let token = await commonVariable.generateToken({email:email,password:password})
            if(token.status === 'token error'){
                responseJson.error = token.status;
                res.send(responseJson);
            }
            if(!isUserExists && !token.status){
                let response = await saveResponse.save();
                responseJson.data = response;
                responseJson.token = token;
                responseJson.status = 'success';
                responseJson.code = 0;
                res.send(responseJson);
            }
        } catch (error) {
            responseJson.error = error;
            responseJson.status = 'issue in save code';
            res.send(responseJson);
        }

    }

    app.post('/registrationCall',registrationCall);
}