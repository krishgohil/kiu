






const connectToMongo = require('../../../db')
const User = require('../../../models/User')

export default async function socialscorerdetails(req, res) {
    await connectToMongo();
    const { userId } = req.body
    var query = [
        {
            path: "postedBy",
            select: "username profileImg _id notificationSettings notificationToken"
        },
        {
            path: "repost",
            populate: {
                path: "postedBy",
                select: "username profileImg _id notificationSettings notificationToken"
            }
        }

    ]
    let fetchposts = await User.findOne(
        { _id: userId },
        {
            posts: 1
        }
    )
        .populate({
            path: 'posts.content',
            populate: query
        })

    res.json(fetchposts)

}
