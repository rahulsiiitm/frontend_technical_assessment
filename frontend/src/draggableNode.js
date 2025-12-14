export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className={type}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        style={{ 
          cursor: 'grab', 
          minWidth: '60px', 
          height: '40px',
          display: 'flex', 
          alignItems: 'center', 
          borderRadius: '8px',
          backgroundColor: '#fff', 
          border: '1px solid #E5E7EB',
          color: '#374151',
          justifyContent: 'center', 
          flexDirection: 'column',
          marginBottom: '10px',
          transition: 'all 0.2s',
          fontSize: '13px',
          fontWeight: '500',
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
        }}
        // Add hover effect via simple inline logic or CSS class
        onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#5182FF';
            e.currentTarget.style.color = '#5182FF';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#E5E7EB';
            e.currentTarget.style.color = '#374151';
        }}
        draggable
      >
          <span>{label}</span>
      </div>
    );
  };