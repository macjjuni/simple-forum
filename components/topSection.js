import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import { GoSearch } from 'react-icons/go'
import { BsPencil } from 'react-icons/bs'

const TopSection = () =>{

    const { pathname } = useRouter();
    const search = useRef(null); //검색 input Element

    const searchClick = () => {
        search.current.focus();
    }

    return(
        <>
            <div className="h-12 flex justify-between items-center">
                <h2 className="inline-block text-xl px-2">{pathname=== '/' ? '피드' : ''}</h2>

                <div>
                    <Link href='/newpost' passHref>
                        <a className='inline-block w-10 h-10 mr-3 inline-flex items-center align-top rounded-full bg-slate-200 hover:bg-blue-400 hover:text-white ease-out duration-300 shadow-sm'>
                            <BsPencil className='mx-auto h-10 text-black text-inherit'/>
                        </a>
                    </Link>

                    <div className='relative inline-block align-top'>
                        <input ref={search} type="text" className="w-[150px] h-10 pl-9 pr-2 py-2 outline-0 bg-slate-200 rounded-3xl outline-none hover:bg-white focus:bg-white ease-out duration-300 text-sm shadow-sm"/>
                        <div onClick={searchClick} className='absolute top-0 lop-0 w-9 h-10 flex items-center justify-evenly cursor-pointer'>
                            <GoSearch className=''/>
                        </div>
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default TopSection