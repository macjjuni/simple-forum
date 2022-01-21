import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import HeadInfo from "../components/headInfo"
import dynamic from "next/dynamic"


const NoSsrWysiwyg = dynamic(()=> import('../components/wysiwyg'),
    { ssr : false }
)

const Newpost = () => {

    const { data: session, status } = useSession();
    const { replace } = useRouter();

    const titleRef = useRef(null);
    const [load, setLoad] = useState(false);

    useEffect(()=>{//로그인 상태면 페이지 강제 이동
        if(status === 'unauthenticated') replace('/signin');
        else if(status === 'authenticated') setLoad(true);
    }, [status]);

    const confirm = (content) => {
        const title = titleRef.current.value;
        
        if(title !== '' && content !== ''){
            console.log('게시글 작성 API 실행')    
        }else{
            console.log('제목 및 내용을 입력해주세요.')
        }
    }

    return(
        <>
        {
            load ?
            <>
                <HeadInfo title='글쓰기'/>
                <input ref={titleRef} type="text" placeholder="제목을 입력해주세요." className="w-full border rounded-md outline-none text-lg py-2 px-3 mb-3"/>
                <NoSsrWysiwyg confirm={confirm}/>
            </>
                : 
            <></>
        }
        </>
    )
}

export default Newpost