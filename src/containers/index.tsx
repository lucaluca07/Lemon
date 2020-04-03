import * as React from 'react';

const Index: React.FC = () => {
  const [text, setText] = React.useState('');
  const node = React.createRef<HTMLParagraphElement>();
  const handleInput = (e: React.FormEvent) => {
    e.preventDefault();
    const text = (e.target as HTMLElement).innerHTML;
    console.log(text);
    const selection = window.getSelection();
    if (selection) {
      const range = selection.getRangeAt(0);
      const rang = document.createRange(); // 创建一个rang对象
      const content = (e.target as HTMLElement).firstChild;
      if (content) {
        const { startOffset, endOffset } = range;
        rang.setStart(content, startOffset);
        rang.setEnd(content, 1);
        rang.collapse(false); // 起始位置和终止位置是否相同的布尔值
        selection.removeAllRanges(); // 移除选中区域的range对象
        selection.addRange(rang); // 给选中区域添加range对象
      }

      console.log(range);
      setTimeout(() => {
        selection.addRange(range);
      }, 60);
    }

    console.log(selection);
    setText(text);
    // document.execCommand('insertText', false, text || '');
  };

  return (
    <div>
      <h1>Index</h1>
      <div>
        <p
          style={{ height: 20, border: '1px solid #eee' }}
          dangerouslySetInnerHTML={{ __html: text }}
          onPaste={(e) => {
            e.preventDefault();
            let text = e.clipboardData.getData('text/plain') || '';
            const tasks = text?.split(/\n+/g).filter((item) => !!item);
            if (tasks.length > 1) {
              console.log('多行文本', tasks);
            } else {
              document.execCommand('insertText', false, text || '');
              setText(text);
            }
          }}
          contentEditable
          ref={node}
          onInput={handleInput}
        />
      </div>
    </div>
  );
};

export default Index;
