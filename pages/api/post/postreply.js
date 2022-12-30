
const connectToMongo = require('../../../db')
const AllContent = require('../../../models/AllContent')


export default async function upvote_comment(req, res) {
    await connectToMongo();
    const { postId, userId, commentId, reply } = req.body
    let addScore = await AllContent.updateOne(
        { _id: postId },
        {
            $push: {
                "ratedBy.$[elem].replies": [
                    {
                        replierId: userId,
                        replier: userId,
                        reply: reply
                    }
                ]
            }
        },
        {
            arrayFilters: [
                { "elem._id": { $eq: commentId } },
            ],
        },
    )
    res.json(addScore)


}
