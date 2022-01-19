import { useSession, getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import HeadInfo from "../components/headInfo"
import dynamic from "next/dynamic"


const NoSsrWysiwyg = dynamic(()=> import('../components/wysiwyg'),
    { ssr : false }
)

const Newpost = () => {

    const { data : session } = useSession(); 
    const { replace } = useRouter();

    const [load, setLoad] = useState(false);

    useEffect(async()=>{//로그인 상태면 페이지 강제 이동
        if(session === undefined){ //새로고침 또는 url 이동 시
            const _session = await getSession();
            if(_session === null) replace('/signin');
            else setLoad(true);
        }else if(session === null){
            replace('/signin');
        }else{ setLoad(true); }
    }, []);

    const confirm = (content) => {
        console.log(content);
    }

    return(
        <>
        {
            load ?
            <>
                <HeadInfo title='글쓰기'/>
                <input type="text" className="w-full border rounded-md outline-none text-md py-2 px-3 mb-3"/>
                <NoSsrWysiwyg confirm={confirm}/>
            </>

                : 

            <></>
        }
        </>
    )
}

export default Newpost