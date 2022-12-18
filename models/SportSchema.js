const mongoose = require("mongoose");
const { Schema } = mongoose;

const SportSchema = new Schema({
  content_id: { type: String },
  content: { type: mongoose.Schema.Types.ObjectId, ref: "AllContent" },
  date: { type: Date, default: Date.now },



},

  {
    collection: 'sports'
  });

SportSchema.index({ sportname: 'text', description: 'text' })


const Sport = mongoose.model('Sport', SportSchema);
module.exports = Sport

