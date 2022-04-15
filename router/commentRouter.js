const express = require( 'express' )
const router = express.Router()
const {newComment, allComment, singleComment, updateComment, removeComment} = require( '../controller/commentController')

router
    .route( '/blog/:blogId/comments' )
    .post( newComment )
    .get(allComment)
router
    .route( '/blog/:blogId/comments/:comId' )
    .get(singleComment)
    .patch(updateComment)
    .delete(removeComment)

module.exports = router;