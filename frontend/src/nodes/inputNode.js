// frontend/src/nodes/inputNode.js
import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

// MAKE SURE THIS SAYS 'InputNode'
export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  return (
    <BaseNode
      id={id}
      data={data}
      handles={[{ type: 'source', position: Position.Right, id: 'value' }]}
    >
      <div><span style={{fontWeight: 'bold'}}>Input</span></div>
      <label style={{display: 'block', fontSize: '12px'}}>
        Name:
        <input 
            type="text" 
            value={currName} 
            onChange={(e) => setCurrName(e.target.value)} 
            style={{width: '90%'}}
        />
      </label>
      <label style={{display: 'block', fontSize: '12px', marginTop: '5px'}}>
        Type:
        <select value={inputType} onChange={(e) => setInputType(e.target.value)}>
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </BaseNode>
  );
}