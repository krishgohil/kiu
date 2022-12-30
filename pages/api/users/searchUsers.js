



const connectToMongo = require('../../../db')
const User = require('../../../models/User')
export default async function searchUsers(req, res) {
    await connectToMongo();
    const { input } = req.body

    try {
        let result = await User.find({ $text: { $search: input } }, { bio: 1, name: 1, profileImg: 1, username: 1 })
            .sort({ score: { $meta: "textScore" } })

        console.log(result, "hehrhere")

        if (result.length == 0) {
            let final = await User.find({
                "$or": [
                    { name: { '$regex': input, '$options': 'i' } },
                    { username: { '$regex': input, '$options': 'i' } },
                    { bio: { '$regex': input, '$options': 'i' } },

                ]
            }).sort({ title: -1, description: -1, bio: -1 })
            console.log("jfinalyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
            res.json(final)
        } else {
            res.json(result)
        }
    } catch (error) {
        console.error(error.message)

    }




}
