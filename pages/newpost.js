import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import HeadInfo from "../components/headInfo"
import dynamic from "next/dynamic"
import axios from "axios"
import NewPostSkeleton from "../components/newpostSkeleton";

const NoSsrWysiwyg = dynamic(()=> import('../components/wysiwyg'),
    { 
        loading: () => <NewPostSkeleton/>,
        ssr : false
    }
)

const Newpost = () => {

    const { data: session, status } = useSession();
    const { push, replace } = useRouter();

    const [load, setLoad] = useState(false);

    useEffect(()=>{//로그인 상태면 페이지 강제 이동
        if(status === 'unauthenticated') replace('/signin');
        else if(status === 'authenticated') setLoad(true);
    }, [status]);

    const confirm = async(content, check) => {
        
        if(content.title !== '' && check !== '' ){
            const newPost = {
                ...content,
                author : session.user.name.nicname,
                comments : [],
            }
            //글 작성 API 
            const res = await axios({ method : 'POST', url : '/api/db/post/create/post', data : { ...newPost, session } });
            if(res.data.error === null) push(`/post/${res.data.no}`);
            else console.log(res);
        }else{
            alert('제목 및 내용을 입력해주세요.');
        }
    }

    return(
        <>
        {
            load ?
            <>  
                <div className="post-wrap mx-auto my-4 max-w-screen-md">
                    <HeadInfo title='글쓰기'/>
                    <NoSsrWysiwyg confirm={confirm}/>
                </div>
            </>
                :
            <></>
        }
        </>
    )
}

export default Newpost