import {NavLink, Outlet, useLocation} from 'react-router-dom'
import {Button} from "@/components/ui/button.jsx";

import Logo from '@/assets/logo.png'
import LogoYZ from "@/components/icons/logoYZ.jsx";

function Home() {
    const location = useLocation();
    const { hash, pathname, search } = location;

    const GetRoute = () => pathname

    return (
        <div className={'w-screen h-screen'}>
            <div className={ `${(GetRoute() !== "/") ? 'max-lg:hidden' : ''} lg:flex w-full h-full` }>

                <div className={'max-lg:ml-16 w-8/12 flex items-center sm:justify-start lg:justify-center max-lg:mt-16 max-lg:mb-16'  }>
                    <LogoYZ className={'w-[28vw] max-lg:w-16 max-lg:h-16'} color={'dark:fill-white fill-black'} />
                </div>

                <div className={'max-lg:ml-16 flex flex-col items-start justify-center gap-14' }>
                    <div className={ 'flex flex-col gap-5' }>
                        <h6 className={ 'text-7xl' }>Ça se passe</h6>
                        <h6 className={ 'text-7xl' }>maintenant</h6>
                    </div>

                    <div className={'w-6/12 flex flex-col gap-6'}>
                        <h2 className={'text-4xl'}>Inscrivez‑vous.</h2>
                        <div>
                            <Button asChild variant={'yz'} className={ 'w-full' }>
                                <NavLink className={'cursor-pointer'} to={'/register'} >Créer un compte</NavLink>
                            </Button>
                            <p className={'text-xs mt-2'}>En vous inscrivant, vous acceptez les <a className={'text-blue-500'} href={'#'}>Conditions d'utilisation</a> et la <a className={'text-blue-500'} href={'#'}>Politique de confidentialité</a>, notamment <a className={'text-blue-500'} href={'#'}>l'Utilisation des cookies</a>.</p>
                        </div>
                    </div>

                    <div className={'w-6/12 flex flex-col gap-6'}>
                        <h2 className={'text-lg'}>Vous avez déjà un compte ?</h2>
                        <Button asChild variant={'outlineyz'} className={ 'w-full text-blue-500' }>
                            <NavLink className={'cursor-pointer'} to={'/login'} >Se connecter</NavLink>
                        </Button>
                    </div>
                </div>
            </div>

            <Outlet />
        </div>
    )
}

export default Home