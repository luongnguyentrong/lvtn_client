 import React, { useRef, useEffect } from 'react';
import { Quill, TextChangeHandler } from 'quill';
declare module 'quill' {
  interface Quill {
    destroy(): void;
  }
}
const Editor = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow'
      });
    }
    const handleTextChange: TextChangeHandler = (delta, oldDelta, source) => {
      console.log('Text changed:', delta);
    };
    return () => {
      if (quillRef.current){
        quillRef.current.off('text-change',handleTextChange);
      }
      //quillRef.current?.off('text-change',handleTextChange);
      // quillRef.current?.destroy();
      if (quillRef.current) {
        quillRef.current.destroy();
      }
    };
  }, []);

  const handleChange = () => {
   // const contents = quillRef.current?.getContents();
    if (quillRef.current){ 
      const contents = quillRef.current.getContents();
    console.log('Text changed:', contents);
    }
  };

  useEffect(() => {
    if (quillRef.current){
    quillRef.current.on('text-change', handleChange);
    }
  }, []);

  return (
    <div ref={editorRef} />
  );
};

export default Editor;
