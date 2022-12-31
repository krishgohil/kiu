import { mongoose } from 'mongoose';
const { Schema } = mongoose;

const ScienceTechSchema = new Schema({

    content_id: { type: String },
    content: { type: mongoose.Schema.Types.ObjectId, ref: "AllContent" },
    date: { type: Date, default: Date.now },


});


const ScienceTech = mongoose.model('ScienceTech', ScienceTechSchema);
module.exports = ScienceTech