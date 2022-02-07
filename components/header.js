import { useSession, signIn, signOut } from "next-auth/react"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import { useRouter } from 'next/router'
import { FiUserCheck, FiUserX } from 'react-icons/fi'
import { BsPencil, BsFillSunFill } from 'react-icons/bs' 
import ProfileModal from "./profilemodal"


const Header = () => {

    const headerRef = useRef(null);
    const { route, events } = useRouter();
    const [modal, setModal] = useState(null)
    const { data: session, status } = useSession(); //로그인 정보

    useEffect(()=> {
        //페이지 이동 체크
        events.on('routeChangeStart', ()=> {
            setModal(null);
        });
    }, []);


    const toggleModal = (e) => {
        if(modal === null){ setModal('profile-modal'); }
        else{ setModal(null); }
    }

    const toggleTheme = () => {
        const theme = localStorage.getItem('theme');
        if(theme === 'dark'){
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
        }else{
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
        }
    }
    
    
    return(
        <>
            <header ref={headerRef} className="relative w-full z-[999] shadow-sm lg:shadow-none">
                <div className={`header-wrap relative h-full ${route==='/'||route.includes('search')|| route.includes('editpost') ||route.includes('newpost') ?'max-w-screen-lg':'max-w-screen-md'} 
                transition-[max-width] duration-500 ease-[cubic-bezier(0.17, 0.67, 0.83, 0.67)]
                mx-auto h-20 lg:h-28 px-2 flex justify-between items-center`}>
                    
                    <h1 className='inline-block text-2xl lg:text-5xl lg:h-10 lg:h-14'>
                        <Link href='/' passHref>
                            <a className="block h-full">Simple Forum</a>
                        </Link>
                    </h1>

                    <div className="text-[0px]">

                        <button onClick={toggleTheme} className='inline-block w-11 h-11 inline-flex items-center align-top text-lg rounded-full
                            hover:text-white hover:bg-blue-400 transition'>
                            <BsFillSunFill className='mx-auto h-10 text-inhrit dark:text-white scale-110'/>
                        </button>
                        
                        <Link href='/newpost' passHref>
                            <a className='inline-block w-11 h-11 ml-0.5 lg:ml-2 inline-flex items-center align-top text-lg rounded-full
                            hover:text-white hover:bg-blue-400  transition'>
                                <BsPencil className='mx-auto h-10 text-inhrit scale-110 '/>
                            </a>
                        </Link>

                        <button onClick={toggleModal} className={`${modal !== null ? 'bg-slate- 200 dark:bg-slate-400 text-white' : ''} text-lg 
                        rounded-full w-11 h-11 ml-0.5 lg:ml-2 overflow-hidden hover:text-white hover:bg-blue-400 transition`}>
                            {
                                !session
                                    ?
                                <FiUserX className='text-inhrit m-auto h-full scale-110 '/>
                                    :
                                <FiUserCheck className='text-inhrit m-auto h-full scale-110 '/>
                            }
                        </button>
                    </div>

                    {/* 프로필 모달 */}
                    <AnimatePresence>   
                        {modal && (
                            <motion.div layoutId='profile-modal' initial={ani.init} animate={ani.ani} exit={ ani.exit } transition={{ ease : "easeInOut", duration: 0.4 }}
                            className='modal'>
                                <ProfileModal status={status} session={session} signIn={signIn} signOut={()=> signOut({callbackUrl : '/'})} toggleModal={toggleModal}/>
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
        top : '30px', right : '10px',
        transform: 'rotate(0deg)',
        zIndex : 999,
        opacity: 0,
    },
    ani : {
        position: 'absolute',
        top : '90px', right : '10px',
        transform: 'rotate(0deg)',
        zIndex : 999,
        opacity: 1,
    },
    exit : {
        position: 'absolute',
        top : '30px', right : '10px',
        transform: 'rotate(0deg)',
        zIndex : 999,
        opacity: 0,
    }
}

export default Header