const connectToMongo = require('../../../db')
const AllContent = require('../../../models/AllContent')


export default async function fetchreplies(req, res) {
    const { postId, userId, commentId } = req.body
    let fetchreplies = await AllContent.findOne(
        { _id: postId },
        {
            ratedBy: 1
        }
    )
        .populate(
            {
                path: 'ratedBy.replies',
                populate: {
                    path: "replier",
                    select: "username profileImg _id"
                },
                match: { 'ratedBy._id': commentId },

            }
        )
    res.json(fetchreplies)

}