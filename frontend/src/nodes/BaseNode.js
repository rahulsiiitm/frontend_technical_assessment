// src/nodes/BaseNode.js
import { Handle } from 'reactflow';
import { useStore } from '../store'; // Import the store to access removeNode

export const BaseNode = ({ id, data, children, handles = [], style = {}, label, icon: Icon }) => {
  // Grab the removeNode function from the store
  const removeNode = useStore((state) => state.removeNode);

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

      {/* Styled Header with Icon and Close Button */}
      <div style={{
        padding: '8px 12px',
        background: 'linear-gradient(to right, #2a2a2a, #1a1a1a)',
        borderBottom: '1px solid #333',
        fontWeight: '600',
        fontSize: '14px',
        color: '#C2D3FF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between', // Push the X button to the right
      }}>
        {/* Left Side: Icon + Label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {Icon && <Icon size={16} color="#5182FF" />}
          <span>{label}</span>
        </div>

        {/* Right Side: Remove Button */}
        <button
          onClick={() => removeNode(id)}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#a2adc4ff',
            cursor: 'pointer',
            fontSize: '16px',
            padding: '0 4px',
            lineHeight: 1,
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => e.target.style.color = '#ef4444'} // Turn red on hover
          onMouseLeave={(e) => e.target.style.color = '#a2adc4ff'}
          title="Remove Node"
        >
          ✕
        </button>
      </div>

      {/* Body */}
      <div style={{ padding: '12px', fontSize: '13px', color: '#E5E7EB' }}>
        {children}
      </div>
    </div>
  );
};