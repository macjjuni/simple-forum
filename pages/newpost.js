import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
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

    const confirm = (content) => {
        
        if(content !== ''){

            const newPost = {
                ...content,
                author : session.user.name,
                comments : [],
            }
            console.log(newPost)
            //글 작성 API 
            axios({ method : 'POST',
                    url : '/api/db/post/create/post',
                    data : newPost,
            }).then(res=> {
                if(res.data.error === null) push(`/post/${res.data.no}`);
                else console.log(res.data);
            }).catch(err => console.log(err) );

            
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
                <NoSsrWysiwyg confirm={confirm}/>
            </>
                :
            <></>
        }
        </>
    )
}

export default Newpost