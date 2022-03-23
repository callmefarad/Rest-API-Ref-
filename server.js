require( './config/db' )
const express = require( 'express' )
const blogRouter = require('./router/blogRouter')
const app = express()

app.use( express.json() )
app.get( '/', ( req, res ) => {
    res.send('Welcome to evening API')
} )
app.use('/api', blogRouter)
app.listen( port, () => {
    console.log(`Server is listening to port ${port}`)
})