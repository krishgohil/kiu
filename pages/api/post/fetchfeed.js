



// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const connectToMongo = require('../../../db')
const AllContent = require('../../../models/AllContent')
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

    var tempArr = []
    try {
        for (let i = 0; i < feedPosts.length; i++) {
            console.log(feedPosts, "feedPossts")
            if (feedPosts[i].seenBy && feedPosts[i].seenBy.length > 0) {

                var exists = false
                for (let k = 0; k < feedPosts[i].seenBy.length; k++) {
                    if (feedPosts[i].seenBy[k].userId == userId) {
                        exists = true

                    }

                    if (k == (feedPosts[i].seenBy.length - 1) && exists == false) {
                        tempArr.push(feedPosts[i]._id)
                    }

                }

            } else {
                tempArr.push(feedPosts[i]._id)
            }


            if (i == (feedPosts.length - 1) && tempArr.length > 0) {
                console.log(tempArr, "tempArr")
                var feedPosts = await AllContent.updateMany(
                    { '_id': { $in: tempArr } },
                    {

                        $inc: {
                            views: 1
                        },
                        $push: {
                            seenBy:
                            {
                                userId: userId,
                                user: userId,
                            }
                        }
                    }
                )
            }
        }


    } catch (error) {
        console.error(error)
    }



}
