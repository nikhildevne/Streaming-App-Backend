module.exports = (app,commonVariable) => {

    /**
     * subscribe package for user
     * @param {*} req 
     * @param {*} res 
     */
    const getmoviesforuser = async (req,res) => {
        let responseJson = {}
        let response;

        userid = req.body.userid;
        
        try {
            let getpackageDetails = await commonVariable.subscribedpackage.findOne({userid:userid});

            let getMovies = await commonVariable.moviesandvideos.find({packagetype:getpackageDetails.packageid});

            
            if(getMovies){
                responseJson.data = getMovies
                responseJson.status = 'success'
                responseJson.code = 0
                res.send(responseJson)
            }
         } catch (error) {
            console.log(error)
        }
        
    }

    app.post('/getmoviesforuser',getmoviesforuser)
}