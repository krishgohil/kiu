const connectToMongo = require('../../../db')
const AllContent = require('../../../models/AllContent')

export default async function remove_upvote_comment(req, res) {
    await connectToMongo();
    const { postId, userId, commentId, prevResult } = req.body
    console.log(postId, '1', userId, '2', commentId, '3', 'chhapf')

    console.log(prevResult)

    try {
        let remove_upvote_comment = await AllContent.updateOne(
            { _id: postId },
            {
                $pull: {
                    "ratedBy.$[elem].upvotedBy": {
                        upvoterId: userId,
                    }


                }
            },
            {
                arrayFilters: [
                    { "elem._id": { $eq: commentId } },
                ],
            },
        )

        res.json(remove_upvote_comment)


    } catch (error) {
        console.log(error)
    }



}



