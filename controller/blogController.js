const blogModel = require( '../model/blogMode' )


// new blog
const newBlog = async ( req, res ) => {
    try {
        // get document data from request body
        const data = {
            title: req.body.title,
            content: req.body.content
        }
        // create new document
        const blog = await blogModel.create( data )
        res.status( 200 ).json( {
            status: 'success',
            data: blog
        })
    } catch ( error ) {
        res.status( 500 ).json( {
            status: 'fail',
            message: error.message
        })
    }
}

// get all blogs
const allBlogs = async ( req, res ) => {
    try {
        // use the mongodb function to get all documents
        const blogs = await blogModel.find()
        res.status( 200 ).json( {
            status: 'success',
            data: blogs
        })
    } catch ( error ) {
        res.status( 404 ).json( {
            status: 'fail',
            message: error.message
        })
    }
}

// get a single blog
const singleBlog = async ( req, res ) => {
    try {
        // get the id from the request head
        const blogId = req.params.id
        // get the document of this id
        const blog = await blogModel.findById( blogId )
        res.status( 200 ).json( {
            status: 'success',
            data: blog
        })
    } catch ( error ) {
        res.status( 404 ).json( {
            status: 'fail',
            message: error.message
        })
    }
}

// update a blog
const updateBlog = async ( req, res ) => {
    try {
        // get the id from the request head
        const blogId = req.params.id
        // get all the data from the body object
        const data = {
            title: req.body.title,
            content: req.body.content
        }
        // update the document
        const updatedBlog = await blogModel.findByIdAndUpdate(blogId, data)
        res.status( 200 ).json( {
            status: 'success',
            data: updatedBlog
        })
    } catch ( error ) {
        res.status( 404 ).json( {
            status: 'fail',
            message: 'error.message'
        })
    }
}

// delete one blog
const deleteOne = async ( req, res ) => {
    try {
        // get the document id
        const blogId = req.params.id
        // remove the document with this id
        await blogModel.findByIdAndRemove( blogId )
        res.status( 200 ).json( {
            status: 'success',
            message: 'deleted successfully'
        })
    } catch ( error ) {
        res.status( 404 ).json( {
            status: 'fail',
            message: error.message
        })
    }
}

// new comment
const newComment = async ( req, res ) => {
    try {
        // get the id from the params
        const blogId = req.params.id;
        // get the document allocated to that id
        const blog = await blogModel.findById( blogId );
        console.log(blog)
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


module.exports = {
    newBlog,
    allBlogs,
    singleBlog,
    updateBlog,
    deleteOne,
    newComment
}