import axios from "axios"
import HeadInfo from "../../../components/headInfo"
import { useSession } from "next-auth/react"
import { useRef, useState } from "react"
import { useRouter } from "next/router"

const Index = ({post}) => {

    const { data : session, status } = useSession();
    const { push, query } = useRouter();

    const [comments, setComments] = useState(post.comments);
    const commentRef = useRef(null);

    const deletePost = async() => {
        let alert = confirm("글을 삭제하시겠습니까?");
        if (alert) {
            const check = await axios({ method : 'POST', url : `/api/db/post/delete/${query.id}`, data : { author : session.user.name } });
            if(check.data.error === null){ 
                push('/');
            }else{
                console.log(check);
            }
        }
    }

    const editPost = () => {
        push(`/editpost/${query.id}`);
    }

    const writeComment = (e) => { //글 작성
        const txt = commentRef.current.value.trim();
        if(session){
            if( txt !== ''){ //내용이 없을 경우
                axios({ method : 'POST', url : '/api/db/post/create/comment',
                    data : { target : query.id, author : session.user.name , comment : txt }})
                .then(res => {
                    if(res.data.error === null){
                        setComments([...post.comments, {content : txt, author : session.user.name}]); //업데이트 완료 후 댓글 추가
                        commentRef.current.value = '';
                        e.target.classList.replace('bg-red-400', 'bg-blue-400');
                        e.target.classList.replace('hover:bg-red-500', 'hover:bg-blue-500');
                    }else{
                        console.log(res);
                    }
                }).catch(err => console.log(err));
            }else{
                e.target.classList.replace('bg-blue-400', 'bg-red-400');
                e.target.classList.replace('hover:bg-blue-500', 'hover:bg-red-500');
            }           
        }else{
            push('/signin');
        }
    }

    return(
        <>
            <HeadInfo title={post.title} />

            <div className="post-wrap mx-auto my-4 max-w-screen-md ctd">

                {/* 제목 / 작성자 / 작성일 */}
                <div className="post-header relative px-2 pt-8 pb-2 lg:pb-6 my-3 rounded">
                <span className="absolute top-0 right-0 px-1.5 py-0.5 text-sm font-bold bg-slate-500 text-white rounded shadow-md">🪧 Title</span> 
                    <h2 className="mb-2 text-2xl text-black dark:text-white ctd">
                        {post.title}
                    </h2>

                    <div className="post-info-wrap flex justify-between">
                        <div className="master-left inline-block text-black dark:text-white ctd">
                        {post.author} <span className="inline-block border-l border-gray-500 text-sm text-black dark:text-white ctd mx-1.5 h-2.5" /> {post.date.substr(0, 10).replace(/-/g, '.')}
                        </div>
                        {
                            status === 'loading' || status === 'unauthenticated' ? //로그인 여부 및 작성자 체크
                            <></>
                                :
                            <>
                                {
                                    session.user.name === post.author ?
                                    <div className="master-wrap inline-block text-black dark:text-white ctd">
                                        <button onClick={deletePost} className="hover:underline">삭제</button>
                                        <button onClick={editPost} className="ml-3 hover:underline">수정</button>
                                    </div>
                                        :
                                    <></>
                                }
                            </>
                        }
                        
                    </div>
                </div>

                {/* 본문 내용 */}
                <div className="post-content-wrap relative min-h-[400px] bg-slate-100 dark:bg-slate-700 ctd shadow-base overflow-hidden rounded shadow-md">
                    <span className="absolute top-0 right-0 px-1.5 py-0.5 bg-white text-sm font-bold text-black rounded-bl shadow-md">📄 Content</span> 
                    <div className="post-content p-5 leading-6 text-black dark:text-white ctd"
                    dangerouslySetInnerHTML={ {__html: post.content} } />
                </div>
                
            
                {/* 태그 */}
                
                <div className="post-tag-wrap relative relative my-3 rounded shadow-md">
                <span className="absolute top-0 right-0 px-1.5 py-0.5 bg-white text-sm font-bold text-black rounded-bl shadow-md">🏷 Tag</span> 
                <ul className="text-sm text-gray-800 px-2.5 py-5 md:py-3.5 min-h-[60px] pr-9 bg-slate-100 dark:bg-slate-700 whitespace-nowrap overflow-scroll noScroll rounded ctd">
                
                {
                    post.tags.map((t, idx)=>
                        <li key={t + idx} className="post-tags inline-block mr-2.5 px-3 py-1.5 text-sm text-gray-800 dark:text-gray-300 bg-white dark:bg-gray-900 rounded-xl shadow-md ctd">
                            {'#'+t}
                        </li>
                    )
                }
                </ul>
                </div>

                {/* 댓글 목록 */}
                
                <ul className="post-comment-wrap my-3">
                {
                    comments.length !== 0 
                        ?
                    <>
                    {
                        comments.map((c, idx) => 
                        <li key={idx} className="relative block mb-2.5 p-2.5 bg-slate-100 dark:bg-slate-700 text-black dark:text-white rounded shadow-md ctd">
                            <span className="absolute top-0 right-0 px-1.5 py-0.5 bg-white text-sm font-bold text-black rounded-bl shadow-md">✉️ Comments</span>     
                            <div className="inline-block comment-profile mb-2.5 px-2.5 py-1.5 text-sm bg-slate-50 dark:bg-slate-500 text-black dark:text-white rounded-md ctd">
                                {c.author}    
                            </div>
                            <div className="block comment-profile px-2.5 py-3 text-sm bg-slate-50 dark:bg-slate-500 text-black dark:text-white rounded-sm ctd">
                                {c.content}
                            </div>
                        </li>
                        )
                    }
                    </>
                        :      
                    <div className="no-comment my-3 p-3 text-sm text-gray-700 dark:text-gray-300 bg-slate-100 dark:bg-slate-700 text-center rounded shadow-md ctd">
                        댓글이 없습니다. 댓글을 남겨보세요.😆
                    </div>
                }
                </ul>

                {/* 댓글입력창 */}
                <div className="write-comment-wrap relative my-3 p-2.5 bg-slate-100 dark:bg-slate-700 rounded ctd">
                <span className="absolute top-0 right-0 px-1.5 py-0.5 bg-white text-sm font-bold text-black rounded-bl shadow-md">✏️ Write</span> 
                    <div className="inline-block comment-profile px-2 py-1 text-sm bg-white dark:bg-slate-400 text-black dark:text-white rounded ctd">
                    {
                        session
                            ?
                        <>{session.user.name}</>
                            :
                        <>Stranger</>
                    }
                    </div>
                    <textarea ref={commentRef} className="comment-profile block w-full min-h-[60px] p-2 my-2.5  text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 ctd
                    outline-none resize-none text-sm rounded-sm"/>
                    
                    <button onClick={writeComment} className="w-full py-1.5 text-gray-100 bg-blue-400 hover:bg-blue-500 rounded-sm ctd">
                        댓글 쓰기
                    </button>
                </div>
            </div>
        </>
    )
}



export const getServerSideProps = async({query}) => {
    
    const { id } = query;
    const res = await axios({ //게시글 목록 불러오기
        method : 'POST',
        url : `http://localhost:${process.env.PORT}/api/db/post/${id}`,
        data : { id : 'simple-forum' }
    });

    if(res.status === 200 && res.data[0] ){
        return{
            props : { post : res.data[0] }
        }
    }else{
        return{
            notFound : true    
        }
    }

    
}


export default Index