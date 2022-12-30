




const connectToMongo = require('../../../db')
const User = require('../../../models/User')


export default async function socialscorerdetails(req, res) {
    await connectToMongo();
    const { visitedProfId, commentId } = req.body


    let showScore = await User.updateOne(
        { _id: visitedProfId },
        {
            $set: {
                "socialScores.$[elem].isHidden": false
            }
        },
        {
            arrayFilters: [
                { "elem._id": { $eq: commentId } },
            ],
        },
    )
    res.json(showScore)




}
