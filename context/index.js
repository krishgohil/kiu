import { useState } from 'react';
import { createContext, useContext } from 'react';

const AppContext = createContext();
const YtContext = createContext()
const FeedContext = createContext()

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

