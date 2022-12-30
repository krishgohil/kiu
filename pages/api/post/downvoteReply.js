

const connectToMongo = require('../../../db')
const AllContent = require('../../../models/AllContent')


export default async function downvote_comment(req, res) {
    await connectToMongo();
    const { postId, replyId, commentId, userId } = req.body
    console.log("chale chalo")

    let downvoteReply = await AllContent.updateOne(
        { _id: postId },
        {
            $push: {
                "ratedBy.$[elem].replies.$[reply].downvotedBy": [
                    {
                        downvoterId: userId,
                        downvoter: userId
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
    res.json(downvoteReply)



}
