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

const Editpost = () => {

    const { data: session, status } = useSession();
    const { push, replace, query } = useRouter();

    const [load, setLoad] = useState(false);
    const [init, setInit] = useState('');

    useEffect(()=>{//로그인 상태면 페이지 강제 이동
        if(status === 'unauthenticated') replace('/signin');
        else if(status === 'authenticated') getPost();
    }, [status]);

    const getPost = async() => {
        const res = await axios({method : 'POST', url : `/api/db/post/read/${query.editpost[1]}`, data : { id : 'simple-forum' }});
        const post = res.data[0];
        if(post && post.author === session.user.name.nicname){
            setInit(post); //수정 데이터 초기화
            setLoad(true);
        }else{
            alert('잘못된 접근입니다.')
            replace('/');
        }        
    }


    const confirm = async(content, check) => {
        
        if(content.title !== '' && check !== '' ){
              //글 수정 API 
            const res = await axios({ method : 'POST', url : `/api/db/post/update/post/${query.editpost[1]}`, data : {...content, author : session.user.name.nicname} });
            if(res.data.error === null) push(`/post/${query.editpost[1]}`);
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
                    <NoSsrWysiwyg confirm={confirm} init={init}/>
                </div>
            </>
                :
            <></>
        }
        </>
    )
}

export default Editpost