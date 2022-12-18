const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Destress_Schema = new Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    message: { type: String },
    dcolor: { type: String },

}, {
    collection: 'destress'
})

const Destress = mongoose.model('Destress', Destress_Schema);
module.exports = Destress