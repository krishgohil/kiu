


// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const connectToMongo = require('../../../db')
const AllContent = require('../../../models/AllContent')


export default async function delScore(req, res) {
    await connectToMongo();
    const { postId, userId, score } = req.body

    let delScore = await AllContent.updateOne(
        { _id: postId },
        {
            $pull: {
                ratedBy:
                {
                    raterId: userId
                }
            },
            $inc: {
                totalRating: - score,
                totalRatingsLength: -1
            }
        }
    )
    res.json(delScore)
}
