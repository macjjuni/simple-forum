import { useSession, signIn, signOut } from "next-auth/react"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import { FiUserCheck, FiUserX } from 'react-icons/fi'
import ProfileModal from "./profilemodal"

const Header = () => {

    const { route, events } = useRouter();
    const [modal, setModal] = useState(null)
    const { data: session } = useSession(); //로그인 정보

    useEffect(()=> {
        //페이지 이동 체크
        events.on('routeChangeStart', ()=> {
            setModal(null);
        })
    }, []);

    const toggleModal = (e) => {
        if(modal === null){ setModal('profile-modal'); }
        else{ setModal(null); }
    }

    return(
        <>
            <header className="relative w-full z-[999] shadow-sm lg:shadow-none">
                <div className={`header-wrap relative h-full ${route==='/'?'max-w-screen-lg':'max-w-screen-md'} transition-width duration-500 ease-[cubic-bezier(0.17, 0.67, 0.83, 0.67)]
                mx-auto h-20 lg:h-28 px-2 flex justify-between items-center`}>
                    
                    <h1 className='inline-block text-3xl md:text-5xl text-black leading-7
                    transition-padding duration-500 ease-in-out'>
                        <Link href='/' passHref>
                            <a>Simple Forum</a>
                        </Link>
                    </h1>

                    <button onClick={toggleModal} className={`${modal !== null ? 'bg-blue-500' : 'bg-white'} 
                    transition duration-300 ease-in-out rounded-full w-11 h-11 overflow-hidden`}>
                        {
                            !session
                                ?
                            <FiUserX className={`${modal!==null?'text-white':'text-black'} m-auto h-full scale-125 transition duration-300 ease-in-out`}/>
                                :
                            <FiUserCheck className={`${modal!==null?'text-white':'text-black'} m-auto h-full scale-125 transition duration-300 ease-in-out`}/>
                        }
                    </button>

                    {/* 프로필 모달 */}
                    <AnimatePresence>   
                        {modal && (
                            <motion.div layoutId='profile-modal' initial={ani.init} animate={ani.ani} exit={ ani.exit } transition={{ ease : [0.17, 0.67, 0.83, 0.67], duration: 0.3 }}
                            className='modal'>
                                <ProfileModal session={session} signIn={signIn} signOut={signOut} toggleModal={toggleModal}/>
                            </motion.div>
                            )
                        }
                    </AnimatePresence>

                </div>
            </header>
        </>
    )
}

const ani = {
    init : {
        position: 'absolute',
        top : '70px', right : '1000px',
        transform: 'rotate(350deg)',
        zIndex : 999,
        opacity: 0,
    },
    ani : {
        position: 'absolute',
        top : '80px', right : '10px',
        transform: 'rotate(0deg)',
        zIndex : 999,
        opacity: 1,
    },
    exit : {
        position: 'absolute',
        top : '500px', right : '1000px',
        transform: 'rotate(300deg)',
        zIndex : 999,
        opacity: 0,
    }
}

export default Header