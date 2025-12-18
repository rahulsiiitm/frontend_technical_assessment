import { useState, useRef, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { MdTextFields } from 'react-icons/md';
import { useStore } from '../store';

export const TextNode = ({ id, data }) => {
  const [rawText, setRawText] = useState(data?.text || '{{input}}');
  const [handles, setHandles] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  
  // State for Dropdown & Cursor
  const [showDropdown, setShowDropdown] = useState(false);
  const [options, setOptions] = useState([]);
  const [cursorIndex, setCursorIndex] = useState(0);

  const textareaRef = useRef(null);
  const wrapperRef = useRef(null);

  const onConnect = useStore((state) => state.onConnect);
  const updateNodeField = useStore((state) => state.updateNodeField);

  // 1. Sync Text to Store
  useEffect(() => {
    updateNodeField(id, 'text', rawText);
  }, [rawText, id, updateNodeField]);

  // 2. Parse Variables, Create Handles & Auto-Connect
  useEffect(() => {
    const regex = /\{\{([^}]+)\}\}/g;
    const vars = [];
    let match;

    while ((match = regex.exec(rawText)) !== null) {
      const varName = match[1].trim();
      if (varName && !vars.includes(varName)) vars.push(varName);
    }

    const newHandles = vars.map((variable, index) => ({
      type: 'target',
      position: Position.Left,
      id: variable,
      style: { top: `${60 + (index * 28)}px` }
    }));

    newHandles.push({ type: 'source', position: Position.Right, id: 'output' });
    setHandles(newHandles);

    // Auto-Connect Logic
    const state = useStore.getState();
    vars.forEach((varName) => {
      const targetNode = state.nodes.find(
        (n) => n.id === varName || n.data?.inputName === varName
      );

      if (targetNode) {
        let sourceHandleId = 'output';
        if (targetNode.type === 'customInput') sourceHandleId = 'value';
        else if (targetNode.type === 'llm') sourceHandleId = 'response';
        else if (targetNode.type === 'api') sourceHandleId = 'response';

        const targetHandleId = `${id}-${varName}`;
        const connectionExists = state.edges.some(
          (edge) =>
            edge.source === targetNode.id &&
            edge.target === id &&
            (edge.targetHandle === targetHandleId || edge.targetHandle === varName)
        );

        if (!connectionExists) {
          onConnect({
            source: targetNode.id,
            sourceHandle: sourceHandleId,
            target: id,
            targetHandle: targetHandleId,
          });
        }
      }
    });
  }, [rawText, id, onConnect, updateNodeField]);

  // 3. Dropdown Logic
  const checkDropdownTrigger = (text, cursor) => {
    const textBeforeCursor = text.slice(0, cursor);
    const match = textBeforeCursor.match(/\{\{([a-zA-Z0-9_]*)$/);

    if (match) {
      const query = match[1].toLowerCase();
      const allNodes = useStore.getState().nodes;
      const filtered = allNodes
        .filter((n) => n.id !== id)
        .map((n) => ({
          id: n.id,
          label: n.data?.inputName || n.id,
          type: n.type
        }))
        .filter((opt) => opt.label.toLowerCase().includes(query));

      setOptions(filtered);
      setShowDropdown(filtered.length > 0);
    } else {
      setShowDropdown(false);
    }
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    const cursor = e.target.selectionStart;
    setRawText(val);
    setCursorIndex(cursor);
    checkDropdownTrigger(val, cursor);
  };

  const handleCursorSelect = (e) => {
    setCursorIndex(e.target.selectionStart);
    checkDropdownTrigger(e.target.value, e.target.selectionStart);
  };

  const selectOption = (optionLabel) => {
    const textBeforeCursor = rawText.slice(0, cursorIndex);
    const textAfterCursor = rawText.slice(cursorIndex);
    const lastDoubleCurly = textBeforeCursor.lastIndexOf('{{');

    if (lastDoubleCurly !== -1) {
      const prefix = rawText.slice(0, lastDoubleCurly);
      const newText = `${prefix}{{${optionLabel}}}${textAfterCursor}`;
      setRawText(newText);
      setShowDropdown(false);
      
      setTimeout(() => {
        if(textareaRef.current) textareaRef.current.focus();
      }, 0);
    }
  };

  // 4. Click Outside Listener (Capture Phase)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
        setIsEditing(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside, true);
    return () => document.removeEventListener('mousedown', handleClickOutside, true);
  }, []);

  // 5. Auto-resize Textarea
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [isEditing, rawText]);

  const renderContent = () => {
    if (!rawText) return <span style={{ color: '#9CA3AF' }}>Start typing...</span>;
    const parts = [];
    const regex = /\{\{([^}]+)\}\}/g;
    let lastIndex = 0;
    let match;
    let key = 0;

    while ((match = regex.exec(rawText)) !== null) {
      if (match.index > lastIndex) {
        parts.push(<span key={`text-${key++}`}>{rawText.substring(lastIndex, match.index)}</span>);
      }
      parts.push(
        <span key={`var-${key++}`} style={{
            color: '#5182FF', 
            background: 'rgba(81, 130, 255, 0.1)', 
            padding: '0 4px', 
            borderRadius: '4px',
            fontWeight: 500
        }}>
          {match[1]}
        </span>
      );
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < rawText.length) {
      parts.push(<span key={`text-${key++}`}>{rawText.substring(lastIndex)}</span>);
    }
    return parts;
  };

  return (
    <BaseNode 
      id={id} data={data} label="Text" icon={MdTextFields} handles={handles} 
      style={{ height: 'auto', minHeight: '100px', width: '250px', overflow: 'visible' }}
    >
      <div ref={wrapperRef} style={{ position: 'relative' }}>
        <label style={{ display: 'block', fontSize: '11px', color: '#9CA3AF', marginBottom: '8px', fontWeight: '500' }}>
          Text with variables
        </label>
      
        {isEditing ? (
          <textarea
            ref={textareaRef}
            className="nodrag"
            value={rawText}
            onChange={handleInputChange}
            onSelect={handleCursorSelect} 
            onClick={handleCursorSelect}  
            style={{
              width: '100%',
              minHeight: '60px',
              resize: 'none',
              overflowY: 'hidden',
              boxSizing: 'border-box'
              // Relies on global CSS for basic styling
            }}
          />
        ) : (
          <div 
            onClick={() => setIsEditing(true)} 
            style={{
              // Match global input styles for consistency
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '12px',
              padding: '10px 14px',
              minHeight: '60px',
              fontSize: '12px',
              cursor: 'text',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              color: '#fff'
            }}
          >
            {renderContent()}
          </div>
        )}

        {showDropdown && (
          <div className="nodrag" style={{
            position: 'absolute', top: '100%', left: 0, width: '100%',
            background: '#14161F', border: '1px solid #272A36',
            borderRadius: '8px', marginTop: '4px', zIndex: 9999,
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
            maxHeight: '150px', overflowY: 'auto'
          }}>
            {options.map((opt) => (
              <div 
                key={opt.id}
                onMouseDown={(e) => { e.stopPropagation(); selectOption(opt.label); }}
                style={{
                  padding: '8px 12px', cursor: 'pointer',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '12px'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#272A36'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <span style={{ color: '#F3F4F6' }}>{opt.label}</span>
                <span style={{ color: '#6B7280', fontSize: '10px', textTransform: 'uppercase' }}>{opt.type}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ fontSize: '10px', color: '#6B7280', marginTop: '8px', padding: '6px 8px', background: 'rgba(81, 130, 255, 0.05)', borderRadius: '4px' }}>
        💡 Type <code style={{ color: '#a78bfa' }}>{'{{'}</code> to see variables
      </div>
    </BaseNode>
  );
};