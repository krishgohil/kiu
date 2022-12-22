import React, { useRef, useState, useEffect } from 'react'
import { MdOutlineLink, MdPermMedia } from 'react-icons/md'
import { AiOutlineCamera, AiOutlineClose } from 'react-icons/ai'
import { FaPollH, FaUserCircle } from 'react-icons/fa'
import TextareaAutosize from 'react-textarea-autosize';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { DateTime } from 'luxon'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { toast } from 'react-toastify'
import { host } from '../host'
import { useAppContext } from '../context';
import { useRouter } from 'next/router';





const Post = ({ handlecancel }) => {
    const router = useRouter()
    const context = useAppContext()
    const { username, _id, profileImg } = context.sharedState
    const [freeze, setfreeze] = useState(false)
    const [img, setimg] = useState({ profileImg: '' })
    const [hasChangedImage, sethasChangedImage] = useState(false)
    const [credentials, setcredentials] = useState({ description: "", title: "", link: "", category: "" })

    const [postimg, setpostimg] = useState([])
    const [productInfo, setproductInfo] = useState({ description: "", name: "", tagLine: "", productCategory: "", link: "" })

    const [showpreview, setshowpreview] = useState(false)

    const [templink, settemplink] = useState('')
    const [isLink, setisLink] = useState(false)


    const [fruit, setfruit] = useState(0)

    const hi = useRef()
    const ref = useRef()
    const productRef = useRef()


    const otherRef = useRef()
    const [showLinkInput, setshowLinkInput] = useState(false)

    const [showPoll, setshowPoll] = useState(false)
    const [pollOptions, setpollOptions] = useState(2)

    const [optionOne, setoptionOne] = useState('')
    const [optionTwo, setoptionTwo] = useState('')
    const [optionThree, setoptionThree] = useState('')
    const [optionFour, setoptionFour] = useState('')
    const [price, setprice] = useState(0)
    const [discountedPrice, setdiscountedPrice] = useState(0)
    const [changeImgs, setchangeImgs] = useState(false)
    const [oldImgs, setoldImgs] = useState([])
    const [editingImg, seteditingImg] = useState(false)

    const [draggable_id, setdraggable_id] = useState("")


    useEffect(() => {
        console.log(postimg, "dhadkan", editingImg)
    }, [editingImg, draggable_id])

    const category = "home"

    const editProduct = {
        status: false
    }
    useEffect(() => {

        console.log(category)
        if (category !== 'home') {
            // console.log("1")
            if (category == 'product') {
                // console.log("2")

                if (repost && repost.status == true) {
                    setcredentials({ ...credentials, category: 'personal' })
                } else {
                    setcredentials({ ...credentials, category: 'product' })

                }


            } else {
                // console.log("3")
                setcredentials({ ...credentials, category: category })

            }
        }
        else if (category == "home" && editProduct.status == true) {
            console.log("4")

            if (editProduct.productId && editProduct.productId.length == 24) {
                dispatch(fetchUniqPost(editProduct.productId))

            }        // alert()
            setcredentials({ ...credentials, category: 'product' })

        }

        else {
            setcredentials({ ...credentials, category: 'personal' })
        }
    }, []);



    const fetchUniqPost = (id) => async dispatch => {

        console.log('FEETCH UNIQ POST', id)
        try {

            const response = await fetch(`${host}/api/product/fetchUniqProduct`, {
                // const response = await fetch("${host}/api/post/fetchUniqPost", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId: id }),
            })
            const json = await response.json();
            console.log(json)

            setproductInfo({ description: json[0].description, name: json[0].title, tagLine: json[0].tagLine, productCategory: json[0].productCategory, link: json[0].link })
            setpostimg(json[0].postimg)
            setprice(json[0].price)
            setdiscountedPrice(json[0].discountedPrice)

        } catch (error) {

        }
    }
































    const addProductImg = () => {
        if (postimg.length > 9) {
            toast.info('Cannot add more than 10 photos', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark'

            })

        } else {
            productRef.current.click()
        }
    }

    const handleImgClick = () => {

        setshowPoll(false)
        setpollOptions(2)


        if (postimg.length > 9) {
            toast.info('Cannot add more than 10 photos', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark'

            })

        } else {
            setshowpreview(true)
            ref.current.click()
        }



    }












    const showLinkInputFunc = () => {
        setshowLinkInput(true)
    }


    const validURL = (str) => {
        console.log(str)
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        console.log(!!pattern.test(str))
        if (!!pattern.test(str) == true) {
            // setlink(str)
            setisLink(true)
        }
        else if (!!pattern.test(str) == false) {
            console.log('false hai enterred')
            // console.log(link.length)
            setisLink(false)
        }
        setcredentials({ ...credentials, link: str })


    }

    const onchangelink = (e) => {
        settemplink(e.target.value)
        validURL(e.target.value)
    }






    //----------------------------------------------------------------------------------------------------------------------



    useEffect(() => {
        console.log("ksdjfksjfklsjf", credentials.category)
    }, [credentials.category])




    const onchangeFunc = (e) => {
        console.log("fksjkfk")
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    }


    const onFileChange = (e) => {
        console.log('ON FIILE  CHANGE')
        console.log(e.target.files[0])
        setimg({ ...img, profileImg: e.target.files[0] })
    }




    const onImgChange = (e) => {
        console.log(postimg, 'on img change', e.target.files.length)

        let p = postimg
        let l = e.target.files
        console.log(p.length)
        console.log(l.length)

        let final
        for (let i = 0; i < l.length; i++) {
            p.push(l[i])
        }
        console.log(p.length)
        if (p.length > 10) {
            p.length = 10
            toast.info('Cannot add more than 10 photos', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark'

            })
            setfruit(fruit + 1)
            final = p
            setpostimg(final)
        } else {
            setfruit(fruit + 1)
            final = p
            setpostimg(final)
        }

    }

    const setImgFunc = (image, index) => {
        console.log(postimg)
        console.log(index)
        console.log(image)
        let arr = []
        for (let i = 0; i < postimg.length; i++) {

            if (i == index) {
                arr.push(image)
            } else {
                arr.push(postimg[i])
            }

        }
        setpostimg(arr)
        // setcredentials({ ...credentials, postimg: image })
    }



    async function handleSubmit(e) {
        e.preventDefault();
        const { _name, _email, password, bio, profileImg, username } = credentials;
        console.log(username)
        console.log(_name)
        let checkusername = username.match(/\s/g)
        let email = _email.toLowerCase()
        let _nametouppercase = _name.toUpperCase()
        let withoutspacename = _nametouppercase.replace(/\s\s+/g, ' ')
        console.log(withoutspacename)
        let name = withoutspacename
        console.log(email)
        console.log(name)
        let checkemail = email.match(/\s/g)

        console.log(checkusername)
        if (checkusername) {
            alert('Spaces are not allowed in username')
        }
        else if (checkemail) {
            alert('Spaces are not allowed in email')
        }
    }

    const save = () => {
        setfreeze(true)
        if (showPoll == false) {
            console.log(showPoll, 'new_post')

            new_post()
        } else if (showPoll == true) {
            console.log(showPoll, 'showoll')

            dispatch(newpoll())
        }
        // console.log(postimg, 'postimg')
        // console.log(credentials.description, 'credentials.description')
        // console.log(credentials.title, 'credentials.title')


        // newpostwithimg()

        // console.log(credentials.description)
        // console.log(credentials.postimg)
        // console.log('e kunal')
        // console.log(optionOne, '1')
        // console.log(optionTwo, '2')
        // console.log(optionThree, '3')
        // console.log(optionFour, '4')
        // if (postimg.length < 1 && showPoll == false) {
        //     dispatch(newpost())
        // }
        // else if (postimg.length > 0 && showPoll == false) {
        //     newpostwithimg()
        // }
        // else if (showPoll == true) {
        //     console.log('bddcdz')
        //     dispatch(newpoll())

        // }

    }

    // /#[a-z0-9_]+/g
    function linkify(text) {
        var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        return text.replace(urlRegex, function (url) {
            return '<a href=" ' + url + '" class="textAnker" " target=_blank">' + url + '</a>';
        });
    }
    function hashify(text) {
        var urlRegex = /#[a-z0-9_]+/g;
        return text.replace(urlRegex, function (url) {
            return '<span  class="texthash"  >' + url + '</span>';
        });
    }

    function atSignify(text) {
        var urlRegex = /@[a-z0-9_]+/g;
        return text.replace(urlRegex, function (url) {
            return '<span  class="textuser"  >' + url + '</span>';
        });
    }

    async function new_post(e) {

        var _link
        var _description
        var _title
        if (credentials.description == null || credentials.description == undefined) {
            _description = ""
        } else { _description = credentials.description }

        if (credentials.title == null || credentials.title == undefined) {
            _title = ""
        } else { _title = credentials.title }


        if (credentials.link == null || credentials.link == undefined) {
            _link = ""
        } else { _link = credentials.link }

        _description = linkify(_description)
        _description = hashify(_description)
        _description = atSignify(_description)
        console.log(_description)

        let withoutspacetitle = _title.replace(/\s\s+/g, ' ')
        let withoutspacedesc = _description.replace(/\s\s+/g, ' ')
        // alert(credentials.category)

        console.log(repost)

        if (withoutspacetitle.length < 1 && credentials.category !== "personal") {
            setfreeze(false)
            return (
                toast.error('Title cannot be empty', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark'

                })
            )
        }
        if (withoutspacedesc.length < 1) {
            setfreeze(false)

            return (
                toast.error('Description cannot be empty', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark'

                })
            )
        }







        console.log(postimg, 'postimg')
        console.log(credentials.description, 'credentials.description', _description, "d")
        console.log(credentials.title, 'credentials.title', _title, "t")
        console.log(credentials.category, 'credentials.category', _link, "l")

        let formData = new FormData();


        formData.append('id', userId);
        formData.append('description', _description);
        formData.append('link', _link);
        formData.append('title', _title);
        formData.append('category', credentials.category);
        if (repost.status == true) {
            formData.append('isRepost', true);
            if (repost.p_id) {
                console.log('dekh me loyal hu', repost.p_id)

                formData.append('repostId', repost.p_id);
                formData.append('reposts_notificationSettings', repost.pnotificationSettings.reposts);
                formData.append('notificationToken', repost.pnotificationToken);
                formData.append('username', username);

            }
            if (repost.isYtpost) {
                console.log('idhar hai aapun mamu', repost.yturl)
                formData.append('ytlink', repost.yturl);
            }
        }
        console.log("photo", postimg.length)

        for (let i = 0; i < postimg.length; i++) {
            console.log("photo", postimg[i])
            formData.append('photo', postimg[i]);

        }
        var post_type
        if (postimg.length > 0) {
            console.log("media")
            post_type = 'media'
        } else {
            console.log("kwik")

            post_type = 'kwik'
        }

        formData.append('post_type', post_type);
        console.log(formData)

        const response = await fetch(`${host}/api/post/newpost`, {
            method: 'PUT',

            body: formData
        });
        const json = await response.json();
        console.log(json)
        if (json.result === 'success') {
            toast.success('Posted Successfully', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark'

            })
            handlecancel()
            setfreeze(false)
            if (repost.status == true) {
                dispatch({
                    type: SET_REPOSTED_POSTS,
                    payload: {
                        postId: repost.p_id,
                        repostCount: repost.p_repostCount,
                        repost: true
                    }
                })
            }

            let obj = json.post
            obj.postedBy = {
                _id: _id,
                notificationSettings: notificationSettings,
                username: username,
                profileImg: profileImg,
                notificationToken: notificationToken,
            }

            dispatch({
                type: SET_NEW_POST,
                payload: obj
            })
        } else {
            setfreeze(false)
            toast.warn('Oops Something went wrong', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark'

            })
        }
    }

    const newpoll = () => async dispatch => {
        var _description
        var _title
        var _link
        if (credentials.description == null || credentials.description == undefined) {
            _description = ""
        } else { _description = credentials.description }

        if (credentials.title == null || credentials.title == undefined) {
            _title = ""
        } else { _title = credentials.title }

        if (credentials.link == null || credentials.link == undefined) {
            _link = ""
        } else { _link = credentials.link }
        console.log(credentials.description, 'credentials.description', _description, "d")
        console.log(credentials.title, 'credentials.title', _title, "t")
        console.log(credentials.category, 'credentials.category', _link, "l")
        const response = await fetch(`${host}/api/post/newpoll`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: _title, description: _description, optionFour, optionThree, optionOne, optionTwo, id: userId, category: credentials.category, link: _link }),
        });
        const json = await response.json();
        console.log(json)
        if (json.result === 'success') {
            toast.success('Posted Successfully', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark'

            })
            handlecancel()
            setfreeze(false)
        } else {
            setfreeze(false)
        }

    }


    const newpost = () => async dispatch => {
        const response = await fetch(`${host}/api/post/newpost`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ description: credentials.description, postimg: credentials.postimg, id: userId }),
        });
        const json = await response.json();
        console.log(json)
        if (json === 'success') {
            handlecancel()
        }

    }





    async function newpostwithimg(e) {
        console.log(postimg.length)
        let formData = new FormData();
        formData.append('id', userId);
        formData.append('description', credentials.description);
        for (let i = 0; i < postimg.length; i++) {
            formData.append('photo', postimg[i]);

        }
        // formData.append('avatar', postimg);
        console.log(formData)
        const response = await fetch(`${host}/api/post/newpostwithimg`, {
            method: 'PUT',
            // headers: {
            //     'Content-Type': 'application/json',
            // },
            // body: JSON.stringify({ description: credentials.description, id: userId }),
            body: formData
            // ({ postimg: postimg })
        });
        const json = await response.json();
        console.log(json)
        if (json === 'success') {
            handlecancel()
        }
        // const formData = new FormData()
        // if (postimg.length > 0) {

        //     formData.append('profileImg', postimg)
        //     formData.append('token', 'efghi')
        //     formData.append('id', userId);
        //     formData.append('description', credentials.description);
        //     axios.post(`${host}/post/newpostwithimg`, formData, {
        //     }).then(res => {
        //         console.log(res, 'idhar hai')
        //         handlecancel()

        //     })
        // }
    }

    // const changepostType = () => {
    //     setpersonalpost(true)
    //     setreview(false)
    //     settitle('')
    //     setdescription('')
    //     setrowsize(1)
    // }

    const delImg = () => {
        setcredentials({ ...credentials, postimg: '' })
        setshowpreview(false)
        setimg({ ...img, profileImg: '' })
    }


    const handlePoll = () => {
        setpostimg([])
        setshowPoll(true)

    }



    // product 
    useEffect(() => {
        if (postimg.length > 0) {
            setTimeout(() => {
                hi.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
            console.log('change kiya')
        }
    }, [fruit])





    const onchange = (e) => {
        if (e.target.name == "name" && editProduct && editProduct.status == true) {
            toast.warn('Product Name cannot be changed', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            })
        } else {

            setproductInfo({ ...productInfo, [e.target.name]: e.target.value });
        }

    }



    async function newproduct(e) {
        setfreeze(true)



        // console.log(postimg.length, 'postimg', postimg)
        // console.log('id', userId)
        // console.log('description', productInfo.description)
        // console.log('name', productInfo.name)
        // console.log('tagLine', productInfo.tagLine)
        // console.log('link', productInfo.link)
        // console.log('productCategory', productInfo.productCategory)
        let _name = productInfo.name
        let _description = productInfo.description
        let _tagline = productInfo.tagLine
        let withoutspacename = _name.replace(/\s\s+/g, ' ')
        let withoutspacedesc = _description.replace(/\s\s+/g, ' ')
        let withoutspacetagline = _tagline.replace(/\s\s+/g, ' ')

        if (withoutspacename.length < 1) {
            setfreeze(false)
            return (
                toast.error('Product Name cannot be empty', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark"
                })
            )

        }
        if (withoutspacedesc.length < 1) {
            setfreeze(false)
            return (
                toast.error('Product Description cannot be empty', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark"
                })
            )

        }

        if (withoutspacetagline.length < 1) {
            setfreeze(false)
            return (
                toast.error('Product Tagline cannot be empty', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark"
                })
            )

        }

        if (postimg.length == 0) {
            setfreeze(false)
            return (
                toast.error('Atleast One Image should be uploaded', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark"
                })
            )
        }

        let p = parseInt(price, 10)
        let dp = parseInt(discountedPrice, 10)
        if (p < dp) {
            return (
                toast.warn('Discount Price should be lower than original Price', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark'
                })
            )
        }


        console.log(postimg)
        console.log(productInfo.name)





        let formData = new FormData();
        formData.append('id', userId);
        formData.append('description', productInfo.description);
        formData.append('link', productInfo.link);
        formData.append('name', productInfo.name);
        formData.append('tagLine', productInfo.tagLine);
        formData.append('productCategory', productInfo.productCategory);
        formData.append('price', price);
        formData.append('discountedPrice', discountedPrice);
        formData.append('changeImgs', changeImgs);
        for (let i = 0; i < postimg.length; i++) {
            formData.append('photo', postimg[i]);
        }


        if (editProduct && editProduct.status == false) {
            const response = await fetch(`${host}/api/product/newproduct`, {
                method: 'PUT',

                body: formData
            });
            const json = await response.json();
            console.log(json)
            if (json.result === 'success') {


                toast.success('Posted Successfully', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark'

                })
                handlecancel()
                setfreeze(false)


                let obj = json.post
                obj.postedBy = {
                    _id: _id,
                    notificationSettings: notificationSettings,
                    username: username,
                    profileImg: profileImg,
                    notificationToken: notificationToken,
                }
                dispatch({
                    type: SET_NEW_POST,
                    payload: obj
                })
            } else {
                setfreeze(false)
            }
        } else if (editProduct && editProduct.status == true) {
            if (oldImgs.length > 0) {
                for (let ol = 0; ol < oldImgs.length; ol++) {
                    formData.append('oldImgs', oldImgs[ol]);

                }
            }
            formData.append('productId', editProduct.productId);

            const response = await fetch(`${host}/api/product/editproduct`, {
                method: 'PUT',

                body: formData
            });
            const json = await response.json();
            console.log(json)
            if (json === 'success') {
                handlecancel()
                setfreeze(false)
            } else {
                setfreeze(false)
            }
        }


    }


    function handleOnDragEnd(result) {
        if (!result.destination) return;

        const arr = [...postimg];

        //Changing the position of Array element
        let removedItem = arr.splice(result.source.index, 1)[0];
        arr.splice(result.destination.index, 0, removedItem);

        //Updating the list
        setpostimg(arr);
    }
    const removePhoto = (e) => {
        let arr = postimg
        if (e > -1) { // only splice array when item is found

            arr.splice(e, 1); // 2nd parameter means remove one item only
            setpostimg(arr)
            setfruit(fruit + 1)
        }
        console.log(e)
    }


    const closeRepost = () => {
        dispatch({
            type: SET_REPOST,
            payload: {
                status: false,
                description: '',
                postimg: '',
                pUsername: '',
                pProfileImg: '',
                pDate: '',
            }
        })
    }

    const setDiscpFunc = (e) => {
        console.log(e.target.value, "etv",)
        var dp
        if (e.target.value == "") {
            dp = 0
            setdiscountedPrice(e.target.value)

            // setdiscountedPrice(dp)
        } else {
            dp = parseInt(e.target.value, 10)
            let p = parseInt(price, 10)
            console.log(dp, "op", p)

            if (dp < p) {
                // console.log(e.target.value, "op", price)
                // console.log(typeof price)
                // console.log(typeof e.target.value)
                setdiscountedPrice(e.target.value)
            } else {
                toast.warn('Discount Price should be lower than original Price', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark'
                })
            }
        }


    }



    const editChangeImgsFunc = () => {
        if (changeImgs) {
            setchangeImgs(false)
            setpostimg(oldImgs)
        } else {
            setoldImgs(postimg)
            setpostimg([])
            setchangeImgs(true)
        }
    }

    return (
        <>

            {
                credentials.category == 'product' ?
                    <div className='launchProduct' >

                        <div className='postUser'>
                            <div style={{ display: 'flex', alignItems: "center", }}  >
                                <img alt="img"
                                    style={{
                                        width: '2.5rem', borderRadius: '50%', marginLeft: '0.25rem'
                                    }} src={profileImg} />
                                <span style={{ fontSize: "1rem", marginLeft: '0.5rem', }} className='gotoProf'  >
                                    {username}
                                </span>

                            </div>
                            <div style={{ display: "flex", alignItems: "center", }} >
                                <select value={credentials.category} name='category' onChange={onchangeFunc} id="" style={{ outline: "none", backgroundColor: "#19191a", color: "silver", margin: '0.5rem', padding: "0.5rem", border: '1px solid #363636', borderRadius: "1rem", fontSize: "14px" }} >
                                    <option value="books">books</option>
                                    <option value="crypto">crypto</option>
                                    <option value="fun">fun</option>
                                    <option value="movies">movies</option>
                                    <option value="news">news</option>
                                    <option value="sports">sports</option>
                                    <option value="personal">personal</option>
                                    <option value="product">product 🚀</option>
                                    <option value="stocks">stocks</option>
                                    <option value="science-tech">science-tech</option>
                                    <option value="youtube">youtube</option>

                                </select>
                            </div>
                            <div>
                                <AiOutlineClose size={28} onClick={()=>router.back()} style={{ marginBottom: '0.4rem' }} className='cancelIcon' />
                            </div>
                        </div>
                        <h5 style={{ margin: "1rem 0.5rem 1rem 0", color: "#c7c6c5" }} >
                            PRODUCT INFORMATION
                        </h5>
                        <div style={{ margin: "0.5rem 0", color: "#c7c6c5" }} >

                            <div style={{ margin: "0.5rem" }} >
                                <div > Product Name </div>
                                <input name='name' onChange={onchange} value={productInfo.name} type="text" style={{ padding: "0.5rem", outline: "none", border: "1px solid #363636", backgroundColor: "#16181b", width: "100%", caretColor: 'white ', color: "white", fontWeight: "500", borderRadius: '0.5rem', margin: "0.5rem 0" }} maxLength='100' placeholder='eg: Anna Shoes' />
                            </div>
                            <div style={{ margin: "0.5rem" }} >
                                <div > Tag Line </div>
                                <input value={productInfo.tagLine} name='tagLine' onChange={onchange} type="text" style={{ padding: "0.5rem", outline: "none", border: "1px solid #363636", backgroundColor: "#16181b", width: "100%", caretColor: 'white ', color: "white", borderRadius: '0.5rem', margin: "0.5rem 0" }} maxLength='70' placeholder='eg: Shoes for every place you need to go to' />
                            </div>

                            <div style={{ margin: "0.5rem" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <div>
                                        Product Image
                                    </div>
                                    {
                                        editProduct && editProduct.status == true && !changeImgs ?

                                            <button style={{ border: "none", fontSize: "14px", padding: "0.25rem 0.5rem", borderRadius: "0.5rem", backgroundColor: "#3d3d3d", color: "white", border: "1px solid black" }} onClick={editChangeImgsFunc} >
                                                Change
                                            </button>

                                            : ''
                                    }
                                    {
                                        editProduct && editProduct.status == true && changeImgs ?

                                            <button style={{ border: "none", fontSize: "14px", padding: "0.25rem 0.5rem", borderRadius: "0.5rem", backgroundColor: "#3d3d3d", color: "white", border: "1px solid #824848" }} onClick={editChangeImgsFunc} >
                                                Cancel
                                            </button>
                                            : ""

                                    }

                                </div>
                                <div className='selectedImgsMain' style={{ display: "flex", }} >
                                    {
                                        editProduct && editProduct.status == true && !changeImgs ?
                                            "" :
                                            <div onClick={addProductImg} style={{ width: "10rem", border: "1px solid #48494a", display: "flex", justifyContent: "center", marginTop: "0.5rem", alignItems: 'center' }} >
                                                <input accept="image/png, image/jpg, image/jpeg" onChange={onImgChange} multiple type="file" style={{ display: "none" }} ref={productRef}  >
                                                </input>

                                                <div style={{}} >
                                                    <AiOutlineCamera size={100} />
                                                </div>
                                            </div>
                                    }



                                    {
                                        postimg.length > 0 ?
                                            <DragDropContext onDragEnd={editProduct && editProduct.status == true && !changeImgs ? "" : handleOnDragEnd}>

                                                <Droppable droppableId="characters" direction="horizontal" >
                                                    {(provided) => (
                                                        <>
                                                            <div className='selectedImgs' style={{ width: "100%", overflowX: "scroll", scrollMargin: 0, display: "flex", padding: "0.5rem", border: "1px solid #48494a", marginTop: "0.5rem", alignItems: "" }}   {...provided.droppableProps} ref={provided.innerRef}>
                                                                {postimg.map((rev, i) => {
                                                                    return (

                                                                        <Draggable key={rev.name ? rev.name : rev} draggableId={rev.name ? rev.name : rev} index={i}>
                                                                            {(provided) => (
                                                                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                                                                                    <div onClick={() => { removePhoto(i) }} style={{ margin: " 0 0rem", top: '12px', position: 'relative', cursor: "pointer" }} >

                                                                                        {
                                                                                            editProduct && editProduct.status == true && !changeImgs ?
                                                                                                "" :
                                                                                                <AiOutlineClose color='white' size={20} />
                                                                                        }

                                                                                    </div>
                                                                                    <img alt="img" key={i} id={i} src={typeof rev != 'string' ? URL.createObjectURL(rev) : rev} style={{ width: "10rem", margin: " 0 0.5rem", }} />

                                                                                </div>


                                                                            )}
                                                                        </Draggable>
                                                                    );
                                                                })}
                                                                {provided.placeholder}
                                                            </div>

                                                        </>


                                                    )}
                                                </Droppable>

                                            </DragDropContext>
                                            : ""
                                    }





                                </div>


                            </div>



                            <div style={{ display: "flex", alignItems: "center", margin: "0.5rem" }} >
                                <div>Product Category :</div>
                                <select value={productInfo.productCategory} name='productCategory' onChange={onchange} id="" style={{ outline: "none", backgroundColor: "#16181b", color: "white", margin: '0.5rem', padding: "0.5rem", border: '1px solid #363636' }} >
                                    <option value="Apparels">Apparels</option>
                                    <option value="Educational">Educational</option>
                                    <option value="Electronics">Electronics</option>
                                    <option value="Footwear">Footwear</option>
                                    <option value="Food Items">Food Items</option>
                                    <option value="Jewellery">Jewellery</option>
                                    <option value="Books/Stationary">Books/Stationary</option>
                                    <option value="Mobile Phones">Mobile Phones</option>
                                    <option value="Mobile Application">Mobile Application</option>
                                    <option value="Fashion Accessories">Fashion Accessories</option>
                                    <option value="Home Decor">Home Decor</option>
                                    <option value="Toys and games">Toys & games</option>
                                    <option value="Sports Fitness">Sports-Fitness</option>
                                    <option value="Subscriptions">Subscriptions</option>
                                    <option value="Software Service">Software Service</option>
                                    <option value="Website">Website</option>
                                </select>
                            </div>


                            <div className='lkkjlsfs' style={{ margin: '0.5rem', display: "flex" }} >
                                <div style={{ flex: 0.4, marginTop: "0.5rem" }} >

                                    <div> Price :</div>
                                    <div style={{ border: '1px solid #363636', padding: "0.25rem", }} >
                                        <span>
                                            ₹
                                        </span>
                                        <input onChange={(e) => setprice(e.target.value)} value={price} type="number" style={{ border: "none", outline: 'none', backgroundColor: "#16181b", color: "white", caretColor: "white ", marginLeft: "0.5rem" }} min="0" />
                                    </div>
                                </div>

                                <div style={{ flex: 0.1 }} >

                                </div>

                                <div style={{ flex: 0.4, marginTop: "0.5rem" }} >

                                    <div> Discounted Price :</div>
                                    <div style={{ border: '1px solid #363636', padding: "0.25rem", }} >
                                        <span>
                                            ₹
                                        </span>
                                        <input onChange={setDiscpFunc} value={discountedPrice} type="number" style={{ border: "none", outline: 'none', backgroundColor: "#16181b", color: "white", caretColor: "white ", marginLeft: "0.5rem" }} />
                                    </div>
                                </div>
                            </div>


                            <div style={{ margin: " 1.5rem 0rem" }}>

                                <span style={{ margin: "0.5rem", fontWeight: "500", color: "white" }} >Price :</span>
                                {
                                    discountedPrice == 0 || discountedPrice == "" ?
                                        <span className='pmprice' style={{ color: "white" }} >
                                            Free
                                        </span  > :
                                        <>
                                            <span style={{ color: "white" }} >₹</span>
                                            <span style={{ color: "white", marginRight: "0.5rem" }} >{discountedPrice}</span >
                                            <s> <span style={{}} >₹</span> {price}</s>
                                        </>


                                }

                            </div>



                            <div style={{ margin: " 1.5rem 0.5rem" }} >
                                <div> Product Description </div>

                                <TextareaAutosize value={productInfo.description} onChange={onchange} minRows={3} maxRows={5}
                                    // value={message}
                                    style={{ resize: 'none', outline: 'none', padding: '0.5rem', backgroundColor: "#16181b", caretColor: "white ", color: "white", border: '1px solid #363636', borderRadius: "0.5rem", width: '100%', marginTop: '0.5rem' }} name="description" placeholder='Description of your product' >

                                </TextareaAutosize>
                            </div>

                            <div style={{ margin: "0.5rem" }} >
                                <div> Product Website Link</div>
                                <input value={productInfo.link} name='link' onChange={onchange} type="text" style={{ padding: "0.5rem", outline: "none", border: "1px solid #363636", backgroundColor: "#16181b", width: "100%", caretColor: 'white ', color: "white", borderRadius: '0.5rem', margin: "0.5rem 0" }} placeholder='optional' />

                            </div>
                        </div>
                        <div  >


                        </div>



                        <div className='launchProductBtn'  >
                            <button onClick={newproduct} disabled={freeze ? true : false} className={freeze ? 'postbtn postbtndisabled' : 'postbtn'} style={{ border: "none", padding: "0.5rem 1rem", borderRadius: '1rem', color: "white", }} >
                                {editProduct && editProduct.status == true ? "Edit" : "Launch"} Product
                            </button>
                        </div>

                    </div>
                    : ''
            }









            {
                credentials.category != 'product' ?

                    <div className='postdiv'>

                        <div className='postUser' >
                            <div style={{ display: 'flex', alignItems: 'center' }}>

                                {
                                    profileImg !== '' ?
                                        <img alt="img" src={profileImg} style={{ height: '2.5rem', width: '2.5rem', borderRadius: '50%', marginRight: '0.6rem', cursor: 'pointer', marginLeft: "0.5rem" }} ></img>
                                        : <FaUserCircle style={{ height: '2.5rem', width: '2.5rem', cursor: "pointer", marginLeft: '1rem', borderRadius: '50%' }} />
                                }

                                <p style={{ marginBottom: 0, fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', color: 'white' }} >
                                    {username}</p>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", margin: "0.5rem" }} >
                                <select value={credentials.category} name='category' onChange={onchangeFunc} id="" style={{ outline: "none", backgroundColor: "#19191a", color: "silver", margin: '0.5rem', padding: "0.5rem", border: '1px solid #363636', borderRadius: "1rem", fontSize: "14px" }} >
                                    <option value="books">books</option>
                                    <option value="crypto">crypto</option>
                                    <option value="fun">fun</option>
                                    <option value="movies">movies</option>
                                    <option value="news">news</option>
                                    <option value="sports">sports</option>
                                    <option value="personal">personal</option>
                                    {/* {
                                            repost.status == false ?
                                                <option value="product">product 🚀</option>
                                                : ""
                                        } */}
                                    <option value="stocks">stocks</option>
                                    <option value="science-tech">science-tech</option>
                                    <option value="youtube">youtube</option>

                                </select>
                            </div>
                            <div className='cancel'  >
                                <AiOutlineClose size={28} onClick={()=>router.back()} style={{ marginBottom: '0.4rem' }} className='cancelIcon' />
                            </div>
                        </div>

                        <div className='postinfo'>
                            {
                                credentials.category != 'personal' ?
                                    <input value={credentials.title} name='title' required pattern="[a-zA-Z0-9 ]+" onChange={onchangeFunc} type="text" style={{ padding: "0.5rem", outline: "none", border: "1px solid #363636", backgroundColor: "#16181b", width: "100%", caretColor: 'white ', color: "white", fontWeight: "500", borderRadius: '0.5rem', margin: "0.5rem 0" }} maxLength='100' placeholder='Title of your post' /> : ""
                            }


                            <TextareaAutosize onChange={onchangeFunc} minRows={showPoll ? 1 : 3} maxRows={5}
                                // value={message} 
                                required pattern="[a-zA-Z0-9 ]+"
                                value={credentials.description}
                                style={{ resize: 'none', outline: 'none', padding: '0.5rem', backgroundColor: "#16181b", caretColor: "white ", color: "white", border: '1px solid #363636', borderRadius: "0.5rem", width: '100%', margin: '0.5rem 0' }} name="description" placeholder={showPoll ? 'Poll question' : 'Express your thoughts ...'} >

                            </TextareaAutosize>

                            {
                                showPoll ?
                                    <>
                                        <input onChange={(e) => setoptionOne(e.target.value)} placeholder="Option 1"
                                            style={{
                                                width: "100%", backgroundColor: "black", padding: "0.5rem", marginBottom: "0.5rem", borderRadius: "1rem",
                                                border: "1px solid #3f5958",
                                                display: "flex", justifyContent: "space-between", outline: "none", color: 'white',
                                            }} >

                                        </input>
                                        <input onChange={(e) => setoptionTwo(e.target.value)} placeholder="Option 2"
                                            style={{
                                                width: "100%", backgroundColor: "black", padding: "0.5rem", marginBottom: "0.5rem", borderRadius: "1rem",
                                                border: "1px solid #3f5958",
                                                display: "flex", justifyContent: "space-between", outline: "none", color: 'white',
                                            }} >

                                        </input>
                                        {
                                            pollOptions > 2 ?
                                                <input onChange={(e) => setoptionThree(e.target.value)} placeholder="Option 3"
                                                    style={{
                                                        width: "100%", backgroundColor: "black", padding: "0.5rem", marginBottom: "0.5rem", borderRadius: "1rem",
                                                        border: "1px solid #3f5958",
                                                        display: "flex", justifyContent: "space-between", outline: "none", color: 'white',
                                                    }} >

                                                </input>
                                                : ''
                                        }

                                        {
                                            pollOptions == 4 ?
                                                <input onChange={(e) => setoptionFour(e.target.value)} placeholder="Option 4"
                                                    style={{
                                                        width: "100%", backgroundColor: "black", padding: "0.5rem", marginBottom: "0.5rem", borderRadius: "1rem",
                                                        border: "1px solid #3f5958",
                                                        display: "flex", justifyContent: "space-between", outline: "none", color: 'white',
                                                    }} >

                                                </input>
                                                : ''
                                        }


                                        {
                                            pollOptions < 4 ?
                                                <div style={{ display: "flex", marginBottom: "0.5rem", justifyContent: "flex-end" }}  >
                                                    <button onClick={() => setpollOptions(pollOptions + 1)} style={{ padding: "0.25rem 0.5rem", border: "1px solid #363331", fontSize: '12px', backgroundColor: "black", color: "gray", borderRadius: '0.25rem' }} >
                                                        Add option +
                                                    </button>

                                                </div>
                                                : ""
                                        }

                                    </>
                                    : ''
                            }


                            {
                                credentials.postimg && showpreview ?
                                    <hr style={{ margin: 0, marginBottom: '0.2rem' }} />
                                    : ''
                            }

                            {
                                postimg.length > 0 ?
                                    <DragDropContext onDragEnd={handleOnDragEnd}>

                                        <Droppable droppableId="characters" direction="horizontal" >
                                            {(provided) => (
                                                <>
                                                    <div className='' style={{ width: "100%", overflowX: "scroll", scrollMargin: 0, display: "flex", padding: "0.5rem", border: "1px solid #48494a", marginTop: "0.5rem", alignItems: "" }}   {...provided.droppableProps} ref={provided.innerRef}>
                                                        {postimg.map((rev, i) => {
                                                            return (

                                                                <Draggable isDragDisabled={editingImg} key={rev.name ? rev.name : draggable_id} draggableId={rev.name ? rev.name : draggable_id} index={i}>
                                                                    {(provided) => (
                                                                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                                                                            <div ref={otherRef} onClick={delImg}>
                                                                                <div onClick={() => { removePhoto(i) }} style={{ margin: " 0 0rem", top: '12px', position: 'relative', cursor: "pointer" }} >
                                                                                    <AiOutlineClose color='white' size={20} />
                                                                                </div>
                                                                            </div>
                                                                            <div className='previewimg'  >
                                                                                {/* <ImageCropMain img={rev} id={1} setImgFunc={setImgFunc} index={i} seteditingImg={seteditingImg} setdraggable_id={setdraggable_id} name={rev.name ? rev.name : draggable_id} /> */}
                                                                            </div>




                                                                        </div>


                                                                    )}
                                                                </Draggable>
                                                            );
                                                        })}
                                                        {provided.placeholder}
                                                    </div>

                                                </>


                                            )}
                                        </Droppable>

                                    </DragDropContext>
                                    : ""
                            }
                            {
                                showLinkInput ?
                                    <input name='link' onChange={onchangelink} value={credentials.link} type="text" style={isLink ? { padding: "0.5rem", outline: "none", border: "1px solid #363636", backgroundColor: "#16181b", width: "100%", caretColor: 'white ', color: "skyblue", fontWeight: "500", borderRadius: '0.5rem', margin: "0.5rem 0" } : { padding: "0.5rem", outline: "none", border: "1px solid #363636", backgroundColor: "#16181b", width: "100%", caretColor: 'white ', color: "white", fontWeight: "500", borderRadius: '0.5rem', margin: "0.5rem 0" }} maxLength='100' placeholder='link' />
                                    : ""
                            }





                        </div>
                        <input type="file" accept="image/png, image/jpg, image/jpeg" style={{ display: 'none' }} ref={ref} onChange={onImgChange} multiple="multiple" />

                        {/* {
                                repost.status == true ?
                                    <div style={{ color: "white", paddingLeft: "5%", }}>
                                        {
                                            repost.isYtpost ?
                                                <div style={{ border: '1px solid #444647', padding: "0.5rem", borderRadius: "0.5rem", color: "skyblue" }} >
                                                    {repost.yturl}
                                                </div>
                                                : <div style={{ border: '1px solid #444647', padding: "0.5rem", borderRadius: "0.5rem" }} >



                                                    <div className='feedtopinfo' style={{ display: 'flex', alignItems: 'center', paddingBottom: '0.5rem', backgroundColor: "inherit", marginBottom: "0.5rem" }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', width: '60%', backgroundColor: "inherit" }}>
                                                            <img alt="img" src={repost.pProfileImg} style={{ height: '2.5rem', width: '2.5rem', borderRadius: '50%', marginRight: '0.6rem', cursor: 'pointer' }} ></img>
                                                            <p style={{ marginBottom: 0, fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', }} className='feedUsername' >{repost.pUsername}</p>
                                                        </div>

                                                        <p style={{ width: '30%', marginBottom: 0, fontSize: '0.7rem', textAlign: 'center' }}>
                                                            {
                                                                repost.posted_Date !== null ?

                                                                    DateTime.fromISO(repost.posted_Date).toRelative()
                                                                    : ''
                                                            }
                                                        </p>


                                                    </div>

                                                    <div style={{
                                                        display: 'flex', flexDirection: 'column', backgroundColor: 'inherit', color: "white",
                                                        justifyContent: 'center'
                                                    }}>
                                                        <div style={{ display: 'flex', justifyContent: "space-between", width: '100%', color: 'white' }}>
                                                            <p style={{ marginBottom: '4px', fontSize: '0.9rem', marginTop: '0.1rem', width: '100%' }}> {repost.description}
                                                            </p>

                                                        </div>

                                                        {
                                                            repost.postimg.length > 0 ?
                                                                <div>
                                                                    <Swiper
                                                                        className='jkliop'
                                                                        style={{ width: 'auto', height: "auto", }}
                                                                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                                                                        slidesPerView={1}
                                                                        navigation
                                                                        pagination={{ clickable: true }}
                                                                        scrollbar={{ draggable: true }}
                                                                    >
                                                                        {


                                                                            repost.postimg.map((img, i) =>
                                                                                <div key={i}>
                                                                                    <SwiperSlide style={{ width: '100%', backgroundColor: '', borderRadius: "0.5rem" }} >
                                                                                        <img alt="img" style={{ width: '100%', borderRadius: "0.5rem" }}
                                                                                            className='postImg' src={img} />
                                                                                    </SwiperSlide>
                                                                                    
                                                                                </div>
                                                                            )
                                                                        }
                                                                    </Swiper>


                                                                </div>

                                                                : ''
                                                        }
                                                    </div>
                                                </div>

                                        }



                                    </div>
                                    : ""
                            } */}


                        <div className='postIcons_Btn'  >
                            <div className='uploadicons'>
                                <MdPermMedia onClick={handleImgClick} style={{ color: '#dedede', marginRight: "0.5rem" }} />
                                <FaPollH onClick={handlePoll} style={{ color: '#dedede', marginRight: "0.5rem" }} />
                                {/* <MdOutlineLink onClick={showLinkInputFunc} style={{ color: '#dedede' }} size={20} /> */}
                            </div>
                            <button
                                className={freeze ? 'postbtn postbtndisabled' : 'postbtn'}
                                disabled={freeze ? true : false}
                                type="submit"
                                onClick={save}
                            > {postimg.length == 0 && credentials.description !== '' && showPoll == false ? 'Kwik' : 'POST'} </button>
                        </div>
                    </div>
                    : ""
            }


        </>

    )
}

export default Post
