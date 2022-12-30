
const connectToMongo = require('../../../db')
const User = require('../../../models/User')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const JWT = "kRISHISAGOODBOYXD"


export default async function fetchuniqueser(req, res) {
    await connectToMongo();
    let success = false;
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }

    const { email, password } = req.body;
    console.log(email, "hello", password)
    try {
        let user = await User.findOne({ email }, { logged_in: 1, password: 1, username: 1, confirmation_status: 1, email: 1, loginAttempts: 1, tempLoginBanTill: 1 });
        if (!user) {
            success = false;
            return res.status(400).json({ success, error: "Please try to login with correct credentials" })
        }

        let d = new Date()
        let b = user.tempLoginBanTill
        if (Date.parse(d) < Date.parse(b)) {
            if (user && user.loginAttempts > 10) {
                let updateLoginAttempts = {
                    loginAttempts: user.loginAttempts,
                    tempLoginBanTill: user.tempLoginBanTill
                }
                return res.status(400).json({ success, error: "Please try to login with correct credentials", updateLoginAttempts })
            }
        } else {
            console.log("Bhai kuch date ka lafda hai")
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;

            var date = new Date()
            console.log(date, "date1")
            date.setMinutes(date.getMinutes() + 30);
            console.log(date, "date2")

            if (user.loginAttempts == 10) {
                let update = await User.updateOne(
                    { email: email },
                    {
                        $inc: {
                            loginAttempts: 1
                        },
                        $set: {
                            tempLoginBanTill: date
                        }
                    }
                )
            } else {
                let update = await User.updateOne(
                    { email: email },
                    {
                        $inc: {
                            loginAttempts: 1
                        }
                    }
                )
            }


            let updateLoginAttempts = {
                loginAttempts: user.loginAttempts
            }
            return res.status(400).json({ success, error: "Please try to login with correct credentials", updateLoginAttempts })
        }

        if (user.confirmation_status !== 'confirmed') {
            console.log('asdfghbbbbbbbbbbbbbbbbbbjkl')
            return res.status(400).json({ success, error: "mail_sent" })
        }


        try {
            const loginUser = await User.updateOne({ _id: user.id },
                {
                    $set: {
                        logged_in: true,
                        loginAttempts: 0

                    }
                }
            )
            console.log(loginUser, 'loginUser')
            if (loginUser && loginUser.acknowledged == true && loginUser.matchedCount == 1) {
                const data = {
                    user: {
                        id: user.id,
                    }
                }
                const accessToken = jwt.sign(data.user.id, JWT);
                success = true;

                res.json({ success, accessToken, user })
            }
        } catch (error) {
            console.log(error)
        }


    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }




}
