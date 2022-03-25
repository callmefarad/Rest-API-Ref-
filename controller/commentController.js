const commentModel = require( '../model/commentModel' )
const blogModel = require( '../model/blogMode')


// new blog
const newComment = async ( req, res ) => {
    try {
        // get the id from the params
        const blogId = req.params.id;
        // get the document allocated to that id
        const blog = await blogModel.findById( blogId );
        console.log
        // create new comment instance
        const comm = new commentModel(req.body)
        // tigh comment to a document
        comm.poster = blog
        // save the comment
        comm.save()
        // push the comment into the specific blog post
        blog.comments.push( comm )
        // save the blog
        blog.save()
        res.status( 200 ).json( {
            status: 'success',
            data: comm
        })
    } catch ( error ) {
        console.log(error)
        res.status( 500 ).json( {
            status: 'fail',
            message: error.message,
            
        })
    }
}

// get all comment
const allComment = async ( req, res ) => {
    try {
        // get the id
        const blogId = req.params.id;
        // get the document allocated to that blog
        const blog = await blogModel.findById( blogId ).populate('comments');
        // display blog with all its comments
        res.status( 200 ).json( {
            status: 'success',
            data: blog
        })
    } catch ( error ) {
        console.log(error)
        res.status( 404 ).json( {
            status: 'fail',
            message: error.message,
            
        })
    }
}


module.exports = {
    newComment,
    allComment
}