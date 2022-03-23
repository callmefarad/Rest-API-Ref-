const express = require( 'express' )
const router = express.Router()
const {newComment} = require("../controller/commentController")


// All route and their end points
router
    .route( "/blog/:id/comment" )
    .post( newComment )


module.exports = router;