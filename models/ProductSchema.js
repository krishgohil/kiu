const mongoose = require("mongoose");
const { Schema } = mongoose;


const ProductSchema = new Schema({
    productId: { type: String },
    productCategory: { type: String },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "AllContent" },
    date: { type: Date, default: Date.now }

});

ProductSchema.index({ product: 'text', description: 'text' })

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product