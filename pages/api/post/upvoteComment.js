// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const connectToMongo = require('../../../db')
const AllContent = require('../../../models/AllContent')


export default async function upvote_comment(req, res) {
    await connectToMongo();
    const { postId, userId, commentId } = req.body
    console.log(postId, '1', userId, '2', commentId, '3', 'chhapf')


    try {
        let upvote_comment = await AllContent.updateOne(
            { _id: postId },
            {
                $push: {
                    "ratedBy.$[elem].upvotedBy": [
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
                ],
            },
        )

        res.json(upvote_comment)


    } catch (error) {
        console.log(error)
    }

}
