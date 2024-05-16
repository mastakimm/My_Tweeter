import React from 'react'
import CrossIcon from "@/components/icons/cross.jsx";
import LogoYZ from "@/components/icons/logoYZ.jsx";

import {useNavigate} from "react-router-dom";

function SuccesRegister() {
    const navigate = useNavigate();

    const handlerClosePopup = () => {
        navigate('/')
    }

    return (
        <div
            className={ 'max-[650px]:w-screen max-[650px]:h-screen w-[600px] min-[650px]:min-w-[600px] lg:max-w-[80vw] bg-background min-[650px]:rounded-2xl p-6 pl-20 pr-20 relative' }>

            <div className={'AuthCloseBtn w-8 z-10 hover:bg-gray-800 group-hover:opacity-50 transition-all duration-300 rounded-full'} onClick={handlerClosePopup}>
                <CrossIcon color={'dark:stroke-white stroke-black'} />
            </div>

            <div className={'flex justify-center'}>
                <LogoYZ className={'w-8'} color={'dark:fill-white fill-black'} />
            </div>

            <div className={'w-full h-64 flex flex-col justify-center items-center gap-6'}>
                <h6 className={'text-3xl'}>Merci de vous être inscrit(e) !</h6>

                <a>
                    Un email d'activation a été envoyé à votre adresse. Veuillez cliquer sur le lien dans cet email pour activer votre compte.
                </a>
            </div>
        </div>
    )
}

export default SuccesRegister