import { useStore } from './store';
import { shallow } from 'zustand/shallow';

export const SubmitButton = () => {
    const { nodes, edges } = useStore(
        (state) => ({ nodes: state.nodes, edges: state.edges }),
        shallow
    );

    const handleSubmit = async () => {
        try {
            // Send data to backend
            const response = await fetch('http://127.0.0.1:8000/pipelines/parse', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nodes, edges }),
            });

            const data = await response.json();

            // Display result
            alert(
                `Pipeline Analysis:\n` +
                `Nodes: ${data.num_nodes}\n` +
                `Edges: ${data.num_edges}\n` +
                `Is DAG: ${data.is_dag}`
            );
        } catch (error) {
            console.error(error);
            alert('Error: Could not connect to backend. Is uvicorn running?');
        }
    };

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px'}}>
            <button 
                type="button" 
                onClick={handleSubmit}
                style={{
                    padding: '10px 20px',
                    background: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '16px'
                }}
            >
                Submit
            </button>
        </div>
    );
}