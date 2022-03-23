const commentModel = require( '../model/commentModel' )
const blogModel = require('../model/blogMode')

// create new comment
const newComment = async ( req, res ) => {
    try {
        // get the id from the params
        const blogId = req.params.id
        // get the document tiled to the id
        const blog = await blogModel.findById( blogId )
        // create new comment
        const comm = new commentModel( req.body )
        // map the comment to the associated blog
        comm.poster = blog
        // save the comment
        comm.save();
        // push to the blog
        blog.comments.push( comm )
        // save the blog
        blog.save();
        // through a response
        res.status( 200 ).json( { 
            status: 'success',
            data: comm
        })


    } catch ( error ) {
        res.status( 500 ).json( {
            status: 'fail',
            message: error.message
        })
    }
}

module.exports = {
    newComment
}