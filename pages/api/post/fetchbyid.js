


// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const connectToMongo = require('../../../db')
const AllContent = require('../../../models/AllContent')


export default async function fetchbyid(req, res) {
    try {

        await connectToMongo();
        const { _id } = req.body
        console.log("_id", _id)
        const result = await AllContent.findOne({_id:_id})
        res.json({ result })

    } catch (error) {
        console.error(error)
    }

}
