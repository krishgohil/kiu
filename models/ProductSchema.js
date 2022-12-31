import { mongoose } from 'mongoose';
import { Schema, model, models } from 'mongoose';


const ProductSchema = new Schema({
    productId: { type: String },
    productCategory: { type: String },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "AllContent" },
    date: { type: Date, default: Date.now }

});

ProductSchema.index({ product: 'text', description: 'text' })


const Product = models.Product || model('Product', ProductSchema);
module.exports = Product