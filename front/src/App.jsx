import './App.css'


import { GoogleOAuthProvider } from '@react-oauth/google';

import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import Home from "@/views/Home.jsx";
import Login from "@/views/auth/login.jsx";
import Register from "@/views/auth/register.jsx";
import UserLayout from "@/views/user/Layout.jsx";


import {useStateContext} from "@/_services/provider/AuthProvider.jsx";
import {HomePage,MessagesPage, ExplorePage, NotificationsPage, ProfilePage, SignetsPage} from "@/views/user/contents/index.js";
import {WriteTweet} from "@/views/user/contents/Home/WriteTweet/WriteTweet.jsx";
import {Mentions} from "@/views/user/contents/Notifications/Mentions/Mentions.jsx";
import {NotificationsList} from "@/views/user/contents/Notifications/NotificationsList/NotificationsList.jsx";


import ProfileTweets from "@/views/user/contents/Profile/Tweets/ProfileTweets.jsx";
import ProfileResponses from "@/views/user/contents/Profile/Responses/ProfileResponses.jsx";
import ProfileLikes from "@/views/user/contents/Profile/Likes/ProfileLikes.jsx";
import FollowPage from "@/views/user/contents/Profile/Follow/FollowPage.jsx";
import FollowFollowings from "@/views/user/contents/Profile/Follow/FollowFollowings.jsx";
import FollowFollowers from "@/views/user/contents/Profile/Follow/FollowFollowers.jsx";

function ProtectedRoute({ isAllowed, redirectTo = "/", children }) {
    if (!isAllowed) {
        return <Navigate to={redirectTo} />
    }

    return (
        children ? children : <UserLayout />
    )
}

function ProtectedRouteHome({ isAllowed, redirectTo = "/home" }) {
    if (isAllowed) {
        return <Navigate to={redirectTo} />
    }

    return (
        <Home />
    )
}

function App() {
    const { isLogged } = useStateContext();

    return (
        <GoogleOAuthProvider clientId={"393677604939-k10j1a453litv9p201kuq9lc9iqnch5m.apps.googleusercontent.com"}>
            <Routes>
                <Route path="/" element={ <ProtectedRouteHome isAllowed={isLogged()} /> }>
                    <Route path="login" element={ <Login /> }/>
                    <Route path="register" element={ <Register/> }/>
                </Route>

                <Route element={ <ProtectedRoute isAllowed={ isLogged() } /> }>
                    <Route path="home" element={ <HomePage/> } >
                        <Route path="compose" element={ <WriteTweet compose={true}/> }/>
                    </Route>
                    <Route path="explore" element={ <ExplorePage/> } />
                    <Route path="notifications" element={<NotificationsPage />}>
                        <Route path="" element={<NotificationsList />}/>
                        <Route path="mentions" element={<Mentions />}/>
                    </Route>
                    <Route path="messages" element={ <MessagesPage/> } />
                    <Route path="signets" element={ <SignetsPage/> } />
                    <Route path="profile" element={ <ProfilePage/>}>
                        <Route path="" element={ <ProfileTweets /> } />
                        <Route path="responses" element={ <ProfileResponses /> } />
                        <Route path="likes" element={ <ProfileLikes /> } />

                        <Route path="follow" element={ <FollowPage/> } >
                            <Route path="" element={ <FollowFollowers /> } />
                            <Route path="following" element={ <FollowFollowings /> } />
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </GoogleOAuthProvider>
    )
}

export default App