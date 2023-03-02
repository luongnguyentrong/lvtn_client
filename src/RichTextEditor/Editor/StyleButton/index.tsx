import React from "react";

interface IStyleButton {
  style: any;
  active: boolean;
  label: string;
  onToggle: (e: any) => void;
}
const StyleButton = (props: IStyleButton) => {
  const { style, active, label, onToggle } = props;

  const onToggleButton = (e: any) => {
    e.preventDefault();
    onToggle(style);
  };
  let className = "RichEditor-styleButton";

  if (active) {
    className += " RichEditor-activeButton";
  }
  return (
    <span className={className} onMouseDown={onToggleButton}>
      {label}
    </span>
  );
};

export { StyleButton };
