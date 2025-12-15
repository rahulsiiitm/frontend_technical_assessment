import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { MdStorage } from 'react-icons/md';

export const DBNode = ({ id, data }) => {
  return (
    <BaseNode id={id} data={data} label="Database" icon={MdStorage} handles={[
      { type: 'source', position: Position.Right, id: 'data' }
    ]}>
      <label>
        DB Name:
        <input type="text" placeholder="my_postgres_db" />
      </label>
      <label style={{ marginTop: '10px', display: 'block' }}>
        <input type="checkbox" /> Read-only
      </label>
    </BaseNode>
  );
}