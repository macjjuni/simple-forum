import { useSession } from "next-auth/react"
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { MdPhotoLibrary } from 'react-icons/md'
import Image from "next/image";
import HeadInfo from "../components/headInfo"
import imageCompression from 'browser-image-compression'
import axios from "axios"

const Profile = () => {

    const { data: session, status } = useSession(); 
    
    const { replace } = useRouter();
    const profileImg = useRef(null);
    const submitRef = useRef(null);

    const [load, setLoad] = useState(false);
    const [blob, setBlob] = useState();
    const [userId, setUserId] = useState();
    const [change, setChange] = useState(false);
    
    useEffect(()=>{//로그인 상태면 페이지 강제 이동
        if(status === 'unauthenticated') replace('/');
        else if(status === 'authenticated'){
            setUserId(session.user.name);
            setLoad(true);
        }
    }, [status]);


    useEffect(()=>{ //변경사항 발생시 변경 버튼 활성화
        if(change) submitRef.current.classList.replace('bg-gray-400', 'bg-blue-400');
    }, [change])

    const uploadImg = async(e) =>{
        
        const img = await compressImg(e.target.files[0]);
        console.log(img)
        setBlob(img);
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
                initialQuality: 0.7  //initial 0.7
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

        const formData = new FormData();
        formData.append('image1', blob);
        axios({
            method : 'POST',
            url : '/api/user/profile',
            data : formData,
            headers : { 'Content-Type': 'multipart/form-data' }
        }).then(res=> {
            console.log(res);
        })
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
                        <img className="w-full h-full rounded-full" ref={profileImg} width='100%' height='100%' src="/user_profile.png" alt="user profile" />
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