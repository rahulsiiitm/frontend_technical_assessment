import { Handle } from 'reactflow';

export const BaseNode = ({ id, data, children, handles = [], style = {}, label, icon: Icon }) => {
  return (
    <div style={{ 
      width: 240, 
      height: 'auto',
      background: '#1E1E1E',
      borderRadius: '10px',
      border: '1px solid #444',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      transition: 'all 0.2s',
      ...style
    }}>
      {/* Dynamic Handles */}
      {handles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={`${id}-${handle.id}`}
          style={{
            ...handle.style,
            width: 8, height: 8, 
            background: '#5182FF',
            border: '2px solid #1E1E1E'
          }}
        />
      ))}

      {/* Styled Header with Icon */}
      <div style={{ 
        padding: '8px 12px', 
        background: 'linear-gradient(to right, #2a2a2a, #1a1a1a)', 
        borderBottom: '1px solid #333',
        fontWeight: '600',
        fontSize: '14px',
        color: '#C2D3FF',
        display: 'flex',
        alignItems: 'center',
        gap: '8px' // Space between icon and text
      }}>
        {/* Render Icon if provided */}
        {Icon && <Icon size={16} color="#5182FF" />}
        <span>{label}</span>
      </div>

      {/* Body */}
      <div style={{ padding: '12px', fontSize: '13px', color: '#E5E7EB' }}>
        {children}
      </div>
    </div>
  );
};