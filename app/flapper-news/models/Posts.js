// Here we've definite a model called Post with several attributres corresponding to the type of data we'd like to store.
// We've declared our upvotes field to be initialized to 0 and we've set our comments field to an array of Comment references.
// This will allow us to use Mongoose's build in [populate()]mongoose populate method to easily retrieve all comments associated with a given post.

var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
	title: String,
	link: String,
	upvotes: {
		type: Number,
		default: 0
	},
	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Comment'
	}]
});

mongoose.model('Post', PostSchema);