import Tweet from "./tweet.jsx";
import {useEffect, useState} from "react";
import Pusher from "pusher-js";
import axios from "axios";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

function TweetLists() {

    console.log("ta grand mere");
    const [ tweetPost, setTweetPost ] = useState('')
    const [ tweets, setTweets ] = useState([])
    const [ filsChannel, setFilsChannel ] = useState()

    console.log("HEHOOOO");
    const jwtToken =Cookies.get('acces_token');
    const userId = jwtDecode(jwtToken).id;

    //du coup, le console log ne fonctionne pas ici pour une raison que j'ignore
    //impossible de debug ce truc, any idea
    console.log("sale pute 1");
    useEffect(() => {
        console.log("sale pute 2");
        const pusher = new Pusher('78dac66c329a20d0591d', {
            authEndpoint: '/broadcasting/auth',
            headers: {'Authorization': 'Bearer: ' + jwtToken},
            cluster: 'eu',
            encrypted: true,
        });


        console.log("sale pute 3");
        const userId = localStorage.getItem('user_infos').id;
        //const channel = pusher.subscribe(`tweets.${userId}`)
        const channel = pusher.subscribe(`tweets`)
        setFilsChannel(channel);


        channel.bind('new_tweet', (data) => {
            setTweets(providerTweets => [...providerTweets, data])
        });


        axios.get(`http://localhost:8000/api/getTweets`)
            .then(({ data }) => {
                let array = []
                for (const [key, value] of Object.entries(data)) {
                    array.push(data[key])
                }
                setTweets(data.map(x => x));
            })

        return () => {
            pusher.unsubscribe(`tweets.${userId}`);
        };
    }, []);

    const onPostTweet = (event) => {
        event.preventDefault()

        axios.post(`http://localhost:8000/api/new_tweet/${tweetPost}`)
            .then((data) => {
                console.log(data);
                console.log("hello "+userId);

            })
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1vw', alignItems: 'center' }}>
            <form className={ 'flex flex-col' } onSubmit={onPostTweet}>
                <input className={ 'text-blue-500' } value={tweetPost} onChange={(event) => setTweetPost(event.target.value) } type={'text'}/>
                <button className={ 'bg-blue-500' }>TWEET</button>
                console.log("hello "+userId);

            </form>

            {
                tweets.map((tweet) => {
                    return (
                        <Tweet key={tweet.id} data={tweet} filsChannel={filsChannel} />
                    )
                })
            }
        </div>
    )
}

export default TweetLists