


// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const connectToMongo = require('../../../db')
const AllContent = require('../../../models/AllContent')


export default async function fetchreviews(req, res) {
    await connectToMongo();
    const { postId, } = req.body
    let fetchcomments = await AllContent.findOne(
        { _id: postId },
        {
            ratedBy: 1
        }
    )
        .populate("ratedBy.rater", "username profileImg _id")

    res.json(fetchcomments)
}
