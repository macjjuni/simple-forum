import Link from "next/link"
import LazyThumb from './lazyThumb'
import { BsImage } from 'react-icons/bs'

const PostItem = ({_id, title, author, tags, date, comments, thumbnail}) => {

    return(
        <> 
            <li className="post-item bg-slate-100 dark:bg-gray-700 truncate rounded-sm overflow-hidden hover:scale-[1.05] transition-[transform]">
                <Link href={`/post/${_id}`} scroll={true} passHref>
                <a className="block">
                
                {
                    thumbnail !== 'null' && thumbnail !== undefined ?
                    <div className="thumb-wrap bg-white dark:bg-slate-800">
                        <LazyThumb src={thumbnail} alt='thumbnail' width='620' height='380'/>   
                    </div>
                        :
                    <div className="thumb-img flex justify-center items-center bg-white dark:bg-gray-800 ">
                        <BsImage className="text-[6rem] text-gray-300"/>   
                    </div>
                }
                
                
                <div className="subtitle py-2.5 px-2">
                    {/* 제목 & 댓글 수 */}
                    <div className="flex justify-between justify-items-center mb-2">
                            <h3 className="inline-block text-md sm:text-md w-full text-ellipsis text-black dark:text-white overflow-hidden ">{title}</h3>
                            <p className="inline-block py-1 px-1.5 text-gray-800 dark:text-gray-100 text-xs bg-white dark:bg-gray-800 font-medium rounded-lg ">{'+'+comments.length}</p>
                        </div>
                        {/* 태그 */}
                        <div className="flex justify-between justify-items-center w-full h-fit text-xs sm:text-sm">
                            <ul className="inline-block w-full overflow-hidden mr-1 text-ellipsis leading-tight">
                                {
                                    tags.map((t, idx) => 
                                    <li key={t+idx} className="tags-wrap inline-block mr-2 px-1.5 py-1 bg-slate-400 dark:bg-slate-900 text-xs text-white rounded-sm shadow-sm ">
                                        {t}
                                    </li>
                                    )        
                                }
                            </ul>
                            {/* 작성일 */}
                            <p className="author-date-wrap flex justify-around items-center min-w-[100px] text-xs text-gray-800 dark:text-gray-300 text-right">
                                {author} 
                                <span className="mx-1.5 h-2.5 border-l border-gray-400 text-sm text-black dark:text-white " />
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