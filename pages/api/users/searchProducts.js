






const connectToMongo = require('../../../db')
const User = require('../../../models/User')
const AllContent = require('../../../models/AllContent')
export default async function searchPosts(req, res) {
    await connectToMongo();
    const { input } = req.body
    console.log("ram dware tum rakhwale")
    let result = await AllContent.find(
        {
            $and: [
                { "postType": "product" },
                { $text: { $search: input } }
            ]
        }
    )
        .sort({ score: { $meta: "textScore" } })
        .populate("postedBy", "username profileImg _id notificationSettings notificationToken")


    if (result.length == 0) {
        let final = await AllContent.find({
            $and: [
                { "postType": "product" },
                {
                    "$or": [
                        { title: { '$regex': input, '$options': 'i' } },
                        { description: { '$regex': input, '$options': 'i' } },
                        { tagLine: { '$regex': input, '$options': 'i' } }
                    ]
                }
            ]

        }).sort({ title: -1, description: -1, tagLine: -1 })
            .populate("postedBy", "username profileImg _id notificationSettings notificationToken")
        console.log("jfinalyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
        res.json(final)


    } else {

        res.json(result)
    }





}
