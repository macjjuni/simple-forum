import axios from "axios";
import { useSession } from "next-auth/react"
import { useEffect, useRef, useState } from "react"
import Image from 'next/image'
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
    const pwRef = useRef(null);
    const chance = useRef(0);
    
    const [load, setLoad] = useState(false);

    const [userImage, setUserImage] = useState();
    const [blob, setBlob] = useState('');
    const type = useRef();

    const [change, setChange] = useState(false);
        
    useEffect(()=>{//로그인 상태면 페이지 강제 이동
        if(status === 'unauthenticated') replace('/');
        else if(status === 'authenticated'){
            if(!session.user.image) setUserImage('/user_profile.png');
            else setUserImage(session.user.image);
            setLoad(true);      
        }
    }, [status]);

    const selectImage = async(e) =>{
        
        const img = await compressImg(e.target.files[0]);
        setBlob(img);
        type.current = img.type.substring(6, 10);

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

    const userDelete = async() => {
        const password = pwRef.current.value.trim();

        if(password !== ''){
            let _alert = confirm("회원 탈퇴를 진행하시겠습니까?");
            
            if (_alert) {
                const res = await axios({ method : 'POST', url : `/api/db/user/delete/user`, data : { nicname : session.user.name, pw : password } });
                if(res.data.error === null){  //회원탈퇴 성공
                    replace('/');
                }else if(res.data.error === 'INCORRECT PASSWORD'){
                    chance.current = chance.current+1;
                    alert('잘못된 비밀번호입니다.' + `${chance.current + '/5'}`);
                    if(chance.current === 5) replace('/');
                    incorrectPW();
                }else{
                    console.log(res);
                }
            }
        }else{
            alert('비밀번호를 입력해주세요.');
            incorrectPW();
        }
    }

    const incorrectPW = () => {
        pwRef.current.classList.replace('border-blue-300', 'border-red-400')
    }

    const submit = async() => {
        
        if(change){
            setChange(false);
            //firebase Storage Create Reference  // 파일 경로 / 파일 명 . 확장자
            const storageRef = ref(storage, `profile_images/${encodeURI(session.user.name.nicname) + '.' + type.current}`);

            //이미지 업로드
            const snapshot = await uploadBytes(storageRef, blob);

            if(snapshot.metadata.name){
                try{
                    const url = await getDownloadURL(storageRef);
                    if(url){
                        const { data } = await axios({ method : 'POST', url : `api/db/user/update/profileImg/${session.user.name.id}`, data : { url : url } });
                        if(data.error === null){
                            // console.log('변경 성공');
                            session.user.image = url;
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
                <div className="profile-wrap relative text-center pb-10">
                    <div className="img-wrap relative flex flex-col md:flex-row justify-around">
                        
                        <div className="profile-img-wrap relative w-full md:w-1/2 py-8 md:py-0">
                            
                            <div className="relative inline-block p-9 border border-gray-200 dark:border-gray-700 text-[0px] m-auto bg-transparent shadow-lg overflow-hidden">
                                <label htmlFor='profile_input' className="absolute top-2 right-2 w-6 h-6 hover:scale-[1.1] transition duration-100 cursor-pointer z-[9999]]">
                                    <input id='profile_input' type='file' onChange={selectImage} accept="image/*" className="absolute w-0 h-0 opacity-0"/>
                                    <MdPhotoLibrary className="w-full h-full"/>
                                </label>

                                <Image className='rounded-full opacity-100' src={userImage} width={'240px'} height={'240px'} alt='profile_image'/>

                            </div>

                        </div>
                        <div className="profile-Info-wrap relative block md:w-1/2 px-0 md:px-8 py-8 md:py-0 text-left">
                            <div className="relative m-auto max-w-[320px] h-full md:w-full">
                                <h2 className="flex justify-start items-center text-3xl bold pb-3 mb-5 border-b">
                                    <div className="inline-block p-1 mt-1 mr-2 bg-slate-100 rounded-full">
                                        <FiUser className="w-[20px] h-[20px]"/> 
                                    </div>
                                    <div className="py-2">Profile</div>
                                </h2>

                                {
                                    status === 'authenticated' &&
                                    <>
                                        <p className="user-nic py-1.5">닉네임 : {session.user.name}</p>
                                        <p className="user-email py-1.5">이메일 : {session.user.email}</p>
                                        <input ref={pwRef} type="password" placeholder="비밀번호 입력" className="block w-full mt-10 px-3 py-2 border border-blue-300 bg-transparent outline-0 focus:outline-none rounded-none" maxLength={15} />
                                    </>
                                }
                                
                            </div>
                        </div>
                    </div>
                    <div className="submit-wrap flex justify-center flex-col mx-0 mt-5 md:mt-28">
                        <button ref={submitRef} disabled={!change} onClick={submit} 
                        className="inline-block max-w-[330px] md:max-w-[200px] w-full mx-auto my-2 py-2.5 bg-gray-400 text-lg text-white text-center rounded-sm transition duration-300">
                            변경하기
                        </button>

                        <button onClick={userDelete}
                        className="inline-block max-w-[330px] md:max-w-[200px] w-full mx-auto my-2 py-2.5 bg-blue-400 text-lg text-white text-center rounded-sm transition duration-300">
                            회원탈퇴
                        </button>
                    </div>

                </div>
                    :
                <></>
            }
        </>
    )
}

export default Profile