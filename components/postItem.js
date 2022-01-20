import Image from "next/image"
import Link from "next/link"

const PostItem = () => {


    return(
        <> 
            <li className="bg-slate-100 truncate shadow-md hover:scale-[1.02] hover:bg-blue-100 transition duration-100 ">
                <Link href='/post/1' passHref>
                    <a className="block">
                        <div className="p-3">

                            <h3 className="textlgl mb-2">이것은 제목입니다</h3>

                            <div className="flex justify-between justify-items-center w-full h-fit text-xs sm:text-sm">
                                <ul className="inline-block w-full overflow-scroll mr-1 noScroll leading-tight">
                                    <li className="inline-block mr-2 px-1.5 py-1 rounded-lg bg-slate-400 text-white">#Tag1</li>
                                    <li className="inline-block mr-2 px-1.5 py-1 rounded-lg bg-slate-400 text-white">#Middle</li>
                                    <li className="inline-block mr-2 px-1.5 py-1 rounded-lg bg-slate-400 text-white">#Next Long Tag</li>
                                </ul>
                                <p className="flex items-center sm:min-w-[70px] min-w-[60px] text-gray-800">2022.01.15</p>
                            </div>

                        </div>
                    </a>
                </Link>
            </li>
        </>
    )
}

export default PostItem