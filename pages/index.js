import HeadInfo from '../components/headInfo'
import SeachBar from '../components/searchBar'
import PostItem from "../components/postItem"
import axios from 'axios'
import { route } from 'next/dist/server/router'

const Home = ({list}) => {  

  return (
    <>
      <HeadInfo/>

        <SeachBar/>

        <h2 className='pt-8 pb-2 text-2xl'>📚 전체글</h2>
        <ul className="block w-full py-4">
          {
            list !== null ?
            <>
            {
              list.map((post, idx) =>
                <PostItem key={post.title+idx} _id={post._id} title={post.title} author={post.author} tags={post.tags} date={post.date} comments={post.comments}/>
              )
            }
            </>
              :
            <li className='py-5 text-lg text-center'>글이 없습니다.</li>              
          }
          
          <li className="text-center py-5 text-gray-600 text-black dark:text-white">글이 없습니다. 글을 작성해주세요. 😄</li>
        </ul>
    </>
  )
}

export const getServerSideProps = async() => {

  const res = await axios({ //게시글 목록 불러오기
    method : 'POST',
    url : `http://localhost:${process.env.PORT}/api/db/post/read/list`,
  });

  if(res.status === 200){
    return{
      props : { list : res.data }
    }
  }else{
    return{
      props : { list : null }
    }
  }
  
}

export default Home 