import React from 'react'
import { EditorState } from 'draft-js';
import {StyleButton} from '../StyleButton'

var INLINE_STYLES = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  { label: "Monospace", style: "CODE" }
];

interface IInlineStyleControls {
  editorState: EditorState;
  onToggle: (e: any) => void;
}
const InlineStyleControls = (props: IInlineStyleControls) => {
  const { editorState, onToggle } = props;
  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

export {InlineStyleControls}