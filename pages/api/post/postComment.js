










// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const connectToMongo = require('../../../db')
const AllContent = require('../../../models/AllContent')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const JWT = "kRISHISAGOODBOYXD"


export default async function fetchfeed(req, res) {
    await connectToMongo();
    const { postId, userId, comment, notificationSettings, notificationToken, username } = req.body

    console.log("notificationSettings", notificationSettings)
    console.log("notificationToken", notificationToken)
    console.log("username", username)
    let postComment = await AllContent.updateOne(
        { _id: postId },
        {
            $set: {
                "ratedBy.$[elem].raterComment": comment
            }
        },
        {
            arrayFilters: [
                { "elem.raterId": { $eq: userId } },
            ],
        },
    )
    res.json(postComment)



    // if (notificationSettings && notificationSettings.comments) {
    //     if (notificationToken) {
    //         var sub = "Someone"
    //         var _body = "Tap to open"
    //         if (username && username !== undefined) {
    //             sub = username
    //         }

    //         if (comment) {
    //             _body = comment
    //         }

    //         var payload = {

    //             data: {
    //                 title: `${sub} commented on your post`,
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


    //         admin.messaging().sendToDevice(notificationToken, payload, options)
    //             .then(function (response) {
    //                 console.log("Successfully sent message:", response);
    //             })
    //             .catch(function (error) {
    //                 console.log("Error sending message:", error);
    //             });

    //     }
    // } else {
    //     console.log(notificationSettings, "notifications not allowed")
    // }



}
