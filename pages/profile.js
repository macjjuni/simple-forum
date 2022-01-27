import axios from "axios";
import { useSession } from "next-auth/react"
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { MdPhotoLibrary } from 'react-icons/md'
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
    const profileImg = useRef(null);
    const submitRef = useRef(null);

    const [load, setLoad] = useState(false);
    const [currentImg, setCurrentImg] = useState('/user_profile.png');
    const [blob, setBlob] = useState('');
    const [imgType, setImgType] = useState('');
    const [userId, setUserId] = useState();
    const [change, setChange] = useState(false);
    
    useEffect(()=>{//로그인 상태면 페이지 강제 이동
        if(status === 'unauthenticated') replace('/');
        else if(status === 'authenticated'){
            setUserId(session.user.name.nicname);
            getProfile();
            setLoad(true);            
        }
    }, [status]);


    useEffect(()=>{ //변경사항 발생시 변경 버튼 활성화
        if(change) submitRef.current.classList.replace('bg-gray-400', 'bg-blue-400');
    }, [change])

    const uploadImg = async(e) =>{
        
        const img = await compressImg(e.target.files[0]);
        setBlob(img);
        setImgType(img.type.substring(6, 10));
        profileImg.current.src = URL.createObjectURL(img);
        profileImg.current.onload = (e) => { //cleanup
            URL.revokeObjectURL(e.target.src); 
        }
        setChange(true);
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
        
        //firebase Storage Create Reference  // 파일 경로 / 파일 명 . 확장자
        const storageRef = ref(storage, `profile_images/${encodeURI(session.user.name.nicname) + '.' + imgType}`);

        //이미지 업로드
        const snapshot = await uploadBytes(storageRef, blob);

        if(snapshot.metadata.name){
            try{
                const url = await getDownloadURL(storageRef);
                if(url){
                    const { data } = await axios({ method : 'POST', url : `api/db/user/update/profileImg/${session.user.name.id}`, data : { url : url } });
                    if(data.error === null){
                        console.log('변경 성공');
                    }else{
                        alert(data.error);
                    }
                }
            } catch (err){
                console.log(err);
            }

        }
        //이미지 url 가져오기


    }

    const getProfile = async() => {
        const { data } = await axios({ method : 'POST', url : `/api/db/user/read/profile/${session.user.name.nicname}` ,
                            data : { user : session.user.name.nicname }});

        if(data.error === null){
            setCurrentImg(data.profile);
        }else{
            alert(data.error);
        }


    }


    return(
        <>
            <HeadInfo title='프로필'/>
            {
                load ?
                <div className="profile-wrap w-full relative py-10 text-center">
                    <div className="profile-img-wrap relative w-60 h-60 m-auto rounded-lg">
                        <label htmlFor='profile_input' className="absolute top-1 right-1 w-6 h-6 hover:scale-[1.1] transition duration-100 cursor-pointer">
                        <input id='profile_input' type='file' onChange={uploadImg} accept="image/*" className="absolute w-0 h-0 opacity-0"/>
                            <MdPhotoLibrary className="w-full h-full"/>
                        </label>
                        <img className="w-full h-full rounded-full" ref={profileImg} width='100%' height='100%' src={currentImg} alt="user profile" />
                    </div>
                    <h2 className="inline-block text-lg text-center my-3 py-0.5 px-5">{userId}</h2>

                    <div className="submit-wrap">
                        <button ref={submitRef} disabled={!change} onClick={submit} className="block px-10 py-1.5 m-auto bg-gray-400 text-white rounded-sm transition duration-300">변경</button>
                    </div>
                </div>
                    :
                <></>
            }
        </>
    )
}

export default Profile