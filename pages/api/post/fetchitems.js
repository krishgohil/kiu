


// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const connectToMongo = require('../../../db')
const AllContent = require('../../../models/AllContent')


export default async function fetchitems(req, res) {
    try {

        await connectToMongo();
        const { skip,category } = req.body
        console.log("skip", skip)
        const items = await AllContent.find({category:category}).sort({ date: -1 }).skip(skip).limit(20)
        res.json({ items })

    } catch (error) {
        console.error(error)
    }

}
