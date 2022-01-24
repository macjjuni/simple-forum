import { useRef } from 'react'
import { GoSearch } from 'react-icons/go'

const TopSection = () =>{

    const search = useRef(null); //검색 input Element

    const searchClick = () => {
        search.current.focus();
    }

    return(
        <>
        <div className="text-right">

            <div className='relative inline-block align-top'>
                <input ref={search} type="text" className="w-[130px] h-10 pl-9 pr-2 py-2 outline-0 bg-gray-100 dark:bg-gray-500 
                hover:bg-gray-200 dark:hover:bg-gray-400 focus:w-[170px] ease-out duration-300 text-sm shadow-sm rounded-3xl outline-none "/>
                <div onClick={searchClick} className='absolute top-0 lop-0 w-9 h-10 flex items-center justify-evenly text-black dark:text-white cursor-pointer'>
                    <GoSearch/>
                </div>
            </div>

        </div>
        </>
    )
}

export default TopSection