const mongoose = require("mongoose");
const { Schema } = mongoose;

const FunSchema = new Schema({

    content_id: { type: String },
    content: { type: mongoose.Schema.Types.ObjectId, ref: "AllContent" },
    date: { type: Date, default: Date.now },


});


const Fun = mongoose.model('Fun', FunSchema);
module.exports = Fun