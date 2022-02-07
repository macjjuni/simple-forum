import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { FiUserX } from 'react-icons/fi'

const ProfileModal = ({status, session, signOut, toggleModal }) => {    

    const [profile, setProfile] = useState('/user_profile.png');

    useEffect(()=>{ //모달 외 클릭 체크 
        document.addEventListener('click', clickCheck);
        return () => {
            document.removeEventListener("click", clickCheck);
        };
    }, []);
    
    useEffect(()=> {
        if(status === 'authenticated' && session.user.image ) setProfile(session.user.image);
    }, [status]);

    const clickCheck = (e) =>{
        const chk_class = e.target.classList.contains('modal');
        if(chk_class === false) toggleModal();
    }


    return(
        <>  
            <div className='relative w-60 p-1.5 bg-[rgba(0,0,0,0.6)] rounded-sm shadow-xl z-[100] modal' style={{boxShadow : 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>
            
                <div className="p-2 modal text-center">
                {
                    session ?
                    <>
                        <div className="rounded-full w-[80px] h-[80px] m-auto overflow-hidden">
                            <div className="w-[80px] h-[80px]">
                                <Image className="opacity-100 " src={profile} width='80px' height='80px'/>
                            </div>
                        </div>
                        <h4 className="text-sm text-white text-center pt-1 pb-2 modal">
                            {session.user.name}
                        </h4>
                    </>
                        :
                    <>
                        <div className="w-16 h-16 m-auto flex justify-between items-center rounded-full bg-white dark:bg-black overflow-hidden modal">
                            <FiUserX className="w-1/2 h-1/2 m-auto modal"/>
                        </div>
                        <h4 className="text-sm text-white text-center pt-1 pb-2 modal">
                            Customer
                        </h4>
                    </>
                }
                </div>
                
                <div className="w-full flex justify-around align-items text-sm py-1 modal">
                    {
                        !session
                            ?
                        <>
                            <Link href="/signup" passHref>
                                <a className="w-full mx-1 py-1.5 text-center bg-white text-black rounded-sm">회원가입</a>
                            </Link>
                            <Link href="/signin" passHref>
                                <a className="w-full mx-1 py-1.5 text-center bg-white text-black rounded-sm">로그인</a>
                            </Link>
                        
                        </>
                            :
                        <>
                            <Link href='/profile' passHref>
                                <a className="w-full mx-1 py-1 text-center bg-white text-black rounded-sm">프로필</a>
                            </Link>
                            <Link href="/newpost" passHref>
                                <a className="w-full mx-1 py-1 text-center bg-white text-black rounded-sm">글쓰기</a>
                            </Link>
                            <button className="w-full mx-1 py-1 text-center bg-white text-black rounded-sm" 
                                onClick={()=> signOut() }>로그아웃</button>
                        </>
                    }
                    
                </div>

            </div>
        </>
    )
}

export default ProfileModal