import HeadInfo from '../components/headInfo'
import TopSection from '../components/topSection'
import PostItem from "../components/postItem"
import axios from 'axios'

const Home = ({list}) => {  

  return (
    <>
      <HeadInfo/>

        <TopSection/>

        <h2 className='pt-8 pb-2 text-2xl'>📚 전체글</h2>
        <ul className="block w-full py-4">
          {
            list.map((post, idx) =>
              <PostItem key={post.title+idx} _id={post._id} title={post.title} author={post.author} tags={post.tags} date={post.date} comments={post.comments}/>
            )
          }
          <li className="text-center py-3 text-gray-600">글이 없습니다. 글을 작성해주세요. 😄</li>
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
      props : { list : [{ _id : 0, title : '', date : '2022-01-01T14:26:06.859Z', author : '', tags : [], content : '', comments : [] }] }
    }
  }

  
}

export default Home 