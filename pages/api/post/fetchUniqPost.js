



// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const connectToMongo = require('../../../db')
const AllContent = require('../../../models/AllContent')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const JWT = "kRISHISAGOODBOYXD"


export default async function fetchfeed(req, res) {
    await connectToMongo();
    const { postId, userId } = req.body


    try {
        let findPost = await AllContent.find({ '_id': postId })
            .populate("postedBy", "username profileImg _id notificationSettings notificationToken")
            .populate("ratedBy.rater", "username profileImg _id notificationSettings notificationToken")
            .populate({
                path: 'repost',
                populate: {
                    path: "postedBy",
                    select: "username profileImg _id"
                }
            })
        res.json(findPost)
    } catch (error) {

    }



}
