import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { FaBold,FaItalic,FaStrikethrough,FaCode,FaHeading, FaListOl,FaListUl
, FaQuoteLeft,FaRedo,FaUndo, FaUnderline,FaImage,FaYoutube } from "react-icons/fa";
import { AiOutlineEnter } from "react-icons/ai";
import { RiPageSeparator,RiMarkPenFill } from "react-icons/ri";
import { BsBlockquoteRight } from "react-icons/bs";
import Underline from "@tiptap/extension-underline";
import Document from '@tiptap/extension-document'
import Dropcursor from '@tiptap/extension-dropcursor'
import Image from '@tiptap/extension-image'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import React, { useCallback } from 'react'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import { lowlight } from 'lowlight'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Highlight from '@tiptap/extension-highlight'
import Youtube from '@tiptap/extension-youtube'
import './CommentEditor.css';

lowlight.registerLanguage('html', html)
lowlight.registerLanguage('css', css)
lowlight.registerLanguage('js', js)
lowlight.registerLanguage('ts', ts)


const MenuBar = ({ editor }) => {
  
  if (!editor) {
    return null
  }

  return (
    <div className="menu-bar">
    <div>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleBold()
            .run()
        }
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        <FaBold/>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        <FaItalic/>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleUnderline()
            .run()
        }
        className={editor.isActive('underline') ? 'is-active' : ''}
      >
        <FaUnderline/>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleStrike()
            .run()
        }
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        <FaStrikethrough/>
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHighlight({ color: '#ffc078' }).run()}
        className={editor.isActive('highlight', { color: '#ffc078' }) ? 'is-active' : ''}
      >
        <div className='hi-orange'>
          <RiMarkPenFill/>
        </div>
        
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHighlight({ color: '#8ce99a' }).run()}
        className={editor.isActive('highlight', { color: '#8ce99a' }) ? 'is-active' : ''}
      >
        <div className='hi-green'>
          <RiMarkPenFill/>
        </div>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHighlight({ color: '#74c0fc' }).run()}
        className={editor.isActive('highlight', { color: '#74c0fc' }) ? 'is-active' : ''}
      >
        <div className='hi-blue'>
          <RiMarkPenFill/>
        </div>
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
      >
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
      >
        h2
      </button>

      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'is-active' : ''}
      >
        <FaCode/>
        </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
      >
        <BsBlockquoteRight/>
      </button>
      
      <button onClick={() => editor.chain().focus().setHardBreak().run()}>
        <AiOutlineEnter/>
      </button>

      </div>
      <div>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .undo()
            .run()
        }
      >
        <FaUndo/>
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .redo()
            .run()
        }
      >
        <FaRedo/>
      </button>
      </div>
    </div>
  )
}

const CommentEditor = ({setTextComment}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Document, 
      Paragraph, 
      Text, 
      Image, 
      Dropcursor,
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Highlight.configure({ multicolor: true }),
      Youtube.configure({
        controls: false,
      }),
    ],
    content: ``,
    onUpdate:({editor}) =>{
        const html =editor.getHTML()
        setTextComment(html)
        console.log(html)
    },
    editorProps: {
      attributes: {
        spellcheck: 'false',
      },
    },
  })


  return (
    <div className='text-editor'>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
      {/* <EditorContent editor={editor} /> */}
    </div>
  )
}


export default CommentEditor;