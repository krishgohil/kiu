const mongoose = require("mongoose");
import { Schema, model, models } from 'mongoose';

const AllContentSchema = new Schema({
    isDeleted: { type: Boolean, default: false },

    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    postedById: { type: String },
    postType: { type: String }, // kwik , photo , poll
    postimg: [
        { type: String }
    ],
    thumbnail: { type: String },
    link: { type: String },
    title: { type: String },
    description: { type: String },
    category: { type: String },
    totalStarRating: { type: Number, default: 0 },
    avgStarRating: { type: Number, default: 0 },
    posted_Date: { type: Date, default: Date.now },
    isRepost: { type: Boolean, default: false },
    repost: { type: mongoose.Schema.Types.ObjectId, ref: "AllContent" },
    reposters: [
        {
            reposter: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            reposterId: { type: String }
        }
    ],
    reposts: { type: Number, default: 0 },
    repostId: { type: String },
    pollVotes: { type: Number, default: 0 },
    pollOptions: [
        {
            option: { type: String },
            voters: [
                {
                    voter: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                    voterId: { type: String },
                    date: { type: Date, default: Date.now }
                }
            ]
        }
    ],



    views: { type: Number, default: 0 },
    seenBy: [
        {
            userId: { type: String },
            user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

        }
    ],




    ratedBy: [
        {
            raterComment: { type: String, default: "" },
            starRating: { type: Number },
            raterId: { type: String },
            rater: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            ratedDate: { type: Date, default: Date.now },
            replies: [
                {
                    replierId: { type: String },
                    replier: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                    reply: { type: String },
                    replyDate: { type: Date, default: Date.now },
                    upvotedBy: [
                        {
                            upvoterId: { type: String },
                            upvoter: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
                        }
                    ],
                    downvotedBy: [
                        {
                            downvoterId: { type: String },
                            downvoter: { type: mongoose.Schema.Types.ObjectId, ref: "User" }

                        }
                    ],
                }
            ],
            upvotedBy: [
                {
                    upvoterId: { type: String },
                    upvoter: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
                }
            ],
            downvotedBy: [
                {
                    downvoterId: { type: String },
                    downvoter: { type: mongoose.Schema.Types.ObjectId, ref: "User" }

                }
            ],
        }
    ],

    // for products

    tagLine: { type: String },
    productCategory: { type: String },
    price: { type: String },
    discountedPrice: { type: String },
    discountPercentage: { type: String },

    isFree: { type: Boolean, default: false },



    // for youtube
    video_id: { type: String },
    channel_id: { type: String },
    ytlink: { type: String },




});

AllContentSchema.index({ title: 'text', description: 'text', "ratedBy.raterComment": 'text' }, { weights: { title: 10, description: 5 } })

const AllContent = models.AllContent || model('AllContent', AllContentSchema);
module.exports = AllContent