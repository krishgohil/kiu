const connectToMongo = require('../../../db')
const User = require('../../../models/User')
export default async function unfollow(req, res) {
    await connectToMongo();
    const { id, toUnfollow } = req.body;

    try {
        const unfollow = await User.updateOne(
            { _id: id },
            {
                $pull: {
                    following:
                    {
                        isFollowingId: toUnfollow
                    }
                },
            }
        )

        const removerFollower = await User.updateOne(
            { _id: toUnfollow },
            {
                $pull: {
                    followers:
                    {
                        followedById: id
                    }
                },
            }
        )
        res.json('success')
    } catch (error) {
        console.log(error)
    }
}
