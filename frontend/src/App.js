import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    // Main Container: Flex row to put Sidebar (left) and Canvas (right) side-by-side
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Bar (Optional, for Submit Button) */}
      <div style={{ height: '50px', display: 'flex', alignItems: 'center', padding: '0 20px', borderBottom: '1px solid #ccc', justifyContent: 'space-between' }}>
        <h3 style={{ margin: 0 }}>Pipeline Builder</h3>
        <SubmitButton />
      </div>

      {/* Workspace Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
        
        {/* Left Sidebar (Toolbar) */}
        <div style={{ width: '250px', borderRight: '1px solid #ccc', background: '#f7f9fb' }}>
          <PipelineToolbar />
        </div>

        {/* Right Canvas */}
        <div style={{ flex: 1 }}>
          <PipelineUI />
        </div>
      
      </div>
    </div>
  );
}

export default App;