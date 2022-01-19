import dynamic from "next/dynamic"
import HeadInfo from "../components/headInfo"
import { useSession } from "next-auth/react"
import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/router"
import { signIn } from "next-auth/react"
import Link from "next/link"

const NoSsrReC = dynamic(()=> import('../components/recaptchaV2'), { ssr : false});

const Signin = () => {

    const { data: session, status } = useSession();
    const { replace } =  useRouter();
    
    const [load, setLoad] = useState(false);
    const [reCaptchaChk, setReCaptchaChk] = useState(false);

    const idRef = useRef(null);
    const pwRef = useRef(null);
    const submitRef = useRef(null);

    useEffect(()=>{//로그인 상태면 페이지 강제 이동
        if(status === 'authenticated') replace('/');
        else if(status === 'unauthenticated') setLoad(true);
    }, [status]);

    useEffect(()=>{
        if(reCaptchaChk) submitRef.current.classList.replace('bg-gray-400', 'bg-blue-500');
        else{
            if(submitRef.current){
                submitRef.current.classList.replace('bg-blue-500', 'bg-gray-400');
                submitRef.current.classList.replace('bg-red-400', 'bg-gray-400');
            }
        }
    }, [reCaptchaChk]);

    const submit = async() =>{ //로그인 로직
        if(reCaptchaChk){ //리캡차 재검증
            const res = await signIn('id-pw-credentials', {
                redirect : false,
                username : idRef.current.value,
                password : pwRef.current.value,
            });
            console.log(res);
            if(res.ok === true && res.error === null) replace('/');
            else errAlert();
        }        
    } 

    const errAlert = () => {
        idRef.current.classList.replace('border-b-blue-500', 'border-b-red-500');
        pwRef.current.classList.replace('border-b-blue-500', 'border-b-red-500');
        submitRef.current.classList.replace('bg-blue-500', 'bg-red-400');
    }

    return(        
        <>
            <HeadInfo title='로그인' />
            
            {
                load
                    ?
                <>
                    <div className="text-center py-20 h-full">
                        <h2 className="text-2xl mb-10 text-blue-500 underline underline-offset-8">Login</h2>
                        <input type="text" ref={idRef} placeholder="아이디 입력" className="block w-3/5 sm:w-2/5 mx-auto my-2 p-2 border-b border-b-blue-300 bg-transparent outline-0 rounded-none"/>
                        <input type="password" ref={pwRef}  placeholder="비밀번호 입력" className="block w-3/5 sm:w-2/5 mx-auto my-2 p-2 border-b border-b-blue-300 bg-transparent outline-0 rounded-none"/>
                        
                        <NoSsrReC setReCaptchaChk={setReCaptchaChk}/>

                        <button ref={submitRef} disabled={!reCaptchaChk} onClick={submit} className="block mx-auto mt-6 mb-2 p-2.5 w-3/5 sm:w-2/5 bg-gray-400 text-white rounded-md">로그인</button>

                        <Link href='/signup'><a className="block mx-auto mt-2 mb-10 p-2.5 w-3/5 sm:w-2/5 bg-blue-500 text-white rounded-md">회원가입</a></Link>
                    </div>
                </>
                    :
                <></>
            }
            
        </>
    )
}

export  default Signin