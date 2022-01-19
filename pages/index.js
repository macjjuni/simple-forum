import HeadInfo from '../components/headInfo'
import TopSection from '../components/topSection'
import PostItem from "../components/postItem"

const Home = () => {

  return (
    <>
      <HeadInfo/>
    
      <TopSection/>
      <ul className="py-4">
        <PostItem/>
        <PostItem/>
        <PostItem/>
        <PostItem/>
        <PostItem/>
        <li className="text-center py-3 text-gray-600">글이 없습니다. 글을 작성해주세요. 😄</li>
      </ul>
    </>
  )
}

export default Home 