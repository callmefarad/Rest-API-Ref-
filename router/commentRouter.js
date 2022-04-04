const express = require( 'express' )
const router = express.Router()
const {newComment, allComment} = require( '../controller/commentController')

router
    .route( '/blog/:blogId/comments' )
    .post( newComment )
    .get(allComment)


module.exports = router;