import HeadInfo from '../components/headInfo'
import SeachBar from '../components/searchBar'
import PostItem from "../components/postItem"
import axios from 'axios'
import { useState, useEffect, useRef, useCallback } from 'react'
import { CgSpinner } from 'react-icons/cg'
import { FcOpenedFolder } from 'react-icons/fc'


const Home = ({list, total}) => {
  
  const [List, setList] = useState(()=> list);
  // const [obs, InView] = useInView()
  
  const [page, setPage] = useState(1);
  const [load, setLoad] = useState(false);
  
  const noPostRef = useRef(null);
  const obsRef = useRef(null);
  const preventRef = useRef(true); 
  const endRef = useRef(false);

  useEffect(()=> {
    if(page !== 1) getPost();
  }, [page])

  useEffect(()=> {
    const observer = new IntersectionObserver(obsHandler, { threshold : 0.5 });
    if(obsRef.current) observer.observe(obsRef.current);
    return () => { observer.disconnect(); }
  }, [])

  const obsHandler = ((entries) => {
    const target = entries[0];
    if(!endRef.current && target.isIntersecting && preventRef.current){ 
      preventRef.current = false;
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
          preventRef.current = true;
      }else{
        console.log(res); //에러
      }
      setLoad(false); //로딩 종료
  }, [page]);

  const noPostShow = () => { noPostRef.current.classList.replace('hidden', 'block'); }
  
  return (
    <>
      <HeadInfo/>
        {/* <button onClick={()=> console.log(List)}>List Check</button> */}
        <SeachBar/>
        <h2 className='flex justify-start items-center pt-8 pb-2 text-xl md:text-2xl '> 
          <FcOpenedFolder className='inline-block text-3xl mr-2'/>
          전체글({total})</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 py-6">
          {
            List &&
            <>
            {
              List.map((post, idx) =>
                <PostItem key={post._id + idx} _id={post._id}
                    title={post.title} author={post.author} tags={post.tags} 
                    date={post.date} comments={post.comments} thumbnail={post.thumbnail}
                />
              )
            }
            </>            
          }
        </ul>
        {
            load ?
            <li className="block text-center py-5 text-blue-700 dark:text-blue-500 text-center text-3xl text-black">
              <div className='spinner inline-block spinner m-auto'>
                <CgSpinner/>
              </div>  
            </li>
            :
            <></>
          }
          {
            total === 0 ?
            <div ref={noPostRef} className='hidden w-full mt-5 py-2.5 text-white dark:text-black text-xl text-center bg-blue-400 dark:bg-slate-800 rounded-sm'>글을 불러올 수 없습니다.</div>
              :
            <></>
          }
          <div ref={noPostRef} className='hidden w-full mt-5 py-2.5 text-xs text-gray-800 dark:text-white md:text-[1rem] md:py-3 text-center bg-slate-100 dark:bg-slate-700 rounded-sm'>더 이상 글이 없습니다.</div>
          <div className='py-3' ref={obsRef}></div>
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
      props : { list : null, total : 0 }
    }
  }
  
}

export default Home 