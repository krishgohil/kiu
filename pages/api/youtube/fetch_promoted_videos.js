



const connectToMongo = require('../../../db')
const Ytpromoted = require('../../../models/YtPromoted')



export default async function fetch_promoted_videos(req, res) {
    await connectToMongo();
    const { skip } = req.body
    console.log(skip)
    let vids = await Ytpromoted.find().sort({ date: -1 }).skip(skip).limit(20)
        .populate("postedBy", "username profileImg _id notificationSettings notificationToken")
    res.json(vids)


}
