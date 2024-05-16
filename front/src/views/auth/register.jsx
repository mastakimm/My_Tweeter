import './auth.scss'
import {useEffect, useRef, useState} from "react";

import {NavLink, useNavigate} from "react-router-dom";
import { Button } from "@/components/ui/button.jsx";

import { authService } from "@/_services";

import LogoYZ from "@/components/icons/logoYZ.jsx";
import CrossIcon from "@/components/icons/cross.jsx";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Loading from "@/components/loading/loading.jsx";
import SuccesRegister from "@/views/auth/register/succesRegister.jsx";


const MonthList = [
    { value: "1", name: 'Janvier' },
    { value: "2", name: 'Février' },
    { value: "3", name: 'Mars' },
    { value: "4", name: 'Avril' },
    { value: "5", name: 'Mai' },
    { value: "6", name: 'Juin' },
    { value: "7", name: 'Juillet' },
    { value: "8", name: 'Août' },
    { value: "9", name: 'Septembre' },
    { value: "10", name: 'Octobre' },
    { value: "11", name: 'Novembre' },
    { value: "12", name: 'Décembre' }
]

function Register() {
    const navigate = useNavigate()

    const [ fullname, setFullname ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const [ monthDate, setMonthDate ] = useState();
    const [ dayDate, setDayDate ] = useState();
    const [ yearsDate, setYearsDate ] = useState();

    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(false)
    const [ validateRegister, setValidateRegister ] = useState(false)

    useEffect(() => {

        setTimeout(() => {
            setError(false)
        }, 10000)

    }, [error]);

    const handleSubmit = (event) => {
        event.preventDefault()

        setLoading(true)

        const birthdate = `${yearsDate}-${monthDate}-${dayDate}`

        authService.registerUser({
            fullname: fullname,
            tagname : "@" + fullname.split(" ")[0] +  Date.now().toString(),
            email: email,
            password: password,
            birthdate: birthdate
        })
            .then(data => {
                setLoading(false)
                setValidateRegister(true)
            })
            .catch(data => {
                if (data.response.status === 422) {
                    setError(data.response.data.message)
                }
            })
            .finally(() => {
                setLoading(false)
            })
    };

    const handlerClosePopup = () => {
        navigate('/')
    }

    if (validateRegister) {
        return (
            <div className={'top-0 w-screen h-screen absolute flex items-center justify-center'} style={{ backgroundColor: 'rgba(91, 112, 131, 0.4)' }}>
                <SuccesRegister />
            </div>
        )
    }

    return (
        <div className={'top-0 w-screen h-screen absolute flex items-center justify-center'} style={{ backgroundColor: 'rgba(91, 112, 131, 0.4)' }}>
            <div
                className={ 'max-[650px]:w-screen max-[650px]:h-screen w-[600px] min-[650px]:min-w-[600px] lg:max-w-[80vw] min-h-[400px] min-[650px]:max-h-[90vh] bg-background min-[650px]:rounded-2xl p-6 pb-8 pl-20 pr-20 relative' }>

                <div className={'AuthCloseBtn w-8 z-10 hover:bg-gray-800 group-hover:opacity-50 transition-all duration-300 rounded-full'} onClick={handlerClosePopup}>
                    <CrossIcon color={'dark:stroke-white stroke-black'} />
                </div>

                <div className={'flex justify-center'}>
                    <LogoYZ className={'w-8'} color={'dark:fill-white fill-black'} />
                </div>

                <h6 className={'text-3xl mt-6'}>Créer votre compte</h6>

                <form className={'mt-6 flex flex-col gap-6'} onSubmit={handleSubmit}>
                    <div className={'input-yz relative flex items-center'}>
                        <input required value={fullname} onChange={(event) => setFullname(event.target.value)} type='text'
                               className={`text-md pl-5 w-full h-16 outline-none bg-background border border-input focus:border-blue-500 rounded-[.3vw] ${(fullname !== '') ? '' : 'ihastext'}`} />

                        <label className={'text-gray-500 absolute transition-transform duration-200 left-0'}>Nom et prénom</label>
                    </div>

                    <div className={'input-yz relative flex items-center'}>
                        <input required value={email} onChange={(event) => setEmail(event.target.value)} type='email'
                               className={`pl-5 w-full h-16 outline-none bg-background border border-input focus:border-blue-500 rounded-[.3vw] ${(email !== '') ? '' : 'ihastext'}`} />

                        <label className={'text-gray-500 absolute transition-transform duration-200 left-0'}>Email</label>
                    </div>

                    <div className={'input-yz relative flex items-center'}>
                        <input required value={password} onChange={(event) => setPassword(event.target.value)} type='password'
                               className={`pl-5 w-full h-16 outline-none bg-background border border-input focus:border-blue-500 rounded-[.3vw] ${(password !== '') ? '' : 'ihastext'}`} />

                        <label className={'text-gray-500 absolute transition-transform duration-200 left-0'}>Mot de passe</label>
                    </div>

                    <div className={'flex flex-col gap-1'}>
                        <div className={'text-ls'}>Date de naissance</div>
                        <div className={'text-sm text-gray-500'}>Cette information ne sera pas affichée publiquement. Confirmez votre âge, même si ce compte est pour une entreprise, un animal de compagnie ou autre chose.</div>


                        <div className={'min-[500px]:flex max-[500px]:flex-row gap-6 mt-4'}>
                            <Select required onValueChange={setMonthDate}>
                                <SelectTrigger className="w-full h-16">
                                    <SelectValue placeholder="Mois" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        MonthList.map((data, index) => {
                                            return (
                                                <SelectItem value={data.value}>{data.name}</SelectItem>
                                            )
                                        })
                                    }
                                </SelectContent>
                            </Select>

                            <Select required value={dayDate} onValueChange={setDayDate}>
                                <SelectTrigger className="max-[500px]:w-full max-[500px]:mt-4 w-[10vw] h-16">
                                    <SelectValue placeholder="Jour" />
                                </SelectTrigger>
                                <SelectContent>
                                    {(() => {
                                        let td = [];
                                        for (let i = 1; i <= 31; i++) {
                                            td.push(
                                                <SelectItem value={`${i}`}>{i}</SelectItem>
                                            );
                                        }
                                        return td;
                                    })()}
                                </SelectContent>
                            </Select>


                            <Select required value={yearsDate} onValueChange={setYearsDate}>
                                <SelectTrigger className="max-[500px]:w-full max-[500px]:mt-4 w-[15vw] h-16">
                                    <SelectValue placeholder="Année" />
                                </SelectTrigger>
                                <SelectContent>
                                    {(() => {
                                        let td = [];
                                        const d = new Date();
                                        let year = d.getFullYear();
                                        for (let i = year; 1900 < i; i--) {
                                            td.push(
                                                <SelectItem value={`${i}`}>{i}</SelectItem>
                                            );
                                        }
                                        return td;
                                    })()}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>


                    <Button asChild variant={'yz'} className={ 'w-full h-12 mt-4' } >
                        <button className={'cursor-pointer'}>Suivant</button>
                    </Button>


                    <div className={'w-full h-6 text-center text-red-500'}>
                        { (error) ? error : '' }
                    </div>
                </form>

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

export default Register