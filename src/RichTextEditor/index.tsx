import React, { useState, useRef } from "react";
import "./styles.css";
import {
  RichUtils,
  EditorState,
  Editor,
  getDefaultKeyBinding,
  ContentBlock,
  DraftHandleValue
} from "draft-js";
//import Editor from "@draft-js-plugins/editor";
import {BlockStyleControls} from './Editor/BlockStyleControls'
import {InlineStyleControls} from './Editor/InlineStyleControls'

const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
};

function getBlockStyle(block: ContentBlock): string {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return "";
  }
}

const RichTextEditor = () => {
  const [state, setState] = useState<EditorState>(EditorState.createEmpty());
 // const editor = useRef(null);
  const editor = useRef<Editor>(null);
  let focus:any = null;
  if (editor.current != null){
        focus =  editor.current.focus();
  };
  const onChange = (editorState: EditorState) => {
    setState(editorState);
  };

  const handleKeyCommand = (
    command: string,
    editorState: EditorState
  ): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      onChange(newState);
    }
    if (command === "myeditor-save") {

      return "handled";
    }
    return "not-handled";
  };

  const mapKeyToEditorCommand:(e: React.KeyboardEvent) => any = (e: React.KeyboardEvent) => {
    if (e.keyCode === 9) {
      const newEditorState = RichUtils.onTab(e, state, 4);
      if (newEditorState !== state) {
        onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  };

  const toggleBlockType = (blockType: string) => {
    onChange(RichUtils.toggleBlockType(state, blockType));
  };
// const toggleBlockType = (blockType: string) => {
//     setEditorState(RichUtils.toggleBlockType(editorState, blockType));
//   };

  const toggleInlineStyle = (inlineStyle: string) => {
    onChange(RichUtils.toggleInlineStyle(state, inlineStyle));
  };
//     const toggleInlineStyle = (inlineStyle: string) => {
//     setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
//   };

  let className = "RichEditor-root";
  var contentState = state.getCurrentContent();

  if (!contentState.hasText()) {
    if (
      contentState
        .getBlockMap()
        .first()
        .getType() !== "unstyled"
    ) {
      className += "RichEditor-hidePlaceholder";
    }
  }
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );

  return (
    <div className="RichEditor-root">
      <BlockStyleControls editorState={state} onToggle={toggleBlockType} />
      <InlineStyleControls editorState={state} onToggle={toggleInlineStyle} />
      <div className={className} onClick={focus}>
        {/* <Editor
           editorState={editorState} 
          //  onChange={setEditorState}
          // blockStyleFn={getBlockStyle}
          //   customStyleMap={styleMap}
          //   handleKeyCommand={handleKeyCommand}
          //  keyBindingFn={mapKeyToEditorCommand}
          //  onChange1={onChange}
          //   placeholder="Say something..."
          //   ref={editor}
          //   spellCheck={true}
        /> */}
      </div>
    </div>
  );
};

export { RichTextEditor };
