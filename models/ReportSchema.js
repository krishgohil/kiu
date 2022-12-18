const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReportSchema = new Schema({

    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: mongoose.Schema.Types.ObjectId, ref: "AllContent" },
    contentCreator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    date: { type: Date, default: Date.now },

}, {
    collection: 'report'
})

const Report = mongoose.model('Report', ReportSchema);
module.exports = Report