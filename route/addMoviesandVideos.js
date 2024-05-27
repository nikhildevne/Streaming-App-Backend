module.exports = (app,commonVariable) => {

    /**
     * i have use multer here but we can use other services as well such as AWS S3 Bucket
     * @param {*} req 
     * @param {*} res 
     */
    const addmoviesandvideos = async (req,res) => {
        let responseJson = {}
        let response;

        let moviename = req.body.moviename;
        let genre = req.body.genre;
        let packagetype = req.body.packagetype;
        let url = `http://localstorage:3000/${req.file.filename}`
        let token = req.body.token

        try {
            let isUserVerified = await commonVariable.verifyUserDetails(token);
            if(isUserVerified.error){
                responseJson.error = 'token invalid'
                responseJson.status = 1
                res.send(responseJson);
            }else{
                let saveMovie = new commonVariable.moviesandvideos({});

                saveMovie.moviename = moviename
                saveMovie.genre = genre
                saveMovie.packagetype = packagetype
                saveMovie.url = url

                try {
                    response = await saveMovie.save()
                } catch (error) {
                    console.log(error)
                }

                if(!response){
                    responseJson.status = 'error occured';
                    responseJson.code = 1;
                    res.send(responseJson)
                }else{
                    responseJson.status = 'success';
                    responseJson.code = 0;
                    res.send(responseJson)
                }
            }
        } catch (error) {
            
        }
        
    }

    app.post('/addmoviesandvideos',commonVariable.upload.single(),addmoviesandvideos)
}