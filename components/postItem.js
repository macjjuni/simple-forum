import Link from "next/link"

const PostItem = ({_id, title, author, tags, date, comments}) => {

    return(
        <> 
            <li className="bg-slate-100 dark:bg-slate-700 hover:bg-blue-100 dark:hover:bg-slate-800 truncate shadow-md hover:scale-[1.02] transition-[transform] ctd">
                <Link href={`/post/${_id}`} passHref>
                <a className="block">
                    <div className="p-3">
                        {/* 제목 & 댓글 수 */}
                        <div className="title-comment-wrap flex justify-between justify-items-center mb-2">
                            <h3 className="inline-block text-lg w-full text-ellipsis text-black dark:text-white overflow-hidden ctd">{title}</h3>
                            <p className="inline-block px-1.5 py-0.5 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg ctd">{'+'+comments.length}</p>
                        </div>
                        {/* 태그 */}
                        <div className="tag-wrap flex justify-between justify-items-center w-full h-fit text-xs sm:text-sm">
                            <ul className="inline-block w-full overflow-scroll mr-1 noScroll leading-tight">
                                {
                                    tags.map((t, idx) => 
                                    <li key={t+idx} className="tags-wrap inline-block mr-2 px-1.5 py-1 rounded-lg bg-slate-400 dark:bg-slate-900 text-xs text-white shadow-lg ctd">
                                        {t}
                                    </li>
                                    )        
                                }
                            </ul>
                            {/* 작성일 */}
                            <p className="author-date-wrap flex justify-around items-center min-w-[100px] text-xs text-gray-800 dark:text-gray-300 text-right">
                                {author} 
                                <span className="inline-block border-l border-gray-400 text-sm text-black dark:text-white ctd mx-1.5 h-2.5" />
                                {date.substr(0, 10).replace(/-/g, '.')}
                            </p>
                        </div>

                    </div>
                </a>
                </Link>
            </li>
        </>
    )
}

export default PostItem