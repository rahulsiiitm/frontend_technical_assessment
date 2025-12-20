import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { SiOpenai } from 'react-icons/si'; // Brain/AI Icon

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      label="LLM Engine"
      icon={SiOpenai}
      handles={[
        { type: 'target', position: Position.Left, id: 'system', style: { top: '33%' } },
        { type: 'target', position: Position.Left, id: 'prompt', style: { top: '66%' } },
        { type: 'source', position: Position.Right, id: 'response' }
      ]}
    >
      <div style={{ fontSize: '12px', color: '#aaa' }}>
        Connect inputs to power this Large Language Model.
      </div>
    </BaseNode>
  );
}