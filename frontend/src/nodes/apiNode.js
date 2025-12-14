import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const APINode = ({ id, data }) => {
  return (
    <BaseNode id={id} data={data} label="API Call" handles={[
        { type: 'target', position: Position.Left, id: 'trigger' },
        { type: 'source', position: Position.Right, id: 'response' }
    ]}>
      <label>
        Endpoint:
        <input type="text" placeholder="https://api.example.com" />
      </label>
      <div style={{marginTop: '10px', fontSize: '11px', color: '#6b7280'}}>
        Method: POST
      </div>
    </BaseNode>
  );
};