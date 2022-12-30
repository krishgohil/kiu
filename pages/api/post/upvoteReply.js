
const connectToMongo = require('../../../db')
const AllContent = require('../../../models/AllContent')


export default async function upvote_reply(req, res) {
    await connectToMongo();
    const { postId, replyId, commentId, userId } = req.body
    console.log("dangal dangal")

    let upvoteReply = await AllContent.updateOne(
        { _id: postId },
        {
            $push: {
                "ratedBy.$[elem].replies.$[reply].upvotedBy": [
                    {
                        upvoterId: userId,
                        upvoter: userId
                    }
                ]
            }
        },
        {
            arrayFilters: [
                { "elem._id": { $eq: commentId } },
                { "reply._id": { $eq: replyId } }
            ],
        },
    )
    res.json(upvoteReply)



}
