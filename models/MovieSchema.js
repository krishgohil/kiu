const mongoose = require("mongoose");
const { Schema } = mongoose;

const MovieSchema = new Schema({

    content_id: { type: String },
    content: { type: mongoose.Schema.Types.ObjectId, ref: "AllContent" },
    date: { type: Date, default: Date.now },


});

MovieSchema.index({ movieName: 'text', description: 'text' })

const Movie = mongoose.model('Movie', MovieSchema);
module.exports = Movie