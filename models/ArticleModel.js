var mongoose = require('mongoose');

var ArticleSchema = new mongoose.Schema({
    title: {type: String, required: [true, "Can't be blank"]},
    description: {type: String, select: true},
    body: {type: String, select: true},
    author: {type: String, required: [true, "Can't be blank"]},
    comments: [{ comment: String }]
});

mongoose.model('Article', ArticleSchema);