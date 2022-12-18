const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
    email: { type: String, required: true },
    feedback: { type: String },

}, {
    collection: 'feedback'
})

const Feedback = mongoose.model('Feedback', FeedbackSchema);
module.exports = Feedback