import { useState, useRef, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode'; // Assuming you created BaseNode in Part 1

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [handles, setHandles] = useState([{ type: 'source', position: Position.Right, id: 'output' }]);
  const textareaRef = useRef(null);

  // Logic to parse variables like {{ variable }}
  useEffect(() => {
    const regex = /\{\{(.*?)\}\}/g;
    const matches = [];
    let match;
    
    // Extract unique variable names
    while ((match = regex.exec(currText)) !== null) {
      const varName = match[1].trim();
      if (varName && !matches.includes(varName)) {
        matches.push(varName);
      }
    }
    
    // Create handles for each variable
    const newHandles = matches.map((variable, index) => ({
      type: 'target', 
      position: Position.Left, 
      id: variable, 
      style: { top: `${30 + (index * 20)}px` } // Stack them nicely
    }));

    // Always keep the output handle
    newHandles.push({ type: 'source', position: Position.Right, id: 'output' });
    setHandles(newHandles);
    
    // Auto-resize height
    if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [currText]);

  return (
    <BaseNode id={id} data={data} handles={handles}>
      <div><span style={{fontWeight: 'bold'}}>Text</span></div>
      <label style={{display: 'block', fontSize: '12px'}}>
        <span style={{marginBottom: '5px', display: 'block'}}>Text:</span>
        <textarea 
          ref={textareaRef}
          value={currText} 
          onChange={(e) => setCurrText(e.target.value)} 
          style={{
            width: '100%', 
            minHeight: '40px', 
            resize: 'none', 
            overflow: 'hidden',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
      </label>
    </BaseNode>
  );
}