// src/nodes/BaseNode.js
import { Handle } from 'reactflow';
import { useStore } from '../store';

export const BaseNode = ({ id, data, children, handles = [], style = {}, label, icon: Icon }) => {
  const removeNode = useStore((state) => state.removeNode);

  return (
    <div style={{
      width: 200,
      background: '#18181B',
      borderRadius: '16px',
      border: 'none',
      boxShadow: '0 8px 16px -4px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.05)',

      display: 'flex',
      flexDirection: 'column',
      fontFamily: '"Montserrat", sans-serif',
      overflow: 'hidden',
      transition: 'box-shadow 0.2s, background-color 0.2s',
      ...style
    }}>

      {/* HANDLES */}
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
            border: '2px solid #18181B',
            boxShadow: '0 0 0 1px rgba(81, 130, 255, 0.3)',
            zIndex: 10,
          }}
        />
      ))}

      {/* HEADER */}
      <div style={{
        padding: '10px 14px 8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {Icon && (
            <div style={{
              color: '#5182FF',
              background: 'rgba(81, 130, 255, 0.1)',
              width: '24px', height: '24px',
              borderRadius: '6px',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Icon size={14} />
            </div>
          )}

          <span style={{
            fontWeight: '600',
            fontSize: '12px',
            color: '#F3F4F6',
            letterSpacing: '0.2px'
          }}>
            {label}
          </span>
        </div>

        <button
          onClick={() => removeNode(id)}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#52525B',
            cursor: 'pointer',
            fontSize: '16px',
            padding: '2px',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'color 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.color = '#EF4444'}
          onMouseLeave={(e) => e.target.style.color = '#52525B'}
        >
          ✕
        </button>
      </div>

      {/* BODY */}
      <div style={{
        padding: '12px 14px 16px',
        fontSize: '11px',
        color: '#D1D5DB',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        {children}
      </div>
    </div>
  );
};