import { useEffect, useState, useRef } from "react"
import { useRouter } from 'next/router'
import { useSession, signIn, signOut } from "next-auth/react"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import { FiUserCheck } from 'react-icons/fi'
import { TiHome } from 'react-icons/ti'
import ProfileModal from "./profilemodal"


const Sidebar = () => {

    const { data: session } = useSession(); //로그인 정보
    const sidebar = useRef(null);

    useEffect(()=> {
        //페이지 이동 체크
        events.on('routeChangeStart', ()=> {
            setSelectedId(null);
        })
    }, []);

    const { events } = useRouter();
    const [selectedId, setSelectedId] = useState(null)
    

    const toggleModal = () => {
        if(selectedId === null){ setSelectedId('profile-modal'); }
        else{ setSelectedId(null); }
    }

    const slideup = () => {
        sidebar.current.classList.add('on');
    }

    const slidedown = (e) => {
        sidebar.current.classList.remove('on');
    }

    return(
        <>
            <nav ref={sidebar} onMouseEnter={slideup} onMouseLeave={slidedown}
            className='fixed top-0 left-0 inline-block w-20 h-full pt-20 pl-4 pb-4 min-w-20 transition-all duration-200 z-[99] on'>

                <ul className="inline-block flex flex-col flex-wrap justify-start content-start align-center 
                w-16 h-full m-0 py-3.5 px-3 h-[calc(100% - 2rem)px] bg-blue-500 bg-[rgba(0,0,0,0.45)] rounded-lg">
                    
                    <li className="mb-3.5">
                        <Link href="/" passHref onClick={toggleModal} >
                            <a className="inline-block text-center">
                                <div className="inline-block flex justify-center items-center w-[38px] h-[38px] bg-white overflow-hidden rounded-full hover:scale-[1.15] transition-width duration-300">
                                    <TiHome size='30' className='m-0 text-sm'/>
                                </div>
                            </a>
                        </Link>
                    </li>

                    <li className="mb-3.5">
                        <Link href="/" passHref onClick={toggleModal} >
                            <a className="inline-block text-center">
                                <div className="inline-block flex justify-center items-center w-[38px] h-[38px] bg-white overflow-hidden rounded-full hover:scale-[1.15] transition-scale duration-300">
                                    <TiHome size='30' className='m-0 text-sm'/>
                                </div>
                            </a>
                        </Link>
                    </li>

                    <li onClick={toggleModal} className="mb-3">
                        <div className="inline-block w-full w-[38px] h-[38px] bg-white rounded-full" >
                            <FiUserCheck className='mx-auto mx-auto h-full scale-125'/>
                        </div>
                    </li>
                    

                    

                    {/* 프로필 모달 */}
                    <AnimatePresence>   
                    {selectedId && (
                        <motion.div layoutId='profile-modal' initial={ani.init} animate={ani.ani} exit={ ani.exit } transition={{ duration: 0.3 }}
                        className='modal'>
                            <ProfileModal session={session} signIn={signIn} signOut={signOut} toggleModal={toggleModal}/>
                        </motion.div>
                        )
                    }
                    </AnimatePresence>
                
                </ul>
            </nav>
        </>
    )
}

const ani = {
    init : {
        position: 'absolute',
        top : '65px', right : '10px',
        zIndex : 999,
        opacity: 0,
    },
    ani : {
        position: 'absolute',
        top : '75px', right : '10px',
        zIndex : 999,
        opacity: 1,
    },
    exit : {
        position: 'absolute',
        top : '65px', right : '10px',
        zIndex : 999,
        opacity: 0,
    }
}


export default Sidebar