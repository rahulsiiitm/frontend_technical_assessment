// src/toolbar.js
import { DraggableNode } from './draggableNode';
import { BsInputCursorText, BsFileText, BsDatabase, BsCpu } from 'react-icons/bs';
import { BiNetworkChart, BiTransfer } from 'react-icons/bi';
import { MdStickyNote2, MdApi, MdOutput } from 'react-icons/md';

export const PipelineToolbar = () => {
    return (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <DraggableNode type='customInput' label='Input' icon={<BsInputCursorText />} />
            <DraggableNode type='llm' label='LLM' icon={<BsCpu />} />
            <DraggableNode type='customOutput' label='Output' icon={<MdOutput />} />
            <DraggableNode type='text' label='Text' icon={<BsFileText />} />
            <DraggableNode type='transform' label='Transform' icon={<BiTransfer />} />
            <DraggableNode type='filter' label='Filter' icon={<BiNetworkChart />} />
            <DraggableNode type='note' label='Note' icon={<MdStickyNote2 />} />
            <DraggableNode type='db' label='DB' icon={<BsDatabase />} />
            <DraggableNode type='api' label='API' icon={<MdApi />} />
        </div>
    );
};