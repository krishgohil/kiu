


const connectToMongo = require('../../../db')
const User = require('../../../models/User')
export default async function unfollow(req, res) {
    await connectToMongo();
    const { id, toCancelFrom } = req.body;


    try {
        const cancelRequest = await User.updateOne(
            { _id: toCancelFrom },
            {
                $pull: {
                    followRequests: {
                        requesterId: id
                    },
                    notifications: {
                        actionerId: id
                    }
                }

            }
        )


        res.json('success')
    } catch (error) {

        console.log(error)

    }






}
