import { useState, useRef, useEffect } from 'react'
import '@toast-ui/editor/dist/toastui-editor.css'

import { Editor } from '@toast-ui/react-editor'
import 'tui-color-picker/dist/tui-color-picker.css'
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css'
import colorSyntax from '@toast-ui/editor-plugin-color-syntax'


const WysiwygEditor = ({confirm}) => {

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

        confirm(contentMark);

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
            <button onClick={showTxt} className='w-full p-2 mt-2 text-gray-100 bg-blue-400 hover:bg-blue-500 transition duration-300 rounded-md'>작성하기</button>
        </>
    )

}

export default WysiwygEditor