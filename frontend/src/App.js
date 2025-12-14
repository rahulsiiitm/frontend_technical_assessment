import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', background: '#121212' }}>
      
      {/* Top Bar - Dark */}
      <div style={{ 
          height: '50px', 
          display: 'flex', 
          alignItems: 'center', 
          padding: '0 20px', 
          background: '#18181B', // Slightly lighter dark
          borderBottom: '1px solid #333', 
          justifyContent: 'space-between' 
      }}>
        <h3 style={{ margin: 0, color: '#C2D3FF', fontWeight: 600 }}>Pipeline Builder</h3>
        <SubmitButton />
      </div>

      {/* Main Workspace */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
        
        {/* Left Sidebar - Dark */}
        <div style={{ 
            width: '250px', 
            background: '#18181B', 
            borderRight: '1px solid #333' 
        }}>
          <PipelineToolbar />
        </div>

        {/* Canvas Area */}
        <div style={{ flex: 1 }}>
          <PipelineUI />
        </div>
      
      </div>
    </div>
  );
}

export default App;