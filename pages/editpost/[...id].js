import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import HeadInfo from "../../components/headInfo"
import dynamic from "next/dynamic"
import axios from "axios"
import NewPostSkeleton from "../../components/newpostSkeleton";

const NoSsrWysiwyg = dynamic(()=> import('../../components/wysiwyg'),
    { 
        loading: () => <NewPostSkeleton/>,
        ssr : false
    }
)

const Editpost = ({post}) => {

    const { data: session, status } = useSession();
    const { push, replace, query } = useRouter();

    const [load, setLoad] = useState(false);

    useEffect(()=>{//로그인 상태면 페이지 강제 이동
        if(status === 'unauthenticated') replace('/_error');
        else if(status === 'authenticated'){
            if(post.author === session.user.name){
                setLoad(true);
            }
        }
    }, [status]);

    const uploadDB = async(post) => {
        
        //글 수정 API 
        const res = await axios({ method : 'POST', url : `/api/db/post/update/post/${query.id[0]}`, data : {...post, author : session.user.name} });
        if(res.data.error === null) push(`/post/${query.id[0]}`);
        else console.log(res);

    }

    return(
        <>
        {
            load ?
            <>  
                <div className="post-wrap mx-auto my-4 max-w-screen-xl">
                    <HeadInfo title='글쓰기'/>
                    <NoSsrWysiwyg uploadDB={uploadDB} init={post}/>
                </div>
            </>
                :
            <></>
        }
        </>
    )
}


export const getServerSideProps = async(param) => {
    const { query } = param;
    const id = query.id[0];
    try{
        const res = await axios({method : 'POST', url : `http://localhost:${process.env.PORT}/api/db/post/read/${id}`, data : { id : 'simple-forum' }});
        if(res.status === 200){
            return {
                props : { post : res.data[0] }
            }
        }else{
            return {
                redirect: {
                    destination: '/_error',
                }
            }
        }
    } catch(err){
        return {
            redirect: {
                destination: '/_error',
            }
        }
    }
}


export default Editpost