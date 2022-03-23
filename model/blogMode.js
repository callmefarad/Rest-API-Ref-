const mongoose = require( 'mongoose' )
const Schema = mongoose.Schema;


const blogSchema = new Schema( {
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        require: true
    },
    comments: [ {
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }]
}, {timestamps: true} )

const blogModel = mongoose.model( 'blogs', blogSchema )
module.exports = blogModel;