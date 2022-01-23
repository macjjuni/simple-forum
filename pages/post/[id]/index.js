import axios from "axios"
import HeadInfo from "../../../components/headInfo"
import TopSection from "../../../components/topSection"
import { useSession } from "next-auth/react"
import { useEffect, useRef } from "react"
import { useRouter } from "next/router"

const Index = ({post}) => {

    const { data : session } = useSession();
    const { push } = useRouter();

    const viewRef = useRef(null);
    const commentRef = useRef(null);

    const writeComment = () => {
        if(session){
            const txt = commentRef.current.value;
            //댓글 입력 api 작성
        }else{
            push('/signin');
        }
    }

    return(
        <>
            <HeadInfo title={post.title} />
            <div className="post-wrap mx-auto my-4 max-w-screen-md">
                
                {/* 제목 / 작성자 / 작성일 */}
                <div className="post-header relative px-2 pt-8 pb-2 lg:pb-6 my-3 rounded">
                <span className="absolute top-0 right-0 px-1.5 py-0.5 text-sm font-bold bg-slate-500 text-white rounded shadow-md">🪧 Title</span> 
                    <h2 className="mb-2 text-2xl">{post.title}</h2>

                    <div className="post-info-wrap text-sm">
                        {post.author} <span className="inline-block border-l border-gray-500 mx-1.5 h-2.5" /> {post.date.substr(0, 10).replace(/-/g, '.')}
                    </div>
                </div>

                {/* 본문 내용 */}
                <div className="post-content-wrap relative min-h-[400px] bg-slate-200 shadow-base rounded shadow-md">
                    <span className="absolute top-0 right-0 px-1.5 py-0.5 bg-white text-sm font-bold text-black rounded-bl shadow-md">📄 Content</span> 
                    <div className="post-content my-3 p-5  leading-6"
                    dangerouslySetInnerHTML={ {__html: post.content} } />
                </div>
                
            
                {/* 태그 */}
                
                <div className="post-tag-wrap relative relative my-3 rounded shadow-md">
                <span className="absolute top-0 right-0 px-1.5 py-0.5 bg-white text-sm font-bold text-black rounded-bl shadow-md">🏷 Tag</span> 
                <ul className="text-sm text-gray-800 px-2.5 py-4 pr-9 bg-slate-200 whitespace-nowrap overflow-scroll noScroll rounded">
                
                {
                    post.tags.map((t, idx)=>
                        <li key={t + idx} className="post-tags inline-block mr-2.5 px-3 py-1.5 text-gray-800 bg-white text-sm rounded-xl shadow-md">
                            {'#'+t}
                        </li>
                    )
                }
                </ul>
                </div>

                {/* 댓글 목록 */}
                
                <ul className="post-comment-wrap my-3">
                {
                    post.comments 
                        ?
                    <>
                    {
                        post.comments.map((c, idx) => 
                        <li key={idx} className="relative block mb-2.5 p-2.5 bg-slate-200 rounded shadow-md">
                            <span className="absolute top-0 right-0 px-1.5 py-0.5 bg-white text-sm font-bold text-black rounded-bl shadow-md">✉️ Comments</span>     
                            <div className="inline-block comment-profile mb-2.5 px-2.5 py-1.5 bg-slate-50 text-sm rounded-md">
                                {c.author}    
                            </div>
                            <div className="block comment-profile px-2.5 py-3 bg-slate-50 text-sm rounded-sm">
                                {c.content}
                            </div>
                        </li>
                        )
                    }
                    </>
                        :      
                    <div className="no-comment my-3 p-3 bg-slate-200 text-center text-sm text-gray-700 rounded shadow-md">
                        댓글이 없습니다. 댓글을 남겨보세요.😆
                    </div>
                }
                </ul>

                {/* 댓글입력창 */}
                <div className="write-comment-wrap relative my-3 p-2.5 bg-slate-200 rounded">
                <span className="absolute top-0 right-0 px-1.5 py-0.5 bg-white text-sm font-bold text-black rounded-bl shadow-md">✏️ Write</span> 
                    <div className="inline-block comment-profile px-2 py-1 bg-slate-50 text-sm rounded">
                    {
                        session
                            ?
                        <>{session.user.name}</>
                            :
                        <>Stranger</>
                    }
                    </div>
                    <textarea ref={commentRef} className="comment-profile block w-full min-h-[60px] p-2 my-2.5 bg-slate-50 border border-gray-300 text-sm
                    outline-none resize-none text-sm rounded-sm" />
                    
                    <button onClick={writeComment} className="w-full py-1.5 text-gray-100 bg-blue-400 hover:bg-blue-500 transition duration-200 rounded-sm">
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

    if(res.status === 200){
        return{
            props : { post : res.data[0] }
        }
    }else{

    }

    
}


export default Index