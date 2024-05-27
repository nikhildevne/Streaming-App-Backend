module.exports = (app,commonVariable) => {

    /**
     * user login api
     * @param {*} req 
     * @param {*} res 
     */
    const loginCall = async (req,res) => {
        let responseJson = {}

        let email = req.body.email;
        let password = req.body.password;

        let condition = {}
        condition.email = email
        condition.password = password

        try {
            getUserDetatils = await commonVariable.usermanagement.findOne(condition);

            if(!getUserDetatils){
                responseJson.status = 'Fail';
                responseJson.code = 1;
                res.send(responseJson)
            }

            if(getUserDetatils){
                let token = await commonVariable.generateToken({email:email,role:getUserDetatils.role})
                responseJson.data = getUserDetatils;
                responseJson.token = token;
                responseJson.status = 'success';
                responseJson.code = 0;
            }

        } catch (error) {
            responseJson.error = error;
            responseJson.status = 'issue in save code';
        }

        res.send(responseJson);
    }

    app.post('/loginCall',loginCall);
}