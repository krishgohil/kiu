const connectToMongo = require('../../../db')
const AllContent = require('../../../models/AllContent')

export default async function remove_downvote_comment(req, res) {
    await connectToMongo();
    const { postId, userId, commentId, prevResult } = req.body
    let remove_downvote_comment = await AllContent.updateOne(
        { _id: postId },
        {
            $pull: {
                "ratedBy.$[elem].downvotedBy": {
                    downvoterId: userId,
                }


            }
        },
        {
            arrayFilters: [
                { "elem._id": { $eq: commentId } },
            ],
        },
    )
    res.json(remove_downvote_comment)



}



