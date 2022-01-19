import { useSession, signIn, signOut } from "next-auth/react"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import { FiUserCheck } from 'react-icons/fi'
import Logo from "./logo"
import ProfileModal from "./profilemodal"

const Header = () => {

    useEffect(()=> {
        //페이지 이동 체크
        events.on('routeChangeStart', ()=> {
            setSelectedId(null);
        })
    }, []);

    const { events } = useRouter();
    const [selectedId, setSelectedId] = useState(null)
    const { data: session } = useSession(); //로그인 정보

    const toggleModal = () => {
        if(selectedId === null){ setSelectedId('profile-modal'); }
        else{ setSelectedId(null); }
    }

    return(
        <>
            <header className="position h-16 sm:h-14 px-4 flex justify-between items-center bg-blue-500 shadow-lg">
                <Logo/>

                <button onClick={toggleModal} className="bg-white rounded-full w-9 h-9 overflow-hidden">
                    <FiUserCheck className='m-auto h-full scale-125'/>
                </button>

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

            </header>
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

export default Header