import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css'
import 'tui-color-picker/dist/tui-color-picker.css'

import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css'
import { Editor } from '@toast-ui/react-editor'
import colorSyntax from '@toast-ui/editor-plugin-color-syntax'

import TagItem from './tagitem'
import { useState, useRef, useEffect } from 'react'
import imageCompression from 'browser-image-compression'

import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_APPID,
};
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

const WysiwygEditor = ({uploadDB, init}) => {

    const titleRef = useRef(null);
    const tagRef = useRef(null);
    const editorRef = useRef(null);

    const [tags, setTag] = useState([]);

    const toolbarItems = [
        ['heading', 'bold', 'italic', 'strike'],
        ['hr'],
        ['ul', 'ol', 'task'],
        ['table', 'link'], 
        ['image'],
        ['code'],
        ['scrollSync'],
    ]

    useEffect(()=> {  
        const editorIns = editorRef.current.getInstance();
        editorIns.removeHook("addImageBlobHook");
        editorIns.addHook('addImageBlobHook', addImage);
        if(init){
            titleRef.current.value = init.title;
            setTag(init.tags);
        }
    }, []);

    useEffect(()=> {
        if(tags.length > 4){
            tagRef.current.classList.add('hidden');
        }else{
            tagRef.current.classList.replace('hidden', 'block');
        }
    }, [tags])

    const getContent = () => { //글 내용 HTML 문자열로 불러오기
        const editorIns = editorRef.current.getInstance();
        return editorIns.getHTML();
    }
    const getMarkDown = () => { //글 내용 마크다운 문자열로 불러오기
        const editorIns = editorRef.current.getInstance();
        return editorIns.getMarkdown();
    }

// ------------- image Function -------------
    // 에디터에 이미지 추가
    const addImage = async(blob, dropImage) => { 
        const img = await compressImg(blob);  
        const url = await uploadImage(img);
        
        dropImage(url); //에디터에 이미지 추가
    }

    //이미지 압축
    const compressImg = async(blob) => { 
        try{
            const options = {
                maxSize: 1,
                initialQuality: 0.55  //initial 0.7
            }
            return await imageCompression(blob, options);
        } catch(e){ console.log(e); }
    }

    //랜덤 파일명 생성
    const generateName = () => { 
        const ranTxt = Math.random().toString(36).substring(2,10); //랜덤 숫자를 36진수로 문자열 변환
        const date = new Date();
        const randomName = ranTxt+'_'+date.getFullYear()+''+date.getMonth()+1+''+date.getDate()+''+date.getHours()+''+date.getMinutes()+''+date.getMinutes()+''+date.getSeconds();   
        return randomName;
    }

    //이미지 업로드
    const uploadImage = async(blob) => { 
        try{
            //firebase Storage Create Reference                 파일 경로 / 파일 명 . 확장자
            const storageRef = ref(storage, `post_images/${generateName() + '.' + blob.type.substring(6, 10)}`);
            //firebase upload
            const snapshot = await uploadBytes(storageRef, blob);
            return await getDownloadURL(storageRef);
        } catch (err){
            console.log(err)
            return false;
        }
    }

// ------------- Tags Function -------------
    //공백 제거
    const spaceRemove = (e) => { 
        e.target.value = e.target.value.replace(/ /g, '');
    }

    //태그 추가
    const addnDek_Tag = (e) => { 
        const txt = e.target.value;
        if( e.keyCode === 13 && e.target.value !== ''){
            if(tags.indexOf(txt) === -1){
                setTag([...tags, txt])
                e.target.value = '';
            }else{ e.target.value = ''; }
        }else if( e.keyCode === 8 && e.target.value === '' ){
            const _tags = tags;
            _tags.splice(_tags.length-1, 1);
            setTag([..._tags]);
        }
    }

    //태그 제거
    const deleteTag = (e) => { 
        const arr = tags;
        const idx = tags.indexOf(e);
        arr.splice(idx, 1);
        setTag([...arr]);
    }

// ------------- write function -------------
    const writePost = async() => {
        if(validation_check()){ // 제목, 내용 유무 체크
            const post = {
                title : titleRef.current.value.trim(),
                content : getContent(),
                tags : tags,
            }
            uploadDB(post);
        }
    }

    const validation_check = () => {
        const title = titleRef.current.value.trim();
        const content = getMarkDown();
        if(title === '' || content === ''){
            alert('제목 또는 내용을 입력해주세요.')
            // 오류 표시 추가
            return false;
        }else{
            return true;
        }
    }

    return(
        <>
            {/* 제목 */}
            <input ref={titleRef} type="text" placeholder="제목을 입력해주세요." maxLength={50} 
            className="w-full border border-b-0 dark:border-none bg-white text-black text-lg md:text-xl py-3 md:py-4 px-3 rounded-t-sm outline-none"/>
            <Editor ref={editorRef}
                    initialValue={init === undefined ? '' : init.content}
                initialEditType='wysiwyg'
                hideModeSwitch={true}
                height='500px'
                usageStatistics={false}
                toolbarItems={toolbarItems}
                plugins={[colorSyntax, ]}
            />
            
            <div className="tag-wrap flex mb-3 py-2 px-4 border border-t-0 bg-white text-black rounded-b-sm ctd">
                
                <TagItem tags={tags} deleteTag={deleteTag}/>
                <div ref={tagRef} className="block tag-input w-full relative">
                    <input type="text" placeholder='태그입력' onKeyDown={addnDek_Tag} onChange={spaceRemove} 
                    className="relative inline-block w-full p-1 pl-3 bg-white text-black outline-0 focus:outline-0 text-sm ctd"/>
                </div>
                
            </div>

            <button onClick={writePost} className='w-full p-2 text-gray-100 bg-blue-400 hover:bg-blue-500 transition duration-300 rounded-sm'>작성하기</button>

        </>
    )

}

export default WysiwygEditor
