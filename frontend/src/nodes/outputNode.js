import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  return (
    <BaseNode
      id={id}
      data={data}
      handles={[{ type: 'target', position: Position.Left, id: 'value' }]}
    >
      <div><span style={{fontWeight: 'bold'}}>Output</span></div>
      <label style={{display: 'block', fontSize: '12px'}}>
        Name:
        <input type="text" value={currName} onChange={(e) => setCurrName(e.target.value)} style={{width: '90%'}} />
      </label>
      <label style={{display: 'block', fontSize: '12px', marginTop: '5px'}}>
        Type:
        <select value={outputType} onChange={(e) => setOutputType(e.target.value)}>
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </select>
      </label>
    </BaseNode>
  );
}