import { Handle } from 'reactflow';

export const BaseNode = ({ id, data, children, handles = [], style = {}, label }) => {
  return (
    <div style={{ 
      width: 240, 
      height: 'auto',
      background: '#fff',
      borderRadius: '12px', // Modern soft corners
      border: '1px solid var(--vs-border)',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      transition: 'all 0.2s',
      ...style
    }}>
      {/* Handles with VectorShift Blue */}
      {handles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={`${id}-${handle.id}`}
          style={{
            ...handle.style,
            width: 10, height: 10, 
            background: '#fff', 
            border: '2px solid #5182FF' // Blue border, white center (very clean)
          }}
        />
      ))}

      {/* Header with Gradient */}
      <div style={{ 
        padding: '10px 14px', 
        // Subtle gradient background
        background: 'linear-gradient(to right, #f8fafc, #eff6ff)', 
        borderBottom: '1px solid #e2e8f0',
        fontWeight: '600',
        fontSize: '14px',
        color: '#430B8A', // Deep Purple text for headers
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <span>{label}</span>
        {/* Optional: Add a tiny status dot or icon here */}
      </div>

      {/* Body */}
      <div style={{ padding: '14px', fontSize: '13px', color: '#374151' }}>
        {children}
      </div>
    </div>
  );
};