import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { MdCheckCircle, MdError, MdClose } from 'react-icons/md';

export const SubmitButton = () => {
    const { nodes, edges } = useStore(
        (state) => ({ nodes: state.nodes, edges: state.edges }),
        shallow
    );

    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('https://vectorshift-assessment-4wjz.onrender.com/pipelines/parse', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nodes, edges }),
            });

            const data = await response.json();
            setResult(data);
            setModalOpen(true);
        } catch (error) {
            console.error(error);
            alert('Error connecting to backend');
        } finally {
            setIsLoading(false);
        }
    };

    const modalContent = (
        <div
            className="animate-fade-in"
            style={{
                position: 'fixed',
                top: 0, left: 0,
                width: '100vw', height: '100vh',
                background: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(8px)',
                zIndex: 9999,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: '"Montserrat", sans-serif'
            }}
            onClick={() => setModalOpen(false)}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    width: '340px',
                    background: '#14161F',
                    border: '1px solid #272A36',
                    borderRadius: '16px',
                    padding: '24px',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
                    color: '#F3F4F6',
                    position: 'relative',
                }}
            >
                <button
                    onClick={() => setModalOpen(false)}
                    style={{
                        position: 'absolute', top: '16px', right: '16px',
                        background: 'transparent', border: 'none',
                        color: '#6B7280', cursor: 'pointer'
                    }}
                >
                    <MdClose size={20} />
                </button>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{
                        width: '64px', height: '64px', borderRadius: '50%',
                        background: result?.is_dag ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px',
                        boxShadow: result?.is_dag ? '0 0 20px rgba(16, 185, 129, 0.2)' : '0 0 20px rgba(239, 68, 68, 0.2)'
                    }}>
                        {result?.is_dag ? <MdCheckCircle size={32} color="#10B981" /> : <MdError size={32} color="#EF4444" />}
                    </div>
                    <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
                        {result?.is_dag ? 'Pipeline Verified' : 'Invalid Pipeline'}
                    </h2>
                    <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#9CA3AF' }}>
                        {result?.is_dag ? 'Your pipeline is a valid DAG.' : 'Cycles detected in the graph.'}
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                    <div style={{ background: '#1C1E29', border: '1px solid #272A36', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
                        <span style={{ display: 'block', fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase', marginBottom: '4px' }}>Nodes</span>
                        <span style={{ display: 'block', fontSize: '20px', fontWeight: 'bold', color: '#F3F4F6' }}>{result?.num_nodes}</span>
                    </div>
                    <div style={{ background: '#1C1E29', border: '1px solid #272A36', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
                        <span style={{ display: 'block', fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase', marginBottom: '4px' }}>Edges</span>
                        <span style={{ display: 'block', fontSize: '20px', fontWeight: 'bold', color: '#F3F4F6' }}>{result?.num_edges}</span>
                    </div>
                </div>

                <button
                    onClick={() => setModalOpen(false)}
                    style={{
                        width: '100%', padding: '10px',
                        background: result?.is_dag ? '#2563eb' : '#374151',
                        color: 'white', border: 'none', borderRadius: '8px',
                        fontWeight: '600', cursor: 'pointer', transition: 'background 0.2s',
                        fontFamily: '"Montserrat", sans-serif'
                    }}
                >
                    {result?.is_dag ? 'Done' : 'Fix Pipeline'}
                </button>
            </div>
        </div>
    );

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                style={{
                    padding: '10px 24px',
                    background: 'linear-gradient(135deg, #5182FF 0%, #7C3AED 100%)',
                    border: 'none',
                    borderRadius: '24px',
                    color: 'white',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    fontFamily: '"Montserrat", sans-serif',
                    fontSize: '13px',
                    fontWeight: '600',
                    boxShadow: '0 4px 14px 0 rgba(81, 130, 255, 0.4)',
                    transition: 'all 0.2s',
                    opacity: isLoading ? 0.7 : 1,
                    display: 'flex', alignItems: 'center', gap: '8px'
                }}
                onMouseEnter={(e) => !isLoading && (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={(e) => !isLoading && (e.currentTarget.style.transform = 'translateY(0)')}
            >
                {isLoading ? (
                    <div className="animate-spin" style={{ // Uses global CSS now
                        width: '16px', height: '16px', border: '2px solid #fff',
                        borderTop: '2px solid transparent', borderRadius: '50%',
                    }} />
                ) : (
                    'Submit Pipeline'
                )}
            </button>

            {modalOpen && createPortal(modalContent, document.body)}
        </div>
    );
}