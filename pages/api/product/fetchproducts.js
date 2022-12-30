






// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const connectToMongo = require('../../../db')
const Product = require('../../../models/ProductSchema')



export default async function fetchproducts(req, res) {
    await connectToMongo();
    try {
        const { skip } = req.body

        console.log('hehrehrhehrherhehkrish deepak gohi', skip)
        const products = await Product.find().sort({ date: -1 }).skip(skip).limit(100)
        // const products = await Product.find().sort({ date: -1 })
            .populate({
                path: 'product',
                populate: {
                    path: "postedBy",
                    select: "username profileImg _id notificationSettings notificationToken"
                }
            })
    
        res.json({ products })
    } catch (error) {
        console.error(error)
    }

}
