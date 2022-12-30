




const connectToMongo = require('../../../db')
const AllContent = require('../../../models/AllContent')


export default async function update_rating(req, res) {
    await connectToMongo();
    const { postId, rating, userId, hasRated, totalStarCalc, postedByNotificationSettings, postedByNotificationToken, username, postedByUserId } = req.body
    console.log(postedByNotificationSettings)
    console.log(postedByNotificationToken)
    console.log(username)


    let find = await AllContent.findOne(
        { _id: postId, "ratedBy.raterId": userId }
    )

    console.log(find)


    if (find == null) {

        let updateRating = await AllContent.updateOne(
            { _id: postId },
            {
                $push: {
                    ratedBy: {
                        starRating: rating,
                        raterId: userId,
                        rater: userId
                    }
                },
                $inc: {
                    totalStarRating: rating
                }
            }
        )
        res.json(updateRating)

        // if (postedByNotificationSettings && (postedByNotificationSettings == "true" || postedByNotificationSettings == true && postedByUserId != userId)) {
        //     if (postedByNotificationToken) {
        //         var sub = "Someone"
        //         var _body = "Tap to open"
        //         if (username && username !== undefined) {
        //             sub = username
        //         }
        //         var payload = {

        //             data: {
        //                 title: `${sub} starred your post`,
        //                 body: _body,
        //                 link: `/post/${postId}`
        //             }
        //         };

        //         var options = {
        //             priority: "high",
        //             timeToLive: 60 * 60 * 24,
        //             click_action: "/",
        //             link: "/",
        //             webpush: {
        //                 "fcm_options": {
        //                     "link": "/"
        //                 }
        //             }
        //         };


        //         admin.messaging().sendToDevice(postedByNotificationToken, payload, options)
        //             .then(function (response) {
        //                 console.log("Successfully sent message:", response);
        //             })
        //             .catch(function (error) {
        //                 console.log("Error sending message:", error);
        //             });

        //     }
        // } else {
        //     console.log(postedByNotificationSettings, "notifications not allowed")
        // }

    } else if (find != null && find.ratedBy && Array.isArray(find.ratedBy)) {
        console.log("else ran")

        for (let i = 0; i < find.ratedBy.length; i++) {
            if (userId == find.ratedBy[i].raterId) {
                console.log("parvardigara")
                let _totalStarCalc = rating - find.ratedBy[i].starRating

                let updateRating = await AllContent.updateOne(
                    { _id: postId },
                    {
                        $set: {
                            "ratedBy.$[elem]": {
                                starRating: rating,
                                raterId: userId,
                                rater: userId
                            }
                        },
                        $inc: {
                            totalStarRating: _totalStarCalc
                        }
                    },
                    {
                        arrayFilters: [
                            { "elem.raterId": { $eq: userId } },
                        ],
                    },
                )
                res.json(updateRating)
                return
            }
        }


    }






}
