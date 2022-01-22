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

    console.log(post.date)

    return(
        <>
            <HeadInfo title={post.title} />
            <TopSection />
            <div className="post-wrap my-4">
                
                {/* 제목 / 작성자 / 작성일 */}
                <div className="post-header my-3 p-2.5">
                    <h2 className="mb-2 text-xl">{post.title}</h2>

                    <div className="post-info-wrap text-xs">
                        {post.author} <span className="inline-block border-l border-gray-500 mx-1.5 h-2.5" /> {post.date.substr(0, 10).replace(/-/g, '.')}
                    </div>
                </div>

                {/* 본문 내용 */}
                <div className="post-content min-h-[500px] my-3 px-4 py-3 bg-slate-200 shadow-base leading-6 rounded shadow-md"
                    dangerouslySetInnerHTML={ {__html: post.content} } />
            
                {/* 태그 */}
                <ul className="post-tag-wrap relative my-3 p-2.5 pr-9 shadow-md text-sm text-gray-800 bg-slate-200 whitespace-nowrap overflow-scroll noScroll rounded">
                <span className="absolute top-0 right-0 px-1.5 py-0.5 bg-white text-xs font-bold text-blue-600 rounded-bl">Tag</span>
                {
                    post.tags.map((t, idx)=>
                        <li key={t + idx} className="post-tags inline-block mr-2.5 px-2.5 py-1.5 text-white bg-slate-400 text-xs rounded-lg">
                            {'#'+t}
                        </li>
                    )
                }
                </ul>

                {/* 댓글 목록 */}
                <ul className="post-comment-wrap my-3">
                {
                    post.comments 
                        ?
                    <>
                    {
                        post.comments.map((c, idx) => 
                        <li key={idx} className="block mb-2.5 p-2.5 bg-slate-200 shadow-md">
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
                <div className="write-comment-wrap my-3 p-2.5 bg-slate-200 rounded">
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