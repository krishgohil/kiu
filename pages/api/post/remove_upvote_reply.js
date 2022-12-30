




const connectToMongo = require('../../../db')
const AllContent = require('../../../models/AllContent')

export default async function remove_upvote_reply(req, res) {
    await connectToMongo();
    const { postId, replyId, commentId, userId } = req.body

    let remove_upvote_reply = await AllContent.updateOne(
        { _id: postId },
        {
            $pull: {
                "ratedBy.$[elem].replies.$[reply].upvotedBy":
                {
                    upvoterId: userId,
                }

            }
        },
        {
            arrayFilters: [
                { "elem._id": { $eq: commentId } },
                { "reply._id": { $eq: replyId } }
            ],
        },
    )
    res.json(remove_upvote_reply)




}



