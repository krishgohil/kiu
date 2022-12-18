const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PendingUser_Schema = new Schema({
    name: { type: String },
    allMessages: [
        {
            message: { type: String },
            messagerId: { type: String }
        }
    ],

}, {
    collection: 'pending_User'
})

const Pending_User = mongoose.model('Pending_User', PendingUser_Schema);
module.exports = Pending_User