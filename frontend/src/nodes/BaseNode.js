// frontend/src/nodes/BaseNode.js
import { Handle, Position } from 'reactflow';

export const BaseNode = ({ id, data, children, handles = [] }) => {
  return (
    <div style={{ 
      width: 200, 
      height: 80, 
      border: '1px solid black', 
      background: 'white',
      borderRadius: '8px',
      padding: '10px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    }}>
      {/* Render Handles Dynamically */}
      {handles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={`${id}-${handle.id}`}
          style={handle.style}
        />
      ))}

      {/* Render Specific Node Content */}
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {children}
      </div>
    </div>
  );
};