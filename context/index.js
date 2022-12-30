import { useState } from 'react';
import { createContext, useContext } from 'react';

const AppContext = createContext();
const YtContext = createContext()
const FeedContext = createContext()
const GeneralContext = createContext()

export function AuthWrapper({ children }) {
    const [sharedState, setsharedState] = useState(
        {
            name: '',
            profileImg: '',
            username: '',
            bio: '',
            following: {},
            followers: {},
            socialScore: [],
            _id: '',
            posts: [],
            feed: [],
            accountType: "",
            notificationToken: "",
            guest: null,
            notificationSettings: {},
            notificationCount: 0
        }
    )

    return (
        <AppContext.Provider value={{ sharedState, setsharedState }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}










// yt videos 

export function YtWrapper({ children }) {
    const [ytstate, setytstate] = useState(
        {
            videos: [],
            nextPageToken: null,
            promotedVideosStore: []
        }
    )

    return (
        <YtContext.Provider value={{ ytstate, setytstate }}>
            {children}
        </YtContext.Provider>
    );
}

export function useYtContext() {
    return useContext(YtContext);
}



// feed context

export function FeedWrapper({ children }) {
    const [feedstate, setfeedstate] = useState(
        {
            feed_Data: [],

        }
    )

    return (
        <FeedContext.Provider value={{ feedstate, setfeedstate }}>
            {children}
        </FeedContext.Provider>
    );
}

export function useFeedContext() {
    return useContext(FeedContext);
}




// general 
export function GeneralWrapper({ children }) {
    const [genstate, setgenstate] = useState(
        {
            category: '',
            flw_Recommendations: [],
            ratedPosts: [],
            sliceValue: '',
            productSearches: [],
            cryptoSearches: [],
            bookSearches: [],
            stockSearches: [],
            movieSearches: [],
            sportSearches: [],
            chatz: [
                // {
                //     chatId: '',
                //     chatMessages: [
                //         {
                //             message: 'uuu',
                //             room: '00'
                //         }
                //     ]


                // }
            ],
            destress_chatz: [],
            productChatSetup: {},
            //  {
            //     img: "",
            //     price: "",
            //     title: "",
            //     tagLine: "",
            //     discountedPrice: ""
            // }
            repost: {
                // status: false,
                // description: "",
                // postimg: "",
                // pUsername: "",
                // pDate: "",

            },
            ytVideosInfo: [

            ],
            editProduct: {
                status: false,
                productId: ""
            },
            deleted_posts: [],
            starred_posts: [
                // {
                //     postId: "",
                //     stars: 00
                // }
            ],
            reposted_posts: [
                // postId:"" , repostCount
            ],
            notificationTokenCurrent: "",
            to_follow_requests: [
                // {  toFollowId :""                                                                }
            ],

            pollOptedPosts: [
                // {   optionSelectedId,totalvotes         }
            ],



            recentChatsStore: [
                // {}
            ],
            unSeenCount: {
                unseen: 0,
                unseenChatIds: []
            },
            newMessages: [],
            post_search_results: [
                // 
            ],
            product_search_results: [
                // 
            ],
            profile_search_results: [
                // 
            ],
            upp_productResults: [
                // 
            ],
        }
    )

    return (
        <GeneralContext.Provider value={{ genstate, setgenstate }}>
            {children}
        </GeneralContext.Provider>
    );
}

export function useGeneralContext() {
    return useContext(GeneralContext);
}

