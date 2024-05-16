import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import axios from "axios";

const Tweet = ({ filsChannel, data }) => {
    const [ like, setLike ] = useState(data.like)

    useEffect(() => {

        filsChannel.bind(`like_tweet_${data.id}`, (data) => {
            setLike(data.like);
        });

        filsChannel.bind(`dislike_tweet${data.id}`, () => {
            setLike(like - 1);
        });

    }, []);

    const clickSend = () => {
        axios.post(`http://localhost:8000/api/tweet_like/${data.id}`)
            .then((data) => {
                console.log(data)
            })
    }

    return (
        <div>
            <div className={'title'}>Titre: { data.title }</div>
            <div>Nombre de likes: { like }</div>
            <button onClick={clickSend}>LIKE</button>
        </div>
    );
};

export default Tweet;
