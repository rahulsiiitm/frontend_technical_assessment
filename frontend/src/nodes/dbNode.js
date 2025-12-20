import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { MdStorage } from 'react-icons/md';

export const DBNode = ({ id, data }) => {
  return (
    <BaseNode id={id} data={data} label="Database" icon={MdStorage} handles={[
      { type: 'source', position: Position.Right, id: 'data' }
    ]}>
      <label style={{ display: 'block', marginBottom: '10px' }}>
        DB Name:
        <input type="text" placeholder="my_postgres_db" />
      </label>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <input type="checkbox" style={{ width: 'auto', marginRight: '5px' }} />
          Read-only
        </label>
      </div>
    </BaseNode>
  );
}