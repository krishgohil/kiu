const mongoose = require("mongoose");
import { Schema, model, models } from 'mongoose';

const YtPromoted = new Schema({
    thumbnail: { type: String },
    title: { type: String },
    description: { type: String },
    ytid: { type: String },
    channelId: { type: String },
    publishedAt: { type: String },
    channelTitle: { type: String },
    channelIcon: { type: String },
    duration: { type: String }, 
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    date: { type: Date, default: Date.now },
});

// YtPromoted.index({ bookName: 'text', description: 'text' })


const Ytpromoted = models.Ytpromoted || model('Ytpromoted', YtPromoted);
module.exports = Ytpromoted