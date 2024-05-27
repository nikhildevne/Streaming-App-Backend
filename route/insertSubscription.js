module.exports = (app,commonVariable) => {

    /**
     * user registratoin api
     * @param {*} req 
     * @param {*} res 
     */
    const insertSubscription = async (req,res) => {
        let responseJson = {}
        let saveResponse;

        let subscription = req.body.subscription?req.body.subscription:'';
        let price = req.body.price?req.body.price:'';
        let token = req.body.token?req.body.token:'';

        let isUserVerified = await commonVariable.verifyUserDetails(token);
        if(isUserVerified.error){
            responseJson.error = 'token invalid'
            responseJson.status = 1
            res.send(responseJson);
        }else{
            try {
                saveSubscription = new commonVariable.subscription({});
    
                saveSubscription.subscription = subscription;
                saveSubscription.price = price;
    
                saveResponse = await saveSubscription.save();
                responseJson.data = saveResponse
                responseJson.status = 0
                responseJson.error = 'success'
                res.send(responseJson)
    
            } catch (error) {
                console.log(error);
                responseJson.error = error;
                responseJson.status = 'Issue occured saving subscription';
                res.send(responseJson)
            }
        }
    }

    app.post('/insertSubscription',insertSubscription);
}