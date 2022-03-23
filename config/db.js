const mongoose = require( 'mongoose' );
port = 2010
url = 'mongodb://localhost:27017/sampleBlog'

mongoose.connect( url ).then( () => {
    console.log("Connected to the database successfully")
} ).catch( ( error ) => {
    console.log(error.message)
})