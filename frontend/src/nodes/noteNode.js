import { BaseNode } from './BaseNode';
import { MdStickyNote2 } from 'react-icons/md';

export const NoteNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      label="Sticky Note"
      icon={MdStickyNote2}
      handles={[]}
      style={{ background: '#2a2520', borderColor: '#d97706' }}
    >
      <textarea
        placeholder="Write a note..."
        style={{
          background: 'transparent',
          border: 'none',
          minHeight: '60px',
          resize: 'none',
          fontSize: '13px',
          color: '#fbbf24'
        }}
      />
    </BaseNode>
  );
}