import axios from "axios"
import HeadInfo from "../../../components/headInfo"
import TopSection from "../../../components/topSection"
import { useSession } from "next-auth/react"


const Index = ({post}) => {

    const { data : session } = useSession();
    console.log(session)

    return(
        <>
            <HeadInfo title={post.title} />
            <TopSection />
            <div className="post-wrap my-4">

                <div className="post-info-wrap my-2.5 flex justify-between">
                    <div className="post-writer px-4 py-1.5  text-sm leading-6 bg-slate-200 shadow-md">{post.author}</div>
                    <div className="post-date px-4 py-1.5 bg-slate-200  text-sm leading-6 line shadow-md">{post.date}</div>
                </div>

                <h2 className="post-header my-2 px-4 py-2.5 bg-slate-200  shadow-md">
                    {post.title}
                </h2>

                <div className="post-content min-h-[500px] my-2.5 p-4 bg-slate-200  shadow-md">
                    {post.content}
                </div>

                <ul className="post-tag-wrap my-2.5 p-2.5 bg-slate-200  shadow-md text-sm text-gray-800 whitespace-nowrap	overflow-scroll noScroll">
                {
                    post.tags.map((t, idx)=>
                        <li key={t + idx} className="post-tags inline-block mr-2 px-3 py-1 bg-slate-400 text-xs text-white rounded-full">
                            {'#'+t}
                        </li>
                    )
                }
                </ul>

                <ul className="post-comment-wrap my-2.5">
                {
                    post.comments 
                        ?
                    <>
                    {
                        post.comments.map((c, idx) => 
                        <li key={idx} className="block mb-2.5 p-2.5 bg-slate-200 shadow-md">
                            <div className="inline-block comment-profile mb-2.5 px-2.5 py-1.5 bg-slate-300 text-sm rounded-xl">
                                {c.author}    
                            </div>
                            <div className="block comment-profile px-2.5 py-3 bg-slate-300 text-sm rounded-md">
                                {c.content}
                            </div>
                        </li>
                        )
                    }
                    </>
                        :      
                    <div className="no-comment my-2.5 p-3 bg-slate-200  text-center text-sm text-gray-700 shadow-md">
                        댓글이 없습니다. 댓글을 남겨보세요.😆
                    </div>
                }
                </ul>

                <div className="write-comment-wrap p-2.5 bg-slate-200 ">
                    <div className="inline-block comment-profile px-2.5 py-1.5 bg-slate-300 text-sm rounded-xl">
                    {
                        session
                            ?
                        <>{session.user.name}</>
                            :
                        <>Stranger</>
                    }
                    </div>
                    <textarea className="comment-profile block w-full min-h-[60px] p-2 my-2.5 bg-slate-50 border border-gray-300 text-sm
                    outline-none resize-none text-sm rounded-sm" />
                    <button className="w-full py-1.5 bg-slate-300 hover:bg-slate-400 hover:text-white transition duration-200 rounded-sm">댓글 쓰기</button>
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