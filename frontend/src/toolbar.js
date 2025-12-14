import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
    return (
        <div style={{ padding: '20px' }}>
            <div style={{ marginBottom: '10px', fontSize: '12px', fontWeight: 'bold', color: '#555' }}>
                DRAG & DROP
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
            </div>
        </div>
    );
};