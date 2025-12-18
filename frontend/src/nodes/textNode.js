import { useState, useRef, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { MdTextFields } from 'react-icons/md';
import { useDebounce } from '../utils'; // Import the hook

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  
  // OPTIMIZATION: Only parse variables when the user stops typing for 500ms
  const debouncedText = useDebounce(currText, 500); 

  const [handles, setHandles] = useState([]);
  const textareaRef = useRef(null);

  // Parse variables only when 'debouncedText' changes
  useEffect(() => {
    const regex = /\{\{(.*?)\}\}/g;
    const matches = [];
    let match;

    while ((match = regex.exec(debouncedText)) !== null) {
      const varName = match[1].trim();
      if (varName && !matches.includes(varName)) {
        matches.push(varName);
      }
    }

    const newHandles = matches.map((variable, index) => ({
      type: 'target',
      position: Position.Left,
      id: variable,
      style: { top: `${60 + (index * 24)}px` } // Better spacing for new design
    }));

    newHandles.push({ type: 'source', position: Position.Right, id: 'output' });
    setHandles(newHandles);

  }, [debouncedText]); // Dependency is now debouncedText, not currText

  // Dynamic Height Adjustment
  useEffect(() => {
     if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
  }, [currText]);

  return (
    <BaseNode id={id} data={data} label="Text" icon={MdTextFields} handles={handles} style={{ height: 'auto', minHeight: '100px' }}>
      <label style={{ display: 'block', fontSize: '12px', color: '#8B8D98', marginBottom: '4px' }}>
        Enter text with vars:
      </label>
      <textarea
        ref={textareaRef}
        value={currText}
        onChange={(e) => setCurrText(e.target.value)}
        style={{
          width: '100%',
          minHeight: '60px',
          maxHeight: '300px',
          resize: 'none',
          overflowY: 'hidden',
          background: '#1C1E29',
          border: '1px solid #272A36',
          borderRadius: '4px',
          color: '#fff',
          padding: '8px',
          fontSize: '12px',
          fontFamily: 'monospace' // Code-like feel for variables
        }}
        placeholder="Type something like {{ input }}..."
      />
    </BaseNode>
  );
}