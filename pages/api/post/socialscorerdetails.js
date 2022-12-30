



const connectToMongo = require('../../../db')
const User = require('../../../models/User')


export default async function socialscorerdetails(req, res) {
    await connectToMongo();
    const { visitedProfId, userId } = req.body
    try {
        let getScore = await User.findOne(
            { _id: visitedProfId }, { socialScores: 1 }
        )
            .populate("socialScores.scorer", "profileImg username")
    
        res.json(getScore)
    } catch (error) {
    
    }
    
    
}
