const mongoose = require("mongoose");
const { Schema } = mongoose;

const YtSchema = new Schema({
    content_id: { type: String },
    content: { type: mongoose.Schema.Types.ObjectId, ref: "AllContent" },
    date: { type: Date, default: Date.now },


});

// YtSchema.index({ bookName: 'text', description: 'text' })

const Yt = mongoose.model('Yt', YtSchema);
module.exports = Yt