
const connectToMongo = require('../../../db')
const User = require('../../../models/User')


export default async function postsocialscore(req, res) {
    await connectToMongo();
    const { visitedProfId, userId, score, scorerComment, scoreDifference, hasRated, notificationToken, username, notificationSettings } = req.body

    try {
        if (hasRated) {
            let updateScore = await User.updateOne(
                { _id: visitedProfId },
                {
                    $set: {
                        "socialScores.$[elem].scorerId": userId,
                        "socialScores.$[elem].scorerComment": scorerComment,
                        "socialScores.$[elem].score": score,
                    },
                    $inc: {
                        totalSocialScore: scoreDifference
                    }
                },
                {
                    arrayFilters: [
                        { "elem.scorerId": { $eq: userId } },
                    ],
                },
            )
            res.json(updateScore)



            // if (notificationSettings.socialScore && notificationToken) {

            //     var payload = {
            //         notification: {
            //             title: `${username} gave you socialscore`,
            //             body: `${scorerComment}`
            //         }
            //     };

            //     var options = {
            //         priority: "high",
            //         timeToLive: 60 * 60 * 24
            //     };


            //     admin.messaging().sendToDevice(notificationToken, payload, options)
            //         .then(function (response) {
            //             console.log(`${username} gave you socialscore`, response);
            //             res.json(response)
            //         })
            //         .catch(function (error) {
            //             console.log("Error sending message:", error);
            //         });

            // }

        } else {
            let updateScore = await User.updateOne(
                { _id: visitedProfId },
                {
                    $push: {
                        socialScores: {
                            score: score,
                            scorerId: userId,
                            scorer: userId,
                            scorerComment: scorerComment
                        }
                    },
                    $inc: {
                        totalSocialScore: scoreDifference
                    }
                }
            )
            res.json(updateScore)

            // if (notificationSettings.socialScore && notificationToken) {

            //     var payload = {
            //         notification: {
            //             title: `${username} gave you socialscore`,
            //             body: `${scorerComment}`
            //         }
            //     };

            //     var options = {
            //         priority: "high",
            //         timeToLive: 60 * 60 * 24
            //     };


            //     // admin.messaging().sendToDevice(registrationToken, payload, options)
            //     admin.messaging().sendToDevice(notificationToken, payload, options)
            //         .then(function (response) {
            //             console.log(`${username} gave you socialscore`, response);
            //             res.json(response)

            //         })
            //         .catch(function (error) {
            //             console.log("Error sending message:", error);
            //         });

            // }
        }

    } catch (error) {
        console.log(error)
    }




}
