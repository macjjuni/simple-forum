import HeadInfo from "../../../components/headInfo"
import TopSection from "../../../components/topSection"

const Index = () => {

    return(
        <>
            <HeadInfo title={'글 제목'} />
            <TopSection />
            <div className="post-wrap my-4">
                <div className="post-info-wrap my-2.5 flex justify-between">
                    <div className="post-writer px-4 py-1.5  text-sm leading-6 bg-slate-200 shadow-md">닉네임</div>
                    <div className="post-date px-4 py-1.5 bg-slate-200  text-sm leading-6 line shadow-md">2022.01.18</div>
                </div>
                <h2 className="post-header my-2 px-4 py-2.5 bg-slate-200  shadow-md">
                    글 제목입니다.
                </h2>
                <div className="post-content min-h-[500px] my-2.5 p-4 bg-slate-200  shadow-md">
                    본문 내용입니다.
                </div>
                <ul className="post-tag-wrap my-2.5 p-2.5 bg-slate-200  shadow-md text-sm text-gray-800 whitespace-nowrap	overflow-scroll noScroll">
                    <li className="post-tags inline-block mr-2 px-3 py-1 bg-slate-400 text-white rounded-full">
                        #Tag1
                    </li>
                    <li className="post-tags inline-block mr-2 px-3 py-1 bg-slate-400 text-white rounded-full">
                        #Tag2
                    </li>
                    <li className="post-tags inline-block mr-2 px-3 py-1 bg-slate-400 text-white rounded-full">
                        #Tag3
                    </li>
                    <li className="post-tags inline-block mr-2 px-3 py-1 bg-slate-400 text-white rounded-full">
                        #Tag4
                    </li>
                    <li className="post-tags inline-block mr-2 px-3 py-1 bg-slate-400 text-white rounded-full">
                        #Tag5
                    </li>
                    <li className="post-tags inline-block mr-2 px-3 py-1 bg-slate-400 text-white rounded-full">
                        #Tag6
                    </li>
                </ul>
                
                <div className="no-comment my-2.5 p-3 bg-slate-200  text-center text-sm text-gray-700 shadow-md">
                    댓글이 없습니다. 댓글을 남겨보세요.😆
                </div>

                <ul className="post-comment-wrap my-2.5">
                    <li className="block mb-2.5 p-2.5 bg-slate-200  shadow-md">
                        <div className="inline-block comment-profile mb-2.5 px-2.5 py-1.5 bg-slate-300 text-sm rounded-full">Commenter</div>
                        <div className="block comment-profile px-2.5 py-3 bg-slate-300 text-sm ">
                            This is Comment! 이것은 댓글입니다.This is Comment! 이것은 댓글입니다.This is Comment! 이것은 댓글입니다.This is Comment! 이것은 댓글입니다.This is Comment! 이것은 댓글입니다.This is Comment! 이것은 댓글입니다.This is Comment! 이것은 댓글입니다.
                        </div>
                    </li>
                    
                    <li className="block mb-2.5 p-2.5 bg-slate-200  shadow-md">
                        <div className="inline-block comment-profile mb-2.5 px-2.5 py-1.5 bg-slate-300 text-sm rounded-full">Commenter</div>
                        <div className="block comment-profile px-2.5 py-3 bg-slate-300 text-sm ">
                            This is Comment! 이것은 댓글입니다.
                        </div>
                    </li>
                </ul>

                <div className="write-comment-wrap p-2.5 bg-slate-200 ">
                    <div className="inline-block comment-profile px-2.5 py-1.5 bg-slate-300 text-sm rounded-full">User</div>
                    <textarea className="comment-profile block w-full min-h-[60px] p-2 my-2.5 bg-slate-50 border border-gray-300 text-sm  outline-none resize-none text-sm" />
                    <button className="w-full py-1.5 bg-slate-300  hover:bg-slate-400 hover:text-white transition duration-200">댓글 쓰기</button>
                </div>

            </div>

        </>
    )
}

export default Index