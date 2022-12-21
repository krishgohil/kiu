





// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const connectToMongo = require('../../../db')
const Product = require('../../../models/ProductSchema')
const AllContent = require('../../../models/All_content')



export default async function fetchfeed(req, res) {
    await connectToMongo();
    const { productId, userId } = req.body
    try {
        let findPrdct = await AllContent.find({ '_id': productId })
            .populate("postedBy", "username profileImg _id notificationSettings notificationToken")
            .populate("ratedBy.rater", "username profileImg _id notificationSettings notificationToken")

        res.json(findPrdct)

    } catch (error) {
        console.error(error)
    }






}
