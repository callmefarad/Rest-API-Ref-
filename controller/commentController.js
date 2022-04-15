const commentModel = require( '../model/commentModel' )
const blogModel = require( '../model/blogMode')


// new blog
const newComment = async ( req, res ) => {
    try {
        // get the id from the params
        const blogId = req.params.blogId;
        // get the document allocated to that id
        const blog = await blogModel.findById( blogId );
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
        res.status( 201 ).json( {
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
        const blogId = req.params.blogId;
        // get the document allocated to that blog
        const blog = await blogModel.findById( blogId ).populate( { path: 'comments', select: 'name', options: { limit: 2 } } )
        // get the length of comment
        const blogLength = await blogModel.findById( blogId )
        const commentLength = blogLength.comments.length
        // display blog with all its comments
        res.status( 200 ).json( {
            status: 'success',
            message: commentLength,
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

// get a single comment
const singleComment = async ( req, res ) => {
    try {
        // extract the id from params
        const comId = req.params.comId
        // get the document associated to that id
        const comm = await commentModel.findById( comId )
        // return a response
        res.status( 200 ).json( {
            status: 200,
            data: comm
        })

    } catch ( err ) {
        res.status( 404 ).json( {
            status: 404,
            message: err.message,
        })
    }
}

// update a comment 
const updateComment = async ( req, res ) => {
    try {
        // get the id
        const id = req.params.comId
        // update the document of that id
        const updatedComment = await commentModel.findByIdAndUpdate( id, req.body, { new: true } )
        res.status( 200 ).json( {
            status: 200,
            data: updatedComment
        })
    } catch ( error ) {
        res.status( 500 ).json( {
            status: 500,
            message: error.message
        })
    }
}

// remove a comment
const removeComment = async ( req, res) => {
    try {
        // get the id
        const id = req.params.comId
        // remove the comment based on the id
        await commentModel.findByIdAndDelete( id )
        // get the blog id
        const blogId = req.params.blogId
        // get the document allocated to the id
        const blog = await blogModel.findById( blogId )

        // pull the comment from the blog comments array
        await blog.comments.pull( id )
        // save the action
        blog.save()

        res.status( 200 ).json( {
            message: 'Removed successfully'
        })
        
    } catch ( error ) {
        message: error.message
    }
}


module.exports = {
    newComment,
    allComment,
    singleComment,
    updateComment,
    removeComment
}