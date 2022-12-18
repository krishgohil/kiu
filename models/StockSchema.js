const mongoose = require("mongoose");
const { Schema } = mongoose;

const StockSchema = new Schema({
    content_id: { type: String },
    content: { type: mongoose.Schema.Types.ObjectId, ref: "AllContent" },
    date: { type: Date, default: Date.now },


});

StockSchema.index({ stockName: 'text', description: 'text' })

const Stock = mongoose.model('Stock', StockSchema);
module.exports = Stock