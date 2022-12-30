





const connectToMongo = require('../../../db')
const User = require('../../../models/User')

export default async function socialscorerdetails(req, res) {
    await connectToMongo();
    const { visitedProfId, userId, score } = req.body

    let delScore = await User.updateOne(
        { _id: visitedProfId },
        {
            $pull: {
                socialScores:
                {
                    scorerId: userId
                }
            },
            $inc: {
                totalSocialScore: - score
            }
        }
    )
    res.json(delScore)


}
