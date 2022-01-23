import Image from "next/image"
import Link from "next/link"

const PostItem = ({no, title, tags, date, comments}) => {

    return(
        <> 
            <li className="bg-slate-100 truncate shadow-md hover:scale-[1.02] hover:bg-blue-100 transition duration-100 ">
                <Link href={`/post/${no}`} passHref>
                <a className="block">
                    <div className="p-3">

                        <div className="flex justify-between justify-items-center mb-2">
                            <h3 className="inline-block text-lg w-full text-ellipsis overflow-hidden">{title}</h3>
                            <p className="inline-block bg-white rounded-lg px-1.5 py-0.5">{'+'+comments.length}</p>
                        </div>
                        <div className="flex justify-between justify-items-center w-full h-fit text-xs sm:text-sm">
                            <ul className="inline-block w-full overflow-scroll mr-1 noScroll leading-tight">
                                {
                                    tags.map((t, idx) => 
                                    <li key={t+idx} className="inline-block mr-2 px-1.5 py-1 rounded-lg bg-slate-400 text-xs text-white">
                                        {t}
                                    </li>
                                    )        
                                }
                            </ul>
                            <p className="flex justify-around items-center sm:min-w-[70px] min-w-[60px] text-xs text-gray-800 text-right">
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