const mongoose = require("mongoose");
const { Schema } = mongoose;

const Chatmodel = new Schema({
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            userId: { type: String }
        },
    ],

    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    chatMessages: [
        {
            sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            message: { type: String },
            ytlink: { type: String },
            images: [
                { type: String }
            ],
            post: { type: mongoose.Schema.Types.ObjectId, ref: "AllContent" },
            product: { type: mongoose.Schema.Types.ObjectId, ref: "AllContent" },
            isDeleted: { type: Boolean, default: false },
            isDeletedFor: [
                {
                    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                    userId: { type: String }
                }
            ]

        }
    ],
    latestMessage: {
        message: { type: String },
        image: { type: String },

        product: { type: String },
        post: { type: String },
        ytlink: { type: String },
        date: { type: Date },
        seen: { type: Boolean, default: false },
        seenBy: [
            {
                user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                userId: { type: String }
            },
        ]
    },
    date: { type: Date, default: Date.now },

});

// Chatmodel.index({ cryptocoin: 'text', description: 'text' })

const Chats = mongoose.model('Chats', Chatmodel);
module.exports = Chats