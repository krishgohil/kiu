



// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const connectToMongo = require('../../../db')
const AllContent = require('../../../models/All_content')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const JWT = "kRISHISAGOODBOYXD"


export default async function fetchfeed(req, res) {
    await connectToMongo();
    const { feed_postIds, userId } = req.body
    // console.log(feed_postIds)
    
    var feedDataArr = []
    // console.log(feed_postIds[0], userId)
    // console.log(userId, 'userId')
    for (let i = 0; i < feed_postIds.length; i++) {
        feedDataArr.push(feed_postIds[i].content_id)
    }
    // console.log(feedDataArr, 'llll')
    var feedPosts = await AllContent.find({ '_id': { $in: feedDataArr } }).limit(10)
        .populate("postedBy", "username profileImg _id notificationSettings notificationToken ")
        // .populate("repost");
        .populate({
            path: 'repost',
            populate: {
                path: "postedBy",
                select: "username profileImg _id"
            }
            // match: { isRepost: { $eq: true } },
            // select: 'name -_id',
            // options: { limit: 5 }
        });

    // console.log(feedPosts, 'llll')


    res.json({ feedDataArray: feedPosts })



}
