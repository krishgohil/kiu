






const connectToMongo = require('../../../db')
const User = require('../../../models/User')
const AllContent = require('../../../models/AllContent')
export default async function searchPosts(req, res) {
    await connectToMongo();
    const { input } = req.body

    console.log("helo")

    try {
        let result = await AllContent.find(
            {
                $and: [
                    { "postType": { $ne: "product" } },
                    { $text: { $search: input } }
                ]
            }
        )
            .sort({ score: { $meta: "textScore" } })
            .populate("postedBy", "username profileImg _id notificationSettings notificationToken")
            .populate({
                path: 'repost',
                populate: {
                    path: "postedBy",
                    select: "username profileImg _id notificationSettings notificationToken"
                }
            })

        // .sort({ title: -1, description: -1, tagLine: -1 })

        if (result.length == 0) {
            let final = await AllContent.find({

                $and: [
                    { "postType": { $ne: "product" } },
                    {
                        "$or": [
                            { title: { '$regex': input, '$options': 'i' } },
                            { description: { '$regex': input, '$options': 'i' } }
                        ]
                    }
                ]

            }).sort({ title: -1, description: -1 })
                .populate("postedBy", "username profileImg _id notificationSettings notificationToken")
                .populate({
                    path: 'repost',
                    populate: {
                        path: "postedBy",
                        select: "username profileImg _id notificationSettings notificationToken"
                    }
                    // match: { isRepost: { $eq: true } },
                    // select: 'name -_id',
                    // options: { limit: 5 }
                })
            console.log("jfinalyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
            res.json(final)


        } else {

            res.json(result)
        }

        // .exec(function(err, docs) { ... });
    } catch (error) {
        console.error(error.message)

    }





}
