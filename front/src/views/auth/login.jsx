import GoogleImg from '@/assets/img/google.png'
import './auth.scss'
import {useEffect, useState} from "react";

import CrossIcon from "@/components/icons/cross.jsx";
import {NavLink, useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button.jsx";
import LogoYZ from "@/components/icons/logoYZ.jsx";
import {authService} from "@/_services/index.js";

import Loading from "@/components/loading/loading.jsx";

import {useStateContext} from "@/_services/provider/AuthProvider.jsx";

import { GoogleLogin } from '@react-oauth/google';


function Login() {
    const [ error, setError ] = useState(false)
    const [ loading, setLoading ] = useState(false)

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const navigate = useNavigate()

    const { setToken, setUser } = useStateContext()

    useEffect(() => {
        setTimeout(() => {
            setError(false)
        }, 10000)
    }, [error]);

    const handlerClosePopup = () => {
        navigate('/')
    }

    const handleLoginForm = (event) => {
        event.preventDefault()

        setLoading(true)

        authService.loginUser({
            email: email,
            password: password
        })
            .then(data => {
                setToken(data.data.token)
                setUser(data.data.user)
                navigate('/home')
            })
            .catch(error => {
                let errorCode = error.response?.status;

                if (errorCode === 403) {
                    setError("Votre email n'est pas verifier");
                } else if (errorCode === 422) {
                    setError("Email ou mot de passe incorect");
                }

                setLoading(false)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const handleGoogleLogin = (credential) => {
        setLoading(true)

        fetch('http://localhost:8000/api/auth/google/callback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tokenId: credential.credential }),
        })
            .then(response => response.json())
            .then(data => {
                setToken(data.token)
                setUser(data.user)
                navigate('/home')
            })
            .catch(error => {
                console.error('Error:', error);
                setLoading(false)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <div className={'top-0 w-screen h-screen absolute flex items-center justify-center'} style={{ backgroundColor: 'rgba(91, 112, 131, 0.4)' }}>

            <div
                className={ 'overflow-hidden max-[650px]:w-screen max-[650px]:h-screen w-[600px] min-[650px]:min-w-[600px] lg:max-w-[80vw] min-h-[400px] min-[650px]:max-h-[90vh] bg-background min-[650px]:rounded-2xl p-6 pb-8 pl-32 pr-32 relative' }>


                <div className={'AuthCloseBtn w-8 z-10 hover:bg-gray-800 group-hover:opacity-50 transition-all duration-300 rounded-full'} onClick={handlerClosePopup}>
                    <CrossIcon color={'dark:stroke-white stroke-black'} />
                </div>

                <div className={'flex justify-center'}>
                    <LogoYZ className={'w-8'} color={'dark:fill-white fill-black'} />
                </div>

                <h6 className={'text-3xl mt-6'}>Connectez‑vous à YZ</h6>


                <div className={'flex flex-col gap-4 mt-8'}>



                    <GoogleLogin
                        onSuccess={handleGoogleLogin}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                        size="large"
                        width="100%"
                        containerProps={{
                            style: {
                                width: "100% !important",
                                diplay: 'flex',
                                justifyContent: 'center',
                                margin: '0 auto',
                            },
                        }}
                    />
                </div>

                <div className={'border h-0.5 flex justify-center items-center relative my-10'}>
                    <div className={'absolute w-12 text-center bg-background'}>OU</div>
                </div>

                <form className={'mt-6 flex flex-col gap-6'} onSubmit={handleLoginForm}>
                    <div className={'input-yz relative flex items-center'}>
                        <input value={email} onChange={(event) => setEmail(event.target.value)} type='text'
                               className={`pl-5 w-full h-16 outline-none bg-background border border-input focus:border-blue-500 rounded-[.3vw] ${(email !== '') ? '' : 'ihastext'}`} />

                        <label className={'text-gray-500 absolute transition-transform duration-200 left-0'}>Email</label>
                    </div>

                    <div className={'input-yz relative flex items-center'}>
                        <input value={password} onChange={(event) => setPassword(event.target.value)} type='password'
                               className={`pl-5 w-full h-16 outline-none bg-background border border-input focus:border-blue-500 rounded-[.3vw] ${(password !== '') ? '' : 'ihastext'}`} />

                        <label className={'text-gray-500 absolute transition-transform duration-200 left-0'}>Mot de passe</label>
                    </div>

                    <Button asChild variant={'yz'} className={ 'w-full h-10 mt-4' }>
                        <button className={'cursor-pointer text-white'} >Connexion</button>
                    </Button>
                </form>

                <Button asChild variant={'outlineyz'} className={ 'w-full h-10 mt-4' }>
                    <NavLink className={'cursor-pointer'} to={'/register'} >Mot de passe oublié ?</NavLink>
                </Button>

                <div className={'my-6'}>Vous n'avez pas de compte ?<NavLink className={'text-blue-500'} to={'/register'}>Inscrivez-vous</NavLink></div>



                <div className={'w-full h-6 text-center text-red-500'}>
                    { (error) ? error : '' }
                </div>


                {
                    loading &&
                    <div className={'absolute w-full h-full top-0 left-0'}>
                        <Loading />
                    </div>
                }
            </div>
        </div>
    )
}


/*
                    <Button asChild variant={'default'} className={'w-full h-10'}>
                        <button className={'cursor-pointer flex gap-2'}>
                            <img src={GoogleImg} className={'w-6'}/>
                            Se connecter avec Google
                        </button>
                    </Button>

                    <Button asChild variant={'default'} className={'w-full h-10'}>
                        <NavLink className={'cursor-pointer'} to={'/register'}>Se connecter avec ....</NavLink>
                    </Button>

 */

export default Login