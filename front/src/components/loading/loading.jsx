import Logo from "./logo_test.png";

import './loading.scss'
import {useEffect, useState} from "react";

function Loading() {

    const [ load, setLoad ] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setLoad(true)
        }, 1500)
    }, []);

    return (
        <div id={'Loading'} className={'bg-background'}>
            <div className={'content-smoke'}>
                <div className={'smoke bg-black dark:bg-white before:bg-black dark:before:bg-white'}></div>
            </div>
            <img src={Logo}/>
        </div>
    )
}

export default Loading