import axios from "axios";
import { useSession, signIn } from "next-auth/react"
import { useEffect, useRef, useState } from "react"
import LazyImage from "../components/lazyImage";
import { useRouter } from "next/router";
import { MdPhotoLibrary } from 'react-icons/md'
import { FiUser } from 'react-icons/fi'
import HeadInfo from "../components/headInfo"
import imageCompression from 'browser-image-compression'
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_APPID,
};
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

const Profile = () => {

    const { data: session, status } = useSession(); 
    
    const { replace } = useRouter();
    const submitRef = useRef(null);

    const [load, setLoad] = useState(false);
    const [submitChk, setSubmitChk] = useState(true);

    const [blob, setBlob] = useState('');
    const [type, setType] = useState('');
    const [userId, setUserId] = useState();
    const [userNic, setUserNic] = useState();
    const [userEmail, setUserEmail] = useState();
    const [userImage, setUserImage] = useState();
    const [change, setChange] = useState(false);
        
    useEffect(()=>{//로그인 상태면 페이지 강제 이동
        if(status === 'unauthenticated') replace('/');
        else if(status === 'authenticated'){
            setUserId(session.user.name.id);
            setUserNic(session.user.name.nicname);
            setUserEmail(session.user.name.email);
            setUserImage(session.user.name.profile);
            setLoad(true);      
        }
    }, [status]);

    const selectImage = async(e) =>{
        
        const img = await compressImg(e.target.files[0]);

        setBlob(img);
        setType(img.type.substring(6, 10));

        setUserImage(URL.createObjectURL(img));

        //btn 스타일 수정
        setChange(true);
        submitRef.current.classList.replace('bg-gray-400', 'bg-blue-400');
        submitRef.current.classList.replace('bg-green-500', 'bg-blue-400');
        submitRef.current.innerText = '변경하기';
        e.target.value = ''; //input 초기화
        
    }

    const compressImg = async(img) => {
        try{
            const options = {
                maxSize: 1,
                initialQuality: 0.55  //initial 0.7
            }
            return await imageCompression(img, options);
        } catch(e){ console.log(e); }
    }

    const getfileSize = (x) => { //파일 사이즈 표현
        var s = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
        var e = Math.floor(Math.log(x) / Math.log(1024));
        return (x / Math.pow(1024, e)).toFixed(2) + s[e];
    };


    const submit = async() => {
        
        if(change){
            setChange(false);
            //firebase Storage Create Reference  // 파일 경로 / 파일 명 . 확장자
            const storageRef = ref(storage, `profile_images/${encodeURI(session.user.name.nicname) + '.' + type}`);

            //이미지 업로드
            const snapshot = await uploadBytes(storageRef, blob);

            if(snapshot.metadata.name){
                try{
                    const url = await getDownloadURL(storageRef);
                    if(url){
                        const { data } = await axios({ method : 'POST', url : `api/db/user/update/profileImg/${session.user.name.id}`, data : { url : url } });
                        if(data.error === null){
                            console.log('변경 성공');
                            session.user.name.profile = url;
                            setChange(false);
                            submitRef.current.classList.replace('bg-blue-400', 'bg-green-500');
                            submitRef.current.innerText = '변경 완료';
                        }else{
                            alert(data.error);
                        }
                    }
                } catch (err){
                    console.log(err);
                }
            }
        }

    }

    return(
        <>
            <HeadInfo title='프로필'/>
            {
                load ?
                <div className="profile-wrap relative text-center">
                    <div className="img-wrap relative flex flex-col md:flex-row justify-around">
                        
                        <div className="profile-img-wrap relative w-full md:w-1/2 py-8 md:py-0">
                            
                            <div className="relative inline-block p-8 border border-gray-200 dark:border-gray-700 text-[0px] m-auto bg-transparent shadow-lg overflow-hidden">
                                <label htmlFor='profile_input' className="absolute top-2 right-2 w-6 h-6 hover:scale-[1.1] transition duration-100 cursor-pointer z-[9999]]">
                                    <input id='profile_input' type='file' onChange={selectImage} accept="image/*" className="absolute w-0 h-0 opacity-0"/>
                                    <MdPhotoLibrary className="w-full h-full"/>
                                </label>
                                <LazyImage src={userImage} width={'250px'} height={'250px'} alt='profile_image'/>
                            </div>

                        </div>
                        <div className="profile-Info-wrap block md:w-1/2 px-0 md:px-8 py-8 md:py-0 text-left">
                            <div className="m-auto max-w-[320px] md:w-full">
                                <h2 className="flex justify-start items-center text-3xl bold pb-3 mb-5 border-b">
                                    <div className="inline-block p-1 mt-1 mr-2 bg-slate-100 rounded-full">
                                        <FiUser className="w-[20px] h-[20px]"/> 
                                    </div>
                                    <div className="py-2">Profile</div>
                                </h2>

                                <div className=""></div>
                                <p className="user-id py-1.5">아이디 : {userId}</p>
                                <p className="user-nic py-1.5">닉네임 : {userNic}</p>
                                <p className="user-email py-1.5">이메일 : {userEmail}</p>
                            </div>
                        </div>
                    </div>
                    <div className="submit-wrap mt-5 md:mt-32">
                        <button ref={submitRef} disabled={!change} onClick={submit} 
                        className="inline-block max-w-[330px] md:max-w-[200px] w-full py-2.5 m-auto bg-gray-400 text-lg text-white text-center rounded-sm transition duration-300">
                            변경하기
                        </button>
                    </div>

                </div>
                    :
                <></>
            }
        </>
    )
}

// export const getServerSideProps = async(req) => {
    
//     const session = await getSession(req);
    
//     const { data } = await axios({ method : 'POST', url : `http://localhost:${process.env.PORT}/api/db/user/read/profile/${encodeURI(session.user.name.nicname)}` ,
//                             data : { user : session.user.name.nicname }});

//     if(data.error === null){
//         return{
//             props : { profile : data.profile }
//         }
//     }else{
//         return{
//             props : { profile : 'not yet' }
//         }
//     }

// }

export default Profile