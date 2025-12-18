import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* GLASS HEADER */}
      <div style={{ 
          height: '70px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          padding: '0 30px', 
          zIndex: 10,
          // Glass effect
          background: 'rgba(0, 0, 0, 0.3)', 
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        
        {/* Logo Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
             {/* The "VS" Gradient Box */}
             <div style={{ 
                 width: 32, height: 32, 
                 background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)', 
                 borderRadius: '6px',
                 display: 'flex', alignItems: 'center', justifyContent: 'center',
                 color: '#fff', fontWeight: 'bold', fontSize: '14px'
             }}>VS</div>
             
             <div>
                 <h3 style={{ margin: 0, color: '#fff', fontSize: '16px', fontWeight: '600' }}>VectorShift</h3>
                 <span style={{ fontSize: '11px', color: '#9CA3AF' }}>Pipeline Automation</span>
             </div>
        </div>

        {/* Right Actions */}
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: '#9CA3AF', cursor: 'pointer' }}>Help</span>
            <SubmitButton />
        </div>
      </div>

      {/* Main Workspace - Transparent to show the body's nebula glow */}
      <div style={{ flex: 1, position: 'relative' }}>
          <PipelineUI />
      </div>

              {/* Toolbar in the middle */}
        <div style={{ 
            background: 'rgba(255,255,255,0.05)', 
            padding: '6px 12px', 
            borderRadius: '12px', 
            border: '1px solid rgba(255,255,255,0.05)' ,
            margin: '20px auto',
        }}>
            <PipelineToolbar />
        </div>

    </div>
  );
}

export default App;