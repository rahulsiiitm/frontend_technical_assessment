import { BaseNode } from './BaseNode';

export const NoteNode = ({ id, data }) => {
  return (
    <BaseNode 
        id={id} 
        data={data} 
        label="Sticky Note" 
        handles={[]} // No handles
        style={{ background: '#fffbeb', borderColor: '#fcd34d' }} // Yellow-ish
    >
      <textarea 
        placeholder="Write a note..." 
        style={{
            background: 'transparent', 
            border: 'none', 
            minHeight: '60px',
            resize: 'none',
            fontSize: '14px'
        }} 
      />
    </BaseNode>
  );
};