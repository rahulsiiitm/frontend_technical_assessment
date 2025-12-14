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
          backgroundColor: '#2D2D2D', // Dark Grey Chip
          border: '1px solid #444',
          color: '#E5E7EB',           // Light text
          justifyContent: 'center', 
          flexDirection: 'column',
          marginBottom: '10px',
          transition: 'all 0.2s',
          fontSize: '13px',
          fontWeight: '500',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#5182FF'; // Glow Blue on hover
            e.currentTarget.style.color = '#5182FF';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#444';
            e.currentTarget.style.color = '#E5E7EB';
        }}
        draggable
      >
          <span>{label}</span>
      </div>
    );
  };