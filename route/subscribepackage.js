module.exports = (app,commonVariable) => {

    /**
     * subscribe package for user
     * @param {*} req 
     * @param {*} res 
     */
    const subscribepackage = async (req,res) => {
        let responseJson = {}
        let response;

        let userid = req.body.userid;
        let packageid = req.body.packageid;
        let token = req.body.token

        try {
            
            let isUserVerified = await commonVariable.verifyUserDetails(token);
            if(isUserVerified.error){
                responseJson.error = 'token invalid'
                responseJson.status = 1
                res.send(responseJson);
            }else{
                let subscriptionDetails

                try {
                    subscriptionDetails = new commonVariable.subscribedpackage({});

                    subscriptionDetails.userid = userid
                    subscriptionDetails.packageid = packageid

                    response = await subscriptionDetails.save()

                    if(!response){
                        responseJson.status = 'error occured';
                        responseJson.code = 1;
                        res.send(responseJson)
                    }else{
                        responseJson.status = 'success';
                        responseJson.code = 0;
                        res.send(responseJson)
                    }

                } catch (error) {
                    console.log(error)
                }
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    app.post('/subscribepackage',subscribepackage)
}