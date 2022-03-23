const express = require( 'express' )
const router = express.Router()
const { newBlog, allBlogs, singleBlog, updateBlog, deleteOne, newComment } = require( '../controller/blogController' )

// All possible routes
router
    .route( '/blog' )
    .post( newBlog )
    .get( allBlogs )
    
router
    .route( '/blog/:id' )
    .get( singleBlog )
    .patch( updateBlog )
    .delete( deleteOne )
    
router
    .route( '/blog/:id/comment' )
    .post(newComment)

module.exports = router;