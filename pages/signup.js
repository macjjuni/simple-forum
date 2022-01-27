import dynamic from "next/dynamic"
import HeadInfo from "../components/headInfo"

import { useSession } from "next-auth/react"
import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/router"

import axios from "axios"
import { debounce } from "lodash"

const NoSsrReC = dynamic(()=> import('../components/recaptchaV2'), { ssr : false});

const pattern_spc = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g; //특수문자 유효성 체크
const pattern_num = /[0-9]/; //숫자 유효성 체크
const pattern_eng = /[a-zA-Z]/; //영문 유효성 체크
const pattern_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; //한글 유효성 체크
const pattern_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/; //이메일 형식 유효성 체크

const Signup = () => {

    const { data : session, status } = useSession();

    const idRef = useRef(null);
    const idAlertRef = useRef(null);
    const pwRef = useRef(null);
    const pwAlertRef = useRef(null);
    const pw2Ref = useRef(null);
    const pw2AlertRef = useRef(null);
    const emailRef = useRef(null);
    const emailAlertRef = useRef(null);
    const nicRef = useRef(null);
    const nicAlertRef = useRef(null);
    const submitRef = useRef(null);

    const [load, setLoad] = useState(false);
    
    //유효성 검사 확인(유효성 체크 O -> 중복 체크)
    const [idTriger, setIdTriger] = useState(false);
    const [emailTriger, setEmailTriger] = useState(false);
    const [nicTriger, setNicTriger] = useState(false);

    //중복 체크 확인
    const [compId, setCompId] = useState(false);
    const [compPw, setCompPw] = useState(false);
    const [compPw2, setCompPw2] = useState(false);
    const [compEmail, setCompEmail] = useState(false);
    const [compNic, setCompNic] = useState(false);

    const [reCaptchaChk, setReCaptchaChk] = useState(false);
    const { replace, push } = useRouter();


    useEffect(()=>{//로그인 상태면 페이지 강제 이동
        if(status === 'authenticated') replace('/');
        else if(status === 'unauthenticated') setLoad(true);
    }, [status]);
    useEffect(()=>{
        if(reCaptchaChk) submitRef.current.classList.replace('bg-gray-400', 'bg-blue-500');
        else{
            if(submitRef.current){
                submitRef.current.classList.replace('bg-blue-500', 'bg-gray-400');
                submitRef.current.classList.replace('bg-red-500', 'bg-gray-400');
            }
        }
    }, [reCaptchaChk]);

    //아이디 형식 체크
    const patternChk_id = () => {
        setIdTriger(false); //유효성 X
        setCompId(false); //중복 체크 X
        delete_space(idRef.current); //공백 제거
        const id = idRef.current.value;
        const length = id.length;
        if(length > 5 && !pattern_spc.test(id)){
            if(pattern_eng.test(id)){
                const msg = '올바른 형식의 아이디입니다.';
                show_comp(idAlertRef.current, idRef.current, msg);
                setIdTriger(true);
            }else{
                const msg = '영문자를 포함한 아이디를 입력해주세요.';
                show_err(idAlertRef.current, idRef.current, msg);
                setIdTriger(false);
            }
        }else if(length === 0){
            const msg = '';
                show_comp(idAlertRef.current, idRef.current, msg);
        }else{
            const msg = '특수문자를 제외한 6자리 이상의 아이디를 입력해주세요.';
            show_err(idAlertRef.current, idRef.current, msg);
            setIdTriger(false);
        }
    }
    //비밀번호 형식 체크
    const patternChk_pw = () => {
        setCompPw(false); //유효성 X
        delete_space(pwRef.current); //공백 제거
        const pw = pwRef.current.value;
        const length = pw.length;
        const spc_chk = pattern_spc.test(pw);
        const num_chk = pattern_num.test(pw);
        const eng_chk = pattern_eng.test(pw);

        if(length>7){ //문자 길이 체크
            if(spc_chk && num_chk && eng_chk){
                const msg = '올바른 비밀번호입니다.'
                show_comp(pwAlertRef.current, pwRef.current, msg);
                setCompPw(true);
            }else{
                const msg = '특수문자, 영문자, 숫자의 조합으로 입력해주세요.';
                show_err(pwAlertRef.current, pwRef.current, msg);
            }
        }else if(length === 0){
            pwAlertRef.current.innerText = '';
            show_comp(pwAlertRef.current, pwRef.current, '');
        }else{
            const msg = '8~15자리 이상의 비밀번호를 입력해주세요.';
            show_err(pwAlertRef.current, pwRef.current, msg);
        }
    }
    //비밀번호 일치 체크
    const sameChk_pw = () => {
        setCompPw2(false); //유효성 X
        delete_space(pw2Ref.current); //공백 제거
        const pw = pwRef.current.value;
        const pw2 = pw2Ref.current.value;
        const length = pw2Ref.current.value.length;

        if(length !== 0){
            if(pw === pw2){
                const msg = '동일한 비밀번호입니다.';
                show_comp(pw2AlertRef.current, pw2Ref.current, msg);
                setCompPw2(true);
            }else{
                const msg = '비밀번호가 일치하지 않습니다.';
                show_err(pw2AlertRef.current, pw2Ref.current, msg);
            }
        }else{
            show_comp(pw2AlertRef.current, pw2Ref.current, '');
        }       
    }
    //이메일 형식 체크
    const patternChk_email = () => {
        setEmailTriger(false); // 유효성 X
        setCompEmail(false); // 중복 체크 X

        delete_space(emailRef.current);
        const email = emailRef.current.value;
        const length = email.length;
        const email_chk = pattern_email.test(email);

        if(length !== 0){
            if(email_chk){
                setEmailTriger(true); //유효성 O
                const msg = '올바른 형식의 이메일입니다.';
                show_comp(emailAlertRef.current, emailRef.current, msg);
            }else{
                setEmailTriger(false);
                const msg = '이메일 형식이 올바르지 않습니다.';
                show_err(emailAlertRef.current, emailRef.current, msg);
            }
        }else{
            show_comp(emailAlertRef.current, emailRef.current, '');
        }
    }
    //닉네임 길이 및 특수문자 체크
    const lengthChk_nic = () => {
        setNicTriger(false); // 유효성 X
        setCompNic(false); // 중복 체크 X
        delete_space(nicRef.current);

        const nic = nicRef.current.value;
        const length = nic.length;

        if(length > 1){
            if( !pattern_spc.test(nic) ){
                setNicTriger(true); // 유효성 O
                const msg = '올바른 형식의 닉네임입니다.';
                show_comp(nicAlertRef.current, nicRef.current, msg);
            }else{
                const msg = '특수문자를 제외한 닉네임을 입력해주세요.';
                show_err(nicAlertRef.current, nicRef.current , msg);
            }
        }else if(length === 0){
            show_comp(nicAlertRef.current, nicRef.current, '');
        }else{
            const msg = '2자리 이상의 닉네임을 입력해주세요.';
            show_err(nicAlertRef.current, nicRef.current, msg);
        }
    }
    //공백 제거
    const delete_space = (ele) => {
        const before = ele.value;
        ele.value = before.replace(/ /g,""); //공백 제거
    }
    //에러 표시
    const show_err = (alertEle, inputEle, msg) => {
        alertEle.innerText = msg;
        inputEle.classList.replace('border-b-blue-400', 'border-b-red-400');
        alertEle.classList.replace('text-black', 'text-red-400');
        alertEle.classList.replace('text-blue-400', 'text-red-400');
    }
    //완료 표시
    const show_comp = (alertEle, inputEle, msg) => {
        alertEle.innerText = msg;
        inputEle.classList.replace('border-b-red-400', 'border-b-blue-400');
        alertEle.classList.replace('text-black', 'text-blue-400');
        alertEle.classList.replace('text-red-400', 'text-blue-400');
    }
    //기본 표시
    const show_visual = (alertEle, inputEle, msg) => {
        alertEle.innerText = msg;
        inputEle.classList.replace('border-b-red-400', 'border-b-blue-400');
        alertEle.classList.replace('text-black', 'text-blue-400');
        alertEle.classList.replace('text-red-400', 'text-blue-400');
    }

    //아이디 중복 체크
    const duplicateChk_id = debounce(() => {
        if(idTriger && !compId){ //유효성 O && 중복 체크 X
            axios({ method : 'POST', url : '/api/db/user/duplicate/id', data : { id : idRef.current.value} })
            .then(res=> { 
                if(res.data.error === null){ //중복 id가 없을 경우
                    const msg = '사용할 수 있는 아이디입니다.';
                    show_comp(idAlertRef.current, idRef.current, msg);
                    setCompId(true); //중복 체크 O
                }else{
                    const msg = '사용할 수 없는 아이디입니다.';
                    show_err(idAlertRef.current, idRef.current, msg);
                }
            })
            .catch(err=> { console.log(err) });
        }
    }, 500);
    //이메일 중복 체크
    const duplicateChk_email = debounce(() => {
        if(emailTriger && !compEmail){
            
            axios({ method : 'POST', url : '/api/db/user/duplicate/email', data : { email : emailRef.current.value} })
            .then(res => {
                if(res.data.error === null){ //중복 email이 없을 경우
                    const msg = '사용할 수 있는 이메일입니다.';
                    show_comp(emailAlertRef.current, emailRef.current, msg);
                    setCompEmail(true); //중복 체크 O
                }else{
                    const msg = '사용할 수 없는 이메일입니다.';
                    show_err(emailAlertRef.current, emailRef.current, msg);
                }
            }).catch(err=> { console.log(err) });

        }
    }, 500);
    //닉네임 중복 체크
    const duplicateChk_nic = debounce(() => {
        if(nicTriger && !compNic){
            
            axios({ method : 'POST', url : '/api/db/user/duplicate/nicname', data : { nicname : nicRef.current.value} })
            .then(res => {
                if(res.data.error === null){ //중복 nicname이 없을 경우
                    const msg = '사용할 수 있는 닉네임입니다.';
                    show_comp(nicAlertRef.current, nicRef.current, msg);
                    setCompNic(true); //중복 체크 O
                }else{
                    const msg = '사용할 수 없는 닉네임입니다.';
                    show_err(nicAlertRef.current, nicRef.current, msg);
                }
            }).catch(err=> { console.log(err) });

        }
    }, 500);

    const onSubmit = async() => {

        if(compId && compPw && compPw2 && compEmail && compNic){
            axios({ method : 'POST', url : '/api/db/user/create/user',
                data : {
                    id : idRef.current.value,
                    pw : pwRef.current.value,
                    email : emailRef.current.value,
                    nicname : nicRef.current.value,
                }
            }).then(res => {
                if(res.status === 200) push('/signin'); //계정 생성 완료
            }).catch(err => { console.log(err); })
        }

    }

    return (
        
        <>
            <HeadInfo title='회원가입' />
            {
                load
                    ?
                <>  
                    <div className="text-center py-20">

                        <div className="signup-wrap w-[260px] m-auto">

                            <h2 className="text-2xl mb-10 text-blue-500 underline underline-offset-8">Create Account</h2>
                            <input ref={idRef} onChange={patternChk_id} onBlur={duplicateChk_id} type='text' placeholder="아이디" maxLength={15} className="block w-full my-1.5 px-3 py-2 border-b border-b-blue-400 bg-transparent outline-0 focus:outline-none rounded-none"/>
                            <p ref={idAlertRef} className="h-[16px] px-2 text-left text-xs text-black"/>
                            <input ref={pwRef} onChange={patternChk_pw} type='password' placeholder="비밀번호" maxLength={15} className="block w-full mx-auto my-1.5 px-3 py-2 border-b border-b-blue-400 bg-transparent outline-0 focus:outline-none rounded-none "/>
                            <p ref={pwAlertRef} className="h-[16px] px-2 text-left text-xs text-black"/>
                            <input ref={pw2Ref} onChange={sameChk_pw} type='password' placeholder="비밀번호 확인" maxLength={15} className="block w-full mx-auto my-1.5 px-3 py-2 border-b border-b-blue-400 bg-transparent outline-0 focus:outline-none rounded-none"/>
                            <p ref={pw2AlertRef} className="h-[16px] px-2 text-left text-xs text-black"/>
                            <input ref={emailRef} onChange={patternChk_email} onBlur={duplicateChk_email} type='text' maxLength={30} placeholder="이메일(E-mail)" className="block w-full mx-auto my-1.5 px-3 py-2 border-b border-b-blue-400 bg-transparent outline-0 focus:outline-none rounded-none"/>
                            <p ref={emailAlertRef} className="h-[16px] px-2 text-left text-xs text-black"/>
                            <input ref={nicRef} onChange={lengthChk_nic} onBlur={duplicateChk_nic} type='text' maxLength={10} placeholder="닉네임" className="block w-full mx-auto my-1.5 px-3 py-2 border-b border-b-blue-400 bg-transparent outline-0 focus:outline-none rounded-none"/>
                            <p ref={nicAlertRef} className="h-[16px] px-2 text-left text-xs text-black"/>
                            
                            <NoSsrReC setReCaptchaChk={setReCaptchaChk}/>
                            
                            <button onClick={onSubmit} ref={submitRef} disabled={!reCaptchaChk} className="block mx-auto mt-6 mb-10 p-2.5 w-full bg-gray-400 text-white rounded-md">확인</button>
                        </div>
                    </div>
                </>
                    :
                <></>
            }
        </>
    )
}


export default Signup