'use client'

export default function FormBuilderGuide() {
    return (
        <div style={{
            backgroundColor: '#1a1a1a',
            border: '1px solid #333',
            borderRadius: '8px',
            padding: '2rem',
            margin: '1rem 0',
            color: '#fff'
        }}>
            <h2 style={{ marginBottom: '1rem' }}>🚀 Quick Start Guide</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                <div>
                    <h3 style={{ color: '#0066cc', marginBottom: '0.5rem' }}>1. Choose a Template</h3>
                    <p style={{ color: '#ccc', fontSize: '0.9rem' }}>
                        Start with one of our pre-built templates or create from scratch
                    </p>
                </div>

                <div>
                    <h3 style={{ color: '#0066cc', marginBottom: '0.5rem' }}>2. Customize Fields</h3>
                    <p style={{ color: '#ccc', fontSize: '0.9rem' }}>
                        Add, remove, or modify form fields to match your needs
                    </p>
                </div>

                <div>
                    <h3 style={{ color: '#0066cc', marginBottom: '0.5rem' }}>3. Style Your Form</h3>
                    <p style={{ color: '#ccc', fontSize: '0.9rem' }}>
                        Choose colors, themes, and button text
                    </p>
                </div>

                <div>
                    <h3 style={{ color: '#0066cc', marginBottom: '0.5rem' }}>4. Publish & Share</h3>
                    <p style={{ color: '#ccc', fontSize: '0.9rem' }}>
                        Get your public form URL and start collecting submissions
                    </p>
                </div>
            </div>

            <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#2a2a2a', borderRadius: '4px' }}>
                <p style={{ color: '#ccc', fontSize: '0.9rem', margin: 0 }}>
                    💡 <strong>Pro Tip:</strong> Your form URL will be: <code>your-site.com/[tenant-slug]/[form-slug]</code>
                </p>
            </div>
        </div>
    )
}