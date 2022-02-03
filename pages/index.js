import HeadInfo from '../components/headInfo'
import SeachBar from '../components/searchBar'
import PostItem from "../components/postItem"
import axios from 'axios'
import { useState, useEffect, useRef, useCallback } from 'react'
import { CgSpinner } from 'react-icons/cg'


const Home = ({list, total}) => {  
  
  const [List, setList] = useState(()=> list);
  // const [obs, InView] = useInView()
  
  const [page, setPage] = useState(1);
  const [load, setLoad] = useState(false);
  
  const noPostRef = useRef(null);
  const obsRef = useRef(null);
  const duple_prevent = useRef(true); //observer
  const endRef = useRef(false);

  
  useEffect(()=> {
    if(page !== 1) getPost();
  }, [page])

  useEffect(()=> {
    const observer = new IntersectionObserver(handler, { threshold : 0.5 });
    if(obsRef.current) observer.observe(obsRef.current);
    return () => { observer.disconnect(); }
  }, [])

  const handler = ((entries) => {
    const target = entries[0];
    if(!endRef.current && target.isIntersecting && duple_prevent.current){ 
      console.log('DB 조회')
      duple_prevent.current = false;
      setPage(prev => prev+1 );
    }
  })

  const getPost = useCallback(async() => { //글 불러오기  
      setLoad(true); //로딩 시작
      const res = await axios({method : 'GET', url : `/api/db/post/read/list/?page=${page}`});
      if(res.data){
          if(res.data.end){
            endRef.current = true;
            noPostShow();
          }
          setList(prev => [...prev, ...res.data.list]); //리스트 추가
          duple_prevent.current = true;
      }else{
        console.log(res); //에러
      }
      setLoad(false); //로딩 종료
  }, [page]);

  const noPostShow = () => { noPostRef.current.classList.replace('hidden', 'block'); }

  
  return (
    <>
      <HeadInfo/>
        <button onClick={()=> console.log(List)}>123</button>
        <SeachBar/>
        <h2 className='pt-8 pb-2 text-2xl'>📚 전체글({total})</h2>
        <ul className="block w-full py-4">
          {
            List &&
            <>
            {
              List.map((post, idx) =>
                <PostItem key={post._id + idx} _id={post._id} 
                          title={post.title} author={post.author} tags={post.tags} 
                          date={post.date} comments={post.comments}
                />
              )
            }
            </>            
          }
          
          {
            load ?
            <li className="block text-center py-5 text-gray-600 text-center text-3xl text-black dark:text-white">
              <div className='spinner inline-block spinner m-auto'>
                <CgSpinner/>
              </div>  
            </li>
            :
            <></>
          }
          <div ref={noPostRef} className='hidden w-full py-2.5 text-white text-xl text-center bg-blue-400 dark:bg-slate-800 rounded-sm'>더 이상 글이 없습니다.</div>
          <li className='' ref={obsRef}></li>
        </ul>
    </>
  )
}

export const getServerSideProps = async() => {

  const res = await axios({ //게시글 목록 불러오기
    method : 'GET',
    url : `http://localhost:${process.env.PORT}/api/db/post/read/list?page=${1}`,
  })

  if(res.status === 200){
    return{
      props : { list : res.data.list, total : res.data.total }
    }
  }else{
    return{
      props : { list : null }
    }
  }
  
}

export default Home 