import axios from "axios"
import { useState, useEffect } from "react";
import SeachBar from "../../components/searchBar"
import PostItem from "../../components/postItem"
import { GoSearch } from 'react-icons/go'

const Search = ({list, txt}) => {

    const [searchTxt, setSearchTxt] = useState(decodeURI(txt))

    useEffect(()=>{
        setSearchTxt(decodeURI(txt));
    }, [list])

    return(
    <>
        <SeachBar init={searchTxt}/>
        <h2 className="pt-8 pb-2 text-2xl">
            <GoSearch className="inline-block mr-2 mb-1"/>
            검색 결과 : {list.length}
        </h2>

        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 py-6">
        {
            list.map((post, idx) =>
                <PostItem key={post.title+idx} _id={post._id} title={post.title} author={post.author} tags={post.tags} date={post.date} comments={post.comments}/>
            )
        }
        </ul>           



        
    </>
    )
    
}

const animate = {
    initial :{ //none use
        opacity : 0,
    },
    animate : {
        opacity: 1,
    },
    exit : {
        opacity: 0,
    }
}

export const getServerSideProps = async({query}) => {

    const target = query.search[0];
    console.log(target)
    const res = await axios({ method : 'POST', url : `http://localhost:${process.env.PORT}/api/db/post/read/search/${target}` });

    //검색 API

    return{
        props : { list : res.data,
                    txt : target }
    }
}

export default Search