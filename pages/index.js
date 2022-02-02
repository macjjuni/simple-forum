import { PostContext } from '../context/PostContext'
import HeadInfo from '../components/headInfo'
import SeachBar from '../components/searchBar'
import PostItem from "../components/postItem"
import axios from 'axios'
import { useState, useEffect, useRef, useContext, useCallback } from 'react'
import { CgSpinner } from 'react-icons/cg'

const options = {
  root: null,
  threshold: 0
}

const Home = ({list, total}) => {  
  
  const { List, setList } = useContext(PostContext);
  const loadedRef = useRef(Number(List.length));
  const bottomRef = useRef(null);
  const spinnerRef = useRef(null);
  const noPostRef = useRef(null);

  useEffect(()=> { // 무한 스크롤 옵저버 선언 및 타겟 지정
    if(!List.length || List[0]._id !== list[0]._id  ) { //글 작성 시 리스트 초기화
      setList([...list]); 
    }
    const observer = new IntersectionObserver(handler, options);
    if(bottomRef.current) observer.observe(bottomRef.current);
    if(total === loadedRef.current) noPostShow(); //모든 포스트가 로드된 경우

    return() =>{
      observer.disconnect(); //옵저버 해제
    }
  }, []);


  useEffect(()=> { //로드된 게시글 수 담기
    loadedRef.current = Number(List.length);
  }, [List]);

  const handler = ((entries) => {
    if(total > loadedRef.current){
    const target = entries[0];
      if(target.isIntersecting){ //뷰포트 침범
          spinnerShow();
          getPost();
      }
    }
  });


  const getPost = async() => { //글 불러오기  

    if(total > loadedRef.current){ //전체 글 개수와 로딩된 글 개수 비교
      const res = await axios({method : 'GET', url : `/api/db/post/read/list/?limit=${10}&skip=${loadedRef.current}`});
      if(res.data){

        if(res.data.list.length === 10) setList(prev => [...prev, ...res.data.list]);
        else {
          setList(prev => [...prev, ...res.data.list]);
          noPostShow();
          spinnerHide();
        }

      }else{
        console.log(res); //에러
      }
    }
  }

  const noPostShow = () => { noPostRef.current.classList.replace('hidden', 'block'); }
  const spinnerShow = () => { spinnerRef.current.classList.replace('hidden', 'block'); }
  const spinnerHide = () => { spinnerRef.current.classList.replace('block', 'hidden'); }
  
  
  return (
    <>
      <HeadInfo/>
        <button onClick={()=> console.log(List)}>123</button>
        <SeachBar/>
        <h2 className='pt-8 pb-2 text-2xl'>📚 전체글</h2>
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
          <li ref={spinnerRef} className="hidden text-center py-5 text-gray-600 text-center text-3xl text-black dark:text-white">
            <div className='spinner inline-block spinner m-auto'>
              <CgSpinner/>
            </div>  
          </li>

          <li className='py-3' ref={bottomRef}></li>

          <div ref={noPostRef} className='hidden w-full py-2.5 text-white text-xl text-center bg-blue-400 dark:bg-slate-800 rounded-sm'>더 이상 글이 없습니다.</div>
        </ul>
    </>
  )
}

export const getServerSideProps = async() => {

  const res = await axios({ //게시글 목록 불러오기
    method : 'GET',
    url : `http://localhost:${process.env.PORT}/api/db/post/read/list?limit=${10}&skip=${0}`,
  });

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