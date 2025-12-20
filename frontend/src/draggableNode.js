export const DraggableNode = ({ type, label, icon }) => {
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
        height: '36px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '8px',
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        color: '#EAEAEA',
        padding: '0 12px',
        gap: '8px',
        transition: 'all 0.2s',
        fontSize: '12px',
        fontWeight: '500',
      }}
      draggable
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#3B82F6';
        e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.querySelector('span').style.color = '#60A5FA';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.querySelector('span').style.color = '#a78bfa';
      }}
    >
      {icon && <span style={{ fontSize: '14px', color: '#a78bfa', transition: 'color 0.2s' }}>{icon}</span>}
      <span>{label}</span>
    </div>
  );
};