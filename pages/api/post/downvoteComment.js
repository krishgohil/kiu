const connectToMongo = require('../../../db')
const AllContent = require('../../../models/AllContent')
    

export default async function downvote_comment(req, res) {
    await connectToMongo();
    const { postId, userId, commentId, prevResult } = req.body
    console.log(postId, '1', userId, '2', commentId, '3', 'chhapf')

    let downvote_comment = await AllContent.updateOne(
        { _id: postId },
        {
            $push: {
                "ratedBy.$[elem].downvotedBy": [
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
            ],
        },
    )
    res.json(downvote_comment)




}
