import axios from "axios";
import dynamic from "next/dynamic";
import HeadInfo from "../components/headInfo"
import { getSession, useSession } from "next-auth/react"
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

const NoSsrReC = dynamic(()=> import('../components/recaptchaV2'), { ssr : false});

const Signup = () => {

    const { data : session } = useSession();
    
    const idRef = useRef(null);
    const pwRef = useRef(null);
    const pw2Ref = useRef(null);
    const emailRef = useRef(null);
    const nicRef = useRef(null);
    const submitRef = useRef(null);

    const [load, setLoad] = useState(false);
    const [reCaptchaChk, setReCaptchaChk] = useState(false);

    const { replace, push } = useRouter();

    useEffect(async()=>{//로그인 상태면 페이지 강제 이동
        if(session === undefined){ //새로고침 & url 접속시
            const _session = await getSession();
            if(_session === null) setLoad(true);
            else replace('/');
        }else if(session === null){
            setLoad(true);
        }else replace('/');
    }, []);

    useEffect(()=>{
        if(reCaptchaChk) submitRef.current.classList.replace('bg-gray-400', 'bg-blue-500');
        else{
            if(submitRef.current){
                submitRef.current.classList.replace('bg-blue-500', 'bg-gray-400');
                submitRef.current.classList.replace('bg-red-500', 'bg-gray-400');
            }
        }
    }, [reCaptchaChk]);

    const onSubmit = () => {
        
        axios({
            method : 'POST',
            url : '/api/db/user/createuser',
            data : {
                id : idRef.current.value,
                pw : pwRef.current.value,
                email : emailRef.current.value,
                nicname : nicRef.current.value,
            }
        }).then(res => {
            if(res.status === 200){
                push('/signin');
            }
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        
        <>
            <HeadInfo title='회원가입' />
            {
                load
                    ?
                <>  
                    <div className="text-center py-20">
                        <h2 className="text-2xl mb-10 text-blue-500 underline underline-offset-8">Create Account</h2>
                        <input ref={idRef} type='text' placeholder="아이디" className="block w-3/5 sm:w-2/5 mx-auto my-2 p-2 border-b border-b-blue-300 bg-transparent outline-0 rounded-none "/>
                        <input ref={pwRef} type='password' placeholder="비밀번호" className="block w-3/5 sm:w-2/5 mx-auto my-2 p-2 border-b border-b-blue-300 bg-transparent outline-0 rounded-none "/>
                        <input ref={pw2Ref} type='password' placeholder="비밀번호 확인" className="block w-3/5 sm:w-2/5 mx-auto my-2 p-2 border-b border-b-blue-300 bg-transparent outline-0 rounded-none"/>
                        <input ref={emailRef} type='text' placeholder="이메일(E-mail)" className="block w-3/5 sm:w-2/5 mx-auto my-2 p-2 border-b border-b-blue-300 bg-transparent outline-0 rounded-none"/>
                        <input ref={nicRef} type='text' placeholder="닉네임" className="block w-3/5 sm:w-2/5 mx-auto my-2 p-2 border-b border-b-blue-300 bg-transparent outline-0 rounded-none"/>
                        
                        <NoSsrReC setReCaptchaChk={setReCaptchaChk}/>
                        
                        <button onClick={onSubmit} ref={submitRef} disabled={!reCaptchaChk} className="block mx-auto mt-6 mb-10 p-2.5 w-3/5 sm:w-2/5 bg-gray-400 text-white rounded-md">확인</button>
                    </div>
                </>
                    :
                <></>
            }
        </>
    )
}


export default Signup