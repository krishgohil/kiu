


const connectToMongo = require('../../../db')
const User = require('../../../models/User')
export default async function fetch_requests(req, res) {
    await connectToMongo();
    try {
        const { userId } = req.body
        console.log(userId)

        let fetch_requests_notis = await User.findOneAndUpdate(
            { _id: userId },
            {
                $set: {
                    notificationCount: 0
                }
            },
            { 'followRequests': 1, "notifications": 1 })
            .populate("followRequests.requester", "username profileImg name _id")
            .populate("notifications.actioner", "username profileImg name _id")
        console.log(fetch_requests_notis, 'maaaaaaaaaaaaaaaaaaaaaaaaaannnnnn')
        res.json({ finalRqsts: fetch_requests_notis.followRequests, finalNotis: fetch_requests_notis.notifications, success: 'true' })



    } catch (error) {
        console.error(error.message)

    }




}
