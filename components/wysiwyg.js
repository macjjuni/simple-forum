import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css'
import 'tui-color-picker/dist/tui-color-picker.css'

import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css'
import { Editor } from '@toast-ui/react-editor'
import colorSyntax from '@toast-ui/editor-plugin-color-syntax'

import TagItem from './tagitem'
import { useState, useRef, useEffect } from 'react'

const WysiwygEditor = ({confirm, init}) => {

    useEffect(()=> {  
        const editorIns = editorRef.current.getInstance();
        editorIns.removeHook("addImageBlobHook");
        console.log('Remove addImageBlob Hook!');    

        if(init){
            titleRef.current.value = init.title;
            setTag(init.tags);
        }

    }, [])

    useEffect(()=> {
        if(tags.length > 4){
            tagRef.current.classList.add('hidden');
        }else{
            tagRef.current.classList.replace('hidden', 'block');
        }
    }, tags)

    const titleRef = useRef(null);
    const tagRef = useRef(null);
    const editorRef = useRef(null);
    const [editData, setEditData] = useState(init === undefined ? '' : init.content);
    const [tags, setTag] = useState([]);


    const toolbarItems = [
        ['heading', 'bold', 'italic', 'strike'],
        ['hr'],
        ['ul', 'ol', 'task'],
        ['table', 'link'], 
        // 'image'
        ['code'],
        ['scrollSync'],
    ]

    const addTag = (e) => { //태그 추가
        const txt = e.target.value;
        if( e.keyCode === 13 && e.target.value !== ''){
            if(tags.indexOf(txt) === -1){
                setTag([...tags, txt])
                e.target.value = '';
            }else{ e.target.value = ''; }
        }
    }

    const spaceRemove = (e) => { //공백 제거
        e.target.value = e.target.value.replace(/ /g, '');
    }

    const deleteTag = (e) => { //태그 제거
        const arr = tags;
        const idx = tags.indexOf(e);
        arr.splice(idx, 1);
        setTag([...arr]);
    }

    const writeTxt = () => {
        const editorIns = editorRef.current.getInstance();
        const contentHtml = editorIns.getHTML();
        const contentMark = editorIns.getMarkdown();
        const post = {
            title : titleRef.current.value.trim(),
            content : contentHtml,
            tags : tags,
        }
        confirm(post, contentMark);
    }

    return(
        <>
            {/* 제목 */}
            <input ref={titleRef} type="text" placeholder="제목을 입력해주세요." maxLength={50} 
            className="w-full border dark:border-none bg-white text-black text-lg py-2 px-3 mb-3 rounded outline-none"/>
            <Editor ref={editorRef}
                initialValue={editData}
                initialEditType='wysiwyg'
                hideModeSwitch={true}
                height='500px'
                theme={''}
                usageStatistics={false}
                toolbarItems={toolbarItems}
                plugins={[colorSyntax, ]}
            />
            
            <div className="tag-wrap flex my-2 py-2 px-3 border bg-white text-black rounded-sm ctd">
                
                <TagItem tags={tags} deleteTag={deleteTag}/>
                <div ref={tagRef} className="block tag-input w-full relative ml-1">
                    <input type="text" placeholder='태그입력' onKeyDown={addTag} onChange={spaceRemove} 
                    className="relative inline-block w-full p-1 pl-3.5 bg-white text-black outline-0 focus:outline-0 text-sm ctd"/>
                </div>
                
            </div>

            <button onClick={writeTxt} className='w-full p-2 mt-2 text-gray-100 bg-blue-400 hover:bg-blue-500 transition duration-300 rounded-sm'>작성하기</button>
        </>
    )

}

export default WysiwygEditor
