import { useState, useRef, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { MdTextFields } from 'react-icons/md';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [handles, setHandles] = useState([{ type: 'source', position: Position.Right, id: 'output' }]);
  const textareaRef = useRef(null);

  useEffect(() => {
    const regex = /\{\{(.*?)\}\}/g;
    const matches = [];
    let match;

    while ((match = regex.exec(currText)) !== null) {
      const varName = match[1].trim();
      if (varName && !matches.includes(varName)) {
        matches.push(varName);
      }
    }

    const newHandles = matches.map((variable, index) => ({
      type: 'target',
      position: Position.Left,
      id: variable,
      style: { top: `${30 + (index * 20)}px` }
    }));

    newHandles.push({ type: 'source', position: Position.Right, id: 'output' });
    setHandles(newHandles);

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [currText]);

  return (
    <BaseNode id={id} data={data} label="Text" icon={MdTextFields} handles={handles}>
      <label style={{ display: 'block', fontSize: '12px' }}>
        <span style={{ marginBottom: '5px', display: 'block' }}>Text:</span>
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
          style={{
            width: '100%',
            minHeight: '40px',
            resize: 'none',
            overflow: 'hidden'
          }}
        />
      </label>
    </BaseNode>
  );
}