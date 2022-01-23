import HeadInfo from '../components/headInfo'
import TopSection from '../components/topSection'
import PostItem from "../components/postItem"
import axios from 'axios'

const Home = ({list}) => {

  return (
    <>
      <HeadInfo/>

        <TopSection/>

        <h2 className='pt-3 md:pt-6 pb-2 text-2xl'>📚 전체글</h2>
        <ul className="block w-full py-4">
          {
            list.map((post, idx) =>
              <PostItem key={post.title+idx} no={post.no} title={post.title} tags={post.tags} date={post.date} comments={post.comments}/>
            )
          }

          <li className="text-center py-3 text-gray-600">글이 없습니다. 글을 작성해주세요. 😄</li>
        </ul>
    </>
  )
}


export const getServerSideProps = async() => {

  const res = await axios({ //게시글 목록 불러오기
    method : 'GET',
    url : `http://localhost:${process.env.PORT}/api/db/post/list`,
  });

  if(res.status === 200){
    return{
      props : { list : res.data }
    }
  }else{
    return{
      props : { list : [{ no : 0, title : '', date : ''}] }
    }
  }

  
}

export default Home 