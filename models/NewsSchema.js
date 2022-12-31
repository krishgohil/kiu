import { mongoose } from 'mongoose';
const { Schema } = mongoose;

const NewsSchema = new Schema({

    content_id: { type: String },
    content: { type: mongoose.Schema.Types.ObjectId, ref: "AllContent" },
    date: { type: Date, default: Date.now },


});


const News = mongoose.model('News', NewsSchema);
module.exports = News