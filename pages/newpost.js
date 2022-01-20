import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import HeadInfo from "../components/headInfo"
import dynamic from "next/dynamic"


const NoSsrWysiwyg = dynamic(()=> import('../components/wysiwyg'),
    { ssr : false }
)

const Newpost = () => {

    const { data: session, status } = useSession();
    const { replace } = useRouter();

    const [load, setLoad] = useState(false);

    useEffect(()=>{//로그인 상태면 페이지 강제 이동
        if(status === 'unauthenticated') replace('/signin');
        else if(status === 'authenticated') setLoad(true);
    }, [status]);

    const confirm = (content) => {
        console.log(content);
    }

    return(
        <>
        {
            load ?
            <>
                <HeadInfo title='글쓰기'/>
                <input type="text" placeholder="제목을 입력해주세요." className="w-full border rounded-md outline-none text-lg py-2 px-3 mb-3"/>
                <NoSsrWysiwyg confirm={confirm}/>
            </>
                : 
            <></>
        }
        </>
    )
}

export default Newpost