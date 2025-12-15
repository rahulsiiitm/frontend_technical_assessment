import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { MdOutput } from 'react-icons/md';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  return (
    <BaseNode id={id} data={data} label="Output" icon={MdOutput} handles={[{ type: 'target', position: Position.Left, id: 'value' }]}>
      <label style={{display: 'block', marginBottom: '8px'}}>
        Name:
        <input type="text" value={currName} onChange={(e) => setCurrName(e.target.value)} />
      </label>
      <label style={{display: 'block'}}>
        Type:
        <select value={outputType} onChange={(e) => setOutputType(e.target.value)}>
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </select>
      </label>
    </BaseNode>
  );
}