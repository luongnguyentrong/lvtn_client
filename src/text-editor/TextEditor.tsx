// import * as React from 'react';
// import * as ReactDOMServer from 'react-dom/server';
// import ReactQuill from 'react-quill';
// import * as FileSaver from 'file-saver';
// import htmlToDocx from 'html-to-docx';

// interface MyComponentState {
//   content: string;
// }

// class MyComponent extends React.Component<{}, MyComponentState> {
//   constructor(props: {}) {
//     super(props);
//     this.state = {
//       content: '',
//     };
//   }
//   handleChange = (value: string) => {
//     this.setState({ content: value });
//   };
//   handleClick = async () => {
//     const { content } = this.state;
//     const html = ReactDOMServer.renderToString(<div dangerouslySetInnerHTML={{ __html: content }} />);
//     const docx = await htmlToDocx(html);
//     const blob = new Blob([docx], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
//     FileSaver.saveAs(blob, 'document.docx');
//   };
//   render() {
//     return (
//       <div>
//       <ReactQuill value={this.state.content} onChange={this.handleChange} />
//       <button onClick={this.handleClick}>Convert to Word</button>
//     </div>
//     );
//   }
//   // ...
// }
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
function TextEditor() {
  return (
    
    <ReactQuill/>
  )
}

export default TextEditor