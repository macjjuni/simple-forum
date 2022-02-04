import axios from "axios"
import { debounce } from "lodash"
import HeadInfo from "../../../components/headInfo"
import { useSession } from "next-auth/react"
import { useRef, useState } from "react"
import { useRouter } from "next/router"
import { BiLike } from 'react-icons/bi'


const Index = ({post}) => {

    const { data : session, status } = useSession();
    const { push, query } = useRouter();

    const commentsUl = useRef(null);
    const commentWriteRef = useRef(null);

    const [likeCnt, setLikeCnt] = useState(post.likeCount);
    const [likeUser, setLikeUser] = useState(post.likeUser);
    const [comments, setComments] = useState(post.comments);
    const [editMode, setEditMode] = useState('');


    const deletePost = async() => { //글 삭제
        let alert = confirm("글을 삭제하시겠습니까?");
        if (alert) {
            const check = await axios({ method : 'POST', url : `/api/db/post/delete/${query.id}`, data : { author : session.user.name } });
            if(check.data.error === null){ 
                push('/');
            }else{
                console.log(check);
            }
        }
    }

    const editPost = () => { //글 수정
        push(`/editpost/${query.id}`);
    }

    const likePost = debounce(async() => {
    
        if(status !== 'authenticated'){
            push('/signin');
        }else{
            const visitorId = session.user.name;

            if(!likeUser.includes(visitorId)){ //좋아요 증가
                setLikeUser((prev)=> [...prev, visitorId]);
                const plus = likeCnt + 1;
                setLikeCnt(plus);
            }else{ //좋아요 감소                
                const _likeUser = likeUser;
                const idx = _likeUser.indexOf(visitorId);
                _likeUser.splice(idx, 1);
                setLikeUser(_likeUser);
                const minus = likeCnt - 1;
                setLikeCnt(minus);
            }
            const res = await axios({ method : 'POST', url : `/api/db/post/update/like/${query.id}`, data : { user : visitorId, check : 'like' } })
            if(res.data.error === null){
                // 좋아요 성공
                // console.log('좋아요');
            }else{
                console.log(res);
            }
        }

    }, 150);

    const writeComment = async(e) => { //댓글 작성
        const txt = commentWriteRef.current.value.trim();
        if(session){ //로그인 체크
            if( txt !== ''){ //내용이 없을 경우
                //댓글 작성 요청
                const res = await axios({ 
                    method : 'POST', 
                    url : `/api/db/comment/create/${query.id}`, 
                    data : { author : session.user.name, 
                            comment : txt } 
                });
                
                if(res.data.error === null){
                    setComments([...comments, {content : txt, author : session.user.name, date : getDate() }]); //업데이트 완료 후 댓글 추가
                    commentWriteRef.current.value = '';
                    console.log('댓글 작성');
                    
                }else{
                    console.log(res);
                    alert(res.data.error);
                }
                
            }else{ //내용이 없을 경우 에러 표시
                errToggle(e.target);
            }           
        }else{ //로그아웃 체크
            let alert = confirm("로그인이 필요합니다. 로그인 하시겠습니까?");
            if (alert) {
                push('/signin');
            }
        }
    }

    const deleteComment = async(e) =>{
        let alert = confirm("댓글을 삭제하시겠습니까??");
        if (alert) {

            const target = Number(e.target.dataset.index);
            const res = await axios({ 
                method : 'POST', url : `/api/db/comment/delete/${query.id}`, 
                data : { author : session.user.name, target : target } 
            });

            if(res.data.error === null){
                console.log('댓글 삭제');
                const _comments = comments;
                _comments.splice(target, 1);
                setComments([..._comments]);  //댓글 삭제 렌더링
            }else{
                alert(res.data.error);
            }

        }
    }
    
    const startEdit = (e) => {
        // setEditMode('edit-mode');
        const index = Number(e.target.dataset.index);
        commentsUl.current.classList.add('edit-mode');
        commentsUl.current.children[index].classList.add('edit-on');
    } 

    const updateComment = async(e) =>{
        const index = Number(e.target.dataset.index);        
        
        //수정 댓글 변경 및 렌더링
        const txt = commentsUl.current.children[index].children[2].children[0].value; //수정 값
        const _comments = comments;
        
        const res = await axios({ method : 'POST', url : `/api/db/comment/update/${query.id}`, 
                                data : { index : index, content : txt, author : session.user.name } }); 
        
        if(res.data.error === null){ //댓글 수정 성공
            commentsUl.current.classList.remove('edit-mode');
            commentsUl.current.children[index].classList.remove('edit-on');
            _comments.splice(index, 1 , {content : txt, author : session.user.name, date : getDate() });
            setComments([..._comments]);
            setEditMode('');
        }else{ //댓글 수정 실패
            alert(res.error);
            console.log(res);
        }

    }

    const errToggle = (ele) => {
        const target = ele;
        if(target.classList.contains('bg-red-400')){
            target.classList.replace('bg-red-400', 'bg-blue-400');
            target.classList.replace('hover:bg-red-500', 'hover:bg-blue-500');
        }else{
            target.classList.replace('bg-blue-400', 'bg-red-400');
            target.classList.replace('hover:bg-blue-500', 'hover:bg-red-500');
        }
    }

    const getDate = () => {
        const date = new Date();
        const _month = (date.getMonth()+1).toString();
        const month = _month.length === 1 ? '0'+_month : _month;
        
        return date.getFullYear() + '.'+ month + '.' + date.getDate();
    }

    console.log()

    return(
        <>
            <HeadInfo title={post.title} />

            <div className="post-wrap mx-auto my-4 max-w-screen-md ctd">

                {/* 제목 / 작성자 / 작성일 */}
                <div className="post-header relative px-2 pt-8 pb-2 lg:pb-6 my-3 rounded">
                <span className="absolute top-0 right-0 px-1.5 py-0.5 text-sm font-bold bg-slate-500 text-white rounded shadow-md">Title</span> 
                    <h2 className="mb-2 text-2xl text-black dark:text-white text-ellipsis overflow-hidden whitespace-nowrap	ctd">
                        {post.title}
                    </h2>

                    <div className="post-info-wrap flex justify-between">
                        <div className="master-left inline-block text-black dark:text-white ctd">
                        {post.author} <span className="inline-block border-l border-gray-400 text-sm text-black dark:text-white ctd mx-1.5 h-2.5" /> {post.date.substr(0, 10).replace(/-/g, '.')}
                        </div>
                        {
                            status === 'loading' || status === 'unauthenticated' ? //로그인 여부 및 작성자 체크
                            <></>
                                :
                            <>
                                {
                                    session.user.name === post.author ?
                                    <div className="master-wrap inline-block text-black dark:text-white ctd">
                                        <button onClick={deletePost} className="hover:underline">삭제</button>
                                        <button onClick={editPost} className="ml-3 hover:underline">수정</button>
                                    </div>
                                        :
                                    <></>
                                }
                            </>
                        }
                        
                    </div>
                </div>

                {/* 본문 내용 */}
                <div className="post-content-wrap relative min-h-[400px] pt-1.5 px-1.5 md:px-4 md:pt-4  bg-slate-200 dark:bg-slate-700 ctd shadow-base overflow-hidden rounded shadow-md">
                    <span className="absolute top-0 right-0 px-1.5 py-0.5 bg-white text-sm font-bold text-black rounded-bl shadow-md">Content</span> 
                    
                    <div className="post-content min-h-[400px] p-4 bg-white dark:bg-gray-800 text-black dark:text-white rounded-md ctd"
                    dangerouslySetInnerHTML={ {__html: post.content} } />
                    <div className="text-center">
                        <div className="inline-block my-2.5 md:my-4">

                            {/* 좋아요 */}
                            {
                                status === 'authenticated' ?
                                <>
                                    {
                                        likeUser.includes(session.user.name) ?
                                        <button onClick={likePost} className="flex justify-around items-center px-3 py-1.5 bg-blue-400 text-white rounded-md">
                                            <span className="inline-block mx-3 align-center">{likeCnt}</span>
                                            <BiLike className="inline-block mx-2 text-xl"/>
                                        </button>
                                            :
                                        <button onClick={likePost} className="flex justify-around items-center px-3 py-1.5 bg-gray-400 dark:bg-gray-800 text-white rounded-md">
                                            <span className="inline-block mx-3 align-center">{likeCnt}</span>
                                            <BiLike className="inline-block mx-2 text-xl"/>
                                        </button>
                                    }
                                </>
                                    :
                                <button onClick={likePost} className="flex justify-around items-center px-3 py-1.5 bg-gray-400 dark:bg-gray-800 text-white rounded-md">
                                    <span className="inline-block mx-3 align-center">{likeCnt}</span>
                                    <BiLike className="inline-block mx-2 text-xl"/>
                                </button>
                            }
                            
                        </div>
                    </div>
                    
                </div>
                
            
                {/* 태그 */}
                
                <div className="post-tag-wrap relative relative my-3 rounded shadow-md">
                <span className="absolute top-0 right-0 px-1.5 py-0.5 bg-white text-sm font-bold text-black rounded-bl shadow-md">Tag</span> 
                <ul className="text-sm text-gray-800 px-2.5 py-5 md:py-3.5 min-h-[60px] pr-9 bg-slate-200 dark:bg-slate-700 whitespace-nowrap overflow-scroll noScroll rounded ctd">

                    {
                        post.tags.map((t, idx)=>
                            <li key={t + idx} className="post-tags inline-block mr-2.5 px-3 py-1.5 text-sm text-gray-800 dark:text-gray-300 bg-white dark:bg-gray-900 rounded-xl shadow-md ctd">
                                {'#'+t}
                            </li>
                        )
                    }

                </ul>
                </div>

                {/* 댓글 목록 */}
                
                <ul ref={commentsUl} className={`post-comment-wrap my-3 ${editMode}`}>
                {
                    comments.length !== 0 
                        ?
                    <>
                    {
                        comments.map((c, idx) => 
                        <li key={idx} className="relative block mb-2.5 sm:p-3.5 p-2 bg-slate-200 dark:bg-slate-700 text-black dark:text-white rounded shadow-md ctd">
                            <span className="absolute top-0 right-0 px-1.5 py-0.5 bg-white text-sm font-bold text-black rounded-bl shadow-md">Comments</span>     
                            <div className="inline-block comment-profile mb-2.5 px-2.5 py-1 text-sm bg-slate-50 dark:bg-slate-500 text-black dark:text-white rounded-md ctd">
                                {c.author}
                                <span className="inline-block border-l border-gray-400 text-sm text-black dark:text-white ctd mx-1.5 h-2.5" />
                                {c.date.substr(0,10).replace(/-/g,'.')}
                            </div>

                            
                            <div className="edit-wrap hidden">
                                <textarea className="comment-profile block w-full min-h-[50px] p-2 my-2.5 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 ctd
                        outline-none resize-none text-sm rounded-sm" defaultValue={c.content}/>
                                <button onClick={updateComment} data-index={idx} className="w-full py-1.5 text-gray-100 bg-green-400 hover:bg-green-500 rounded-sm ctd">
                                    수정하기
                                </button>
                            </div>
                            <pre className="block comment-content-wrap sm:p-3.5 p-2 text-md bg-slate-50 dark:bg-slate-500 text-black dark:text-white rounded-sm whitespace-pre-wrap overflow-auto break-all ctd">
                                {c.content}
                                
                                {
                                    status === 'loading' || status === 'unauthenticated' ? //로그인 여부 및 작성자 체크
                                    <></>
                                        :
                                    <>
                                    {
                                        session.user.name === c.author 
                                            ?
                                        <div className="flex justify-end min-h-[30px] pt-1.5">
                                            <div className="comments-editBtn-wrap">
                                                <button onClick={startEdit} data-index={idx} className="comments-edit-btn px-1.5 py-0.5 bg-white dark:bg-gray-700 text-sm text-black dark:text-white shadow-lg">수정</button>
                                                <button onClick={deleteComment} data-index={idx} className="comments-delete-btn px-1.5 py-0.5 ml-1 bg-white dark:bg-gray-700 text-sm text-black dark:text-white shadow-md">삭제</button>
                                            </div>
                                        </div>
                                            :
                                        <></>
                                    }
                                    </>
                                }

                            </pre>
                        </li>
                        )
                    }
                    </>
                        :      
                    <div className="no-comment my-3 p-3 text-sm text-gray-700 dark:text-gray-300 bg-slate-200 dark:bg-slate-700 text-center rounded shadow-md ctd">
                        댓글이 없습니다. 댓글을 남겨보세요.😆
                    </div>
                }
                </ul>

                {/* 댓글입력창 */}
                <div className="write-comment-wrap relative my-3 sm:p-3.5 p-2 bg-slate-200 dark:bg-slate-700 rounded ctd">
                <span className="absolute top-0 right-0 px-1.5 py-0.5 bg-white text-sm font-bold text-black rounded-bl shadow-md">Write</span> 
                    <div className="inline-block comment-profile px-2 py-1 text-sm bg-white dark:bg-slate-400 text-black dark:text-white rounded ctd">
                    {
                        status === 'authenticated'
                            ?
                        <>{session.user.name}</>
                            :
                        <>Stranger</>
                    }
                    </div>
                    <textarea ref={commentWriteRef} className="comment-profile block w-full min-h-[50px] p-2 my-2.5  text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 ctd
                    outline-none resize-none text-sm rounded-sm"/>
                    
                    <button onClick={writeComment} className="w-full py-1.5 text-gray-100 bg-blue-400 hover:bg-blue-500 rounded-sm ctd">
                        댓글 쓰기
                    </button>
                </div>
            </div>
        </>
    )
}

export const getServerSideProps = async({query}) => {
    
    const { id } = query;
    const res = await axios({ //게시글 목록 불러오기
        method : 'POST',
        url : `http://localhost:${process.env.PORT}/api/db/post/read/${id}`,
        data : { id : 'simple-forum' }
    });

    if(res.status === 200 && res.data[0] ){
        return{
            props : { post : res.data[0] }
        }
    }else{
        return{
            notFound : true    
        }
    }

    
}


export default Index