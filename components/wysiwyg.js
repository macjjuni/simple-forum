import { useState, useRef, useEffect } from 'react'
import '@toast-ui/editor/dist/toastui-editor.css'

import { Editor } from '@toast-ui/react-editor'
import 'tui-color-picker/dist/tui-color-picker.css'
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css'
import colorSyntax from '@toast-ui/editor-plugin-color-syntax'


const WysiwygEditor = () => {

    useEffect(()=> {
        
        const editorIns = editorRef.current.getInstance();
        editorIns.removeHook("addImageBlobHook");
        console.log('Remove addImageBlob Hook!');

        
    }, [])

    const editorRef = useRef(null);
    const [theme, setTheme] = useState('');

    const toolbarItems = [
        ['heading', 'bold', 'italic', 'strike'],
        ['hr'],
        ['ul', 'ol', 'task'],
        ['table', 'link'], 
        // 'image'
        ['code'],
        ['scrollSync'],
    ]

    const showTxt = () => {
        const editorIns = editorRef.current.getInstance();
        const contentHtml = editorIns.getHTML();
        const contentMark = editorIns.getMarkdown();
        if(contentMark === ''){
            console.log('내용없음')
        }else{
            console.log(contentMark)
        }
    }

    return(
        <>
            <Editor ref={editorRef}
                initialValue=''
                initialEditType='wysiwyg'
                hideModeSwitch={true}
                height='550px'
                theme={theme}
                usageStatistics={false}
                toolbarItems={toolbarItems}
                plugins={[colorSyntax, ]}
                
            />
            <button className='w-full p-2 mt-2 rounded-md bg-slate-200 text-gray-700' onClick={showTxt}>작성하기</button>
        </>
    )

}

export default WysiwygEditor