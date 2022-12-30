



// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const connectToMongo = require('../../../db')
const AllContent = require('../../../models/AllContent')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const JWT = "kRISHISAGOODBOYXD"


export default async function getRecommendedPosts(req, res) {
    await connectToMongo();
    let rposts = await AllContent.find().sort({ posted_Date: -1 }).limit(50)
        .populate("postedBy", "username profileImg _id")
        .populate({
            path: 'repost',
            populate: {
                path: "postedBy",
                select: "username profileImg _id"
            }
        })
    res.json(rposts)
}
