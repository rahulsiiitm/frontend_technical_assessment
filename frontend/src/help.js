// src/help.js
import { createPortal } from 'react-dom';
import { MdClose, MdDragIndicator, MdCable, MdDataObject, MdCheckCircle } from 'react-icons/md';
import { SiGithub, SiLinkedin } from 'react-icons/si'; // Import Social Icons

export const HelpModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const modalContent = (
        <div
            className="animate-fade-in"
            style={{
                position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
                background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)',
                zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    width: '500px', background: '#14161F', border: '1px solid #272A36',
                    borderRadius: '16px', padding: '30px', position: 'relative',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
                    fontFamily: 'Montserrat, sans-serif'
                }}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer'
                    }}
                >
                    <MdClose size={24} />
                </button>

                <h2 style={{ marginTop: 0, color: '#F3F4F6', fontSize: '20px' }}>How to use the Builder</h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px', marginBottom: '30px' }}>

                    {/* Step 1 */}
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <div style={{ width: 32, height: 32, background: 'rgba(81, 130, 255, 0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5182FF' }}>
                            <MdDragIndicator size={18} />
                        </div>
                        <div>
                            <h4 style={{ margin: '0 0 4px', color: '#E5E7EB' }}>1. Drag & Drop</h4>
                            <p style={{ margin: 0, color: '#9CA3AF', fontSize: '13px', lineHeight: '1.5' }}>
                                Pick nodes from the bottom toolbar and drop them onto the canvas.
                            </p>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <div style={{ width: 32, height: 32, background: 'rgba(124, 58, 237, 0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7C3AED' }}>
                            <MdDataObject size={18} />
                        </div>
                        <div>
                            <h4 style={{ margin: '0 0 4px', color: '#E5E7EB' }}>2. Use Variables</h4>
                            <p style={{ margin: 0, color: '#9CA3AF', fontSize: '13px', lineHeight: '1.5' }}>
                                Type <code style={{ color: '#A78BFA', background: 'rgba(124, 58, 237, 0.1)', padding: '2px 4px', borderRadius: '4px' }}>{'{{ input }}'}</code> in any Text node to create dynamic handles.
                            </p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <div style={{ width: 32, height: 32, background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981' }}>
                            <MdCable size={18} />
                        </div>
                        <div>
                            <h4 style={{ margin: '0 0 4px', color: '#E5E7EB' }}>3. Connect Nodes</h4>
                            <p style={{ margin: 0, color: '#9CA3AF', fontSize: '13px', lineHeight: '1.5' }}>
                                Link outputs to inputs to define the flow of data.
                            </p>
                        </div>
                    </div>

                    {/* Step 4 */}
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <div style={{ width: 32, height: 32, background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EF4444' }}>
                            <MdCheckCircle size={18} />
                        </div>
                        <div>
                            <h4 style={{ margin: '0 0 4px', color: '#E5E7EB' }}>4. Submit & Verify</h4>
                            <p style={{ margin: 0, color: '#9CA3AF', fontSize: '13px', lineHeight: '1.5' }}>
                                Click 'Submit Pipeline' to verify that your graph is a valid DAG.
                            </p>
                        </div>
                    </div>

                </div>

                {/* --- NEW FOOTER SECTION --- */}
                <div style={{
                    borderTop: '1px solid #272A36',
                    paddingTop: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <span style={{ color: '#6B7280', fontSize: '12px' }}>
                        Developed by <span style={{ color: '#E5E7EB', fontWeight: '600' }}>Rahul</span>
                    </span>

                    <div style={{ display: 'flex', gap: '15px' }}>
                        <a
                            href="https://github.com/rahulsiiitm"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: '#9CA3AF', transition: 'color 0.2s', display: 'flex', alignItems: 'center' }}
                            onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                            onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}
                        >
                            <SiGithub size={20} />
                        </a>
                        <a
                            href="https://linkedin.com/in/rahulsharma2k4"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: '#9CA3AF', transition: 'color 0.2s', display: 'flex', alignItems: 'center' }}
                            onMouseEnter={(e) => e.currentTarget.style.color = '#0A66C2'} // LinkedIn Blue on Hover
                            onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}
                        >
                            <SiLinkedin size={20} />
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
};