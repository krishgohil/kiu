

const connectToMongo = require('../../../db')
const User = require('../../../models/User')
export default async function unfollow(req, res) {
    await connectToMongo();
    try {
        const { requestedId, userId, notificationSettings, notificationToken, username } = req.body;
        // const follow_request = await User.findById(userId)
        // res.json(startfollowing)
        const alreadyfollowing = await User.find({
            _id: requestedId
        }).select('followRequests followers following')
        console.log(alreadyfollowing)


        var alreadyRequested = false
        var alreadyFollow = false
        var isFollowed = false



        if (alreadyfollowing.length === 1) {
            console.log(alreadyfollowing[0].followRequests)
            console.log(alreadyfollowing[0].followers)
            console.log(alreadyfollowing[0].following)


            if (alreadyfollowing[0].followRequests.length > 0) {
                for (let i = 0; i < alreadyfollowing[0].followRequests.length; i++) {
                    console.log(isFollowed)
                    console.log(alreadyFollow)

                    if (userId === alreadyfollowing[0].followRequests[i].requesterId) {
                        console.log('congratulations')
                        alreadyRequested = true
                    } else {
                        console.log(alreadyfollowing[0].followRequests[i].requesterId)
                    }

                }
            }



            if (alreadyfollowing[0].followers.length > 0 && alreadyRequested === false) {
                for (let i = 0; i < alreadyfollowing[0].followers.length; i++) {
                    if (userId === alreadyfollowing[0].followers[i].followedById) {
                        console.log('you already follow')
                        alreadyFollow = true
                    } else {
                        console.log('you dont follow')
                    }
                }
            }

            if (alreadyfollowing[0].following.length > 0) {
                for (let i = 0; i < alreadyfollowing[0].following.length; i++) {
                    if (userId === alreadyfollowing[0].following[i].isFollowingId) {
                        isFollowed = true
                    }
                }
            }

            if (alreadyRequested === false) {
                const getfollow_rqst = await User.findByIdAndUpdate(requestedId, {
                    $push: {
                        followRequests: [
                            {
                                requesterId: userId, requester: userId
                            }
                        ],
                        notifications: [
                            {
                                actionerId: userId,
                                action: 'followRqst',
                                actioner: userId
                            }
                        ]
                    },
                    $inc: {
                        notificationCount: 1
                    }
                })
                res.json('success')

                // if (notificationSettings && notificationSettings.followRequests) {
                //     if (notificationToken) {
                //         var sub = "Someone"
                //         var item = "message"
                //         var _body = "Tap to open"
                //         if (username && username !== undefined) {
                //             sub = username
                //         }

                //         var payload = {

                //             data: {
                //                 title: `${sub} requested to follow you`,
                //                 body: _body
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


                //         admin.messaging().sendToDevice(notificationToken, payload, options)
                //             .then(function (response) {
                //                 console.log("Successfully sent message:", response);
                //             })
                //             .catch(function (error) {
                //                 console.log("Error sending message:", error);
                //             });

                //     }
                // } else {
                //     console.log(notificationSettings, "notifications not allowed", data.notificationSettings.messages)
                // }


            }

        } else {
            res.json('User not Found')
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal server error")
    }



}
