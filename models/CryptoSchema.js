const mongoose = require("mongoose");
const { Schema } = mongoose;

const CryptoSchema = new Schema({
    content_id: { type: String },
    content: { type: mongoose.Schema.Types.ObjectId, ref: "AllContent" },
    date: { type: Date, default: Date.now },


});

CryptoSchema.index({ cryptocoin: 'text', description: 'text' })

const Crypto = mongoose.model('Crypto', CryptoSchema);
module.exports = Crypto