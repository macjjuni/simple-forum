import { IoMdClose } from 'react-icons/io'


const TagItem = ({tags, deleteTag}) => {

    return(
        <>
            {
                tags.map((t, idx)=>

                <div key={t+idx} className="tag-item relative inline-block whitespace-nowrap p-1 pr-5 text-sm text-black">
                        &#35;{t}
                    <button onClick={()=> {deleteTag(t)}} className='inline-block absolute top-2 right-1'><IoMdClose/></button>
                </div>

                )
            }
            
        </>
    )
}

export default TagItem