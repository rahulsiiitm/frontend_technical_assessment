// src/App.js
import { useState } from 'react';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { HelpModal } from './help'; // Import the new component

function App() {
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* HEADER */}
      <div style={{
        height: '70px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 30px', zIndex: 10,
        background: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}>

        {/* Logo Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: 32, height: 32,
            background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
            borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 'bold', fontSize: '14px',
            boxShadow: '0 0 10px rgba(59, 130, 246, 0.3)'
          }}>VS</div>

          <div>
            <h3 style={{ margin: 0, color: '#F3F4F6', fontSize: '16px', fontWeight: '600', letterSpacing: '-0.5px' }}>VectorShift</h3>
            <span style={{ fontSize: '11px', color: '#9CA3AF' }}>Pipeline Automation</span>
          </div>
        </div>

        {/* Right Actions */}
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <button
            onClick={() => setIsHelpOpen(true)} // Toggle State
            style={{
              background: 'transparent', border: 'none',
              fontSize: '13px', color: '#9CA3AF', cursor: 'pointer', fontWeight: '500',
              transition: 'color 0.2s', fontFamily: 'Montserrat, sans-serif'
            }}
            onMouseEnter={(e) => e.target.style.color = '#fff'}
            onMouseLeave={(e) => e.target.style.color = '#9CA3AF'}
          >
            How it Works
          </button>
          <SubmitButton />
        </div>
      </div>

      {/* Main Workspace */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <PipelineUI />

        {/* FLOATING TOOLBAR */}
        <div className="toolbar-enter" style={{
          position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)',
          zIndex: 100, background: 'rgba(15, 23, 42, 0.6)', padding: '10px 20px',
          borderRadius: '20px', border: '1px solid #3B82F6',
          boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)', backdropFilter: 'blur(10px)',
        }}>
          <PipelineToolbar />
        </div>
      </div>

      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />

    </div>
  );
}

export default App;