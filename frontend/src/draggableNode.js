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
          minWidth: '80px', 
          height: '40px',
          display: 'flex', 
          alignItems: 'center', 
          borderRadius: '4px',
          backgroundColor: '#fff', // White background
          border: '1px solid #ccc', // Subtle border
          justifyContent: 'center', 
          flexDirection: 'column',
          marginBottom: '10px',
          boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
        }} 
        draggable
      >
          <span style={{ color: '#333', fontSize: '14px' }}>{label}</span>
      </div>
    );
  };