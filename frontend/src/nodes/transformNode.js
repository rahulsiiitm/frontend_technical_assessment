import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { MdTransform } from 'react-icons/md';

export const TransformNode = ({ id, data }) => {
  const [func, setFunc] = useState('uppercase');
  return (
    <BaseNode id={id} data={data} label="Transform" icon={MdTransform} handles={[
        { type: 'target', position: Position.Left, id: 'in' },
        { type: 'source', position: Position.Right, id: 'out' }
    ]}>
      <label>
        Operation:
        <select value={func} onChange={(e) => setFunc(e.target.value)}>
          <option value="uppercase">To Upper Case</option>
          <option value="lowercase">To Lower Case</option>
          <option value="json">To JSON</option>
        </select>
      </label>
    </BaseNode>
  );
}