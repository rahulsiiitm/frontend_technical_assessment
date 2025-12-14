import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const FilterNode = ({ id, data }) => {
  return (
    <BaseNode id={id} data={data} label="Filter" handles={[
        { type: 'target', position: Position.Left, id: 'in' },
        { type: 'source', position: Position.Right, id: 'out' }
    ]}>
      <div style={{fontSize: '12px', color: '#6b7280', marginBottom: '8px'}}>
        Filters data stream based on keywords.
      </div>
      <label>
        Keyword:
        <input type="text" placeholder="e.g. error" />
      </label>
    </BaseNode>
  );
};