
const connectToMongo = require('../../../db')
const AllContent = require('../../../models/AllContent')


export default async function delScore(req, res) {
    await connectToMongo();
    const { postId, replyId, commentId } = req.body
    console.log("andar da kutta haj padiye")

    let delreply = await AllContent.updateOne(
        { _id: postId },
        {
            $pull: {
                "ratedBy.$[elem].replies": {
                    _id: replyId
                }
            }
        },
        {
            arrayFilters: [
                { "elem._id": { $eq: commentId } },
            ],
        },
    )
    res.json(delreply)


}
