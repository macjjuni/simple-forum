import { useRef, useEffect } from 'react'
import { useRouter } from 'next/router';
import { GoSearch } from 'react-icons/go'

const SeacrhBar = ({init}) =>{

    const { push } = useRouter();
    const searchRef = useRef(null); //검색 input Element

    useEffect(()=> {
        if(init){ searchRef.current.value = decodeURIComponent(init); }
    }, [])


    const searchClick = () => {
        searchRef.current.focus();
    }

    const searchAction = (e) => {
        if(e.keyCode === 13 && e.target.value.trim() !== ''){
            const txt = searchRef.current.value.trim();
            const url = encodeURI(encodeURIComponent(txt));
            push('/search/'+url);
        }
    }

    return(
        <>
        <div className="text-right">

            <div className='relative inline-block align-top'>
                <input ref={searchRef} type="text" onKeyDown={searchAction} className="w-[130px] sm:w-[150px] h-10 pl-9 pr-2 py-2 outline-0 bg-gray-100 dark:bg-gray-500
                hover:bg-gray-200 dark:hover:bg-gray-400 focus:w-[180px] sm:focus:w-[200px] text-md shadow-sm rounded-3xl outline-none text-ellipsis transition-[width]"/>
                <div onClick={searchClick} className='absolute top-0 lop-0 w-9 h-10 flex items-center justify-evenly text-black dark:text-white cursor-pointer'>
                    <GoSearch/>
                </div>
            </div>

        </div>
        </>
    )
}

export default SeacrhBar