'use client'

import { useState, useEffect } from 'react'

interface Form {
    id: string
    title: string
    slug: string
    description?: string
    isActive: boolean
    createdAt: string
    updatedAt: string
    fields: any[]
}

export default function FormsListView() {
    const [forms, setForms] = useState<Form[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchForms()
    }, [])

    const fetchForms = async () => {
        try {
            const response = await fetch('/api/forms')
            const data = await response.json()
            setForms(data.docs || [])
        } catch (error) {
            console.error('Error fetching forms:', error)
        } finally {
            setLoading(false)
        }
    }

    const deleteForm = async (formId: string) => {
        if (!confirm('Are you sure you want to delete this form?')) return

        try {
            await fetch(`/api/forms/${formId}`, { method: 'DELETE' })
            setForms(forms.filter(form => form.id !== formId))
        } catch (error) {
            console.error('Error deleting form:', error)
        }
    }

    if (loading) {
        return <div style={{ padding: '2rem', color: '#fff' }}>Loading forms...</div>
    }

    return (
        <div style={{ padding: '2rem', backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem'
            }}>
                <h1 style={{ color: '#fff', fontSize: '2rem', margin: 0 }}>My Forms</h1>

                href="/admin/collections/forms/create"
                style={{
                    background: '#0066cc',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    fontWeight: 'bold'
                }}
        >
                + Create New Form
            </a>
        </div>

      {
        forms.length === 0 ? (
            <div style={{
                textAlign: 'center',
                padding: '4rem',
                backgroundColor: '#1a1a1a',
                borderRadius: '8px',
                border: '1px solid #333'
            }}>
                <h3 style={{ color: '#fff', marginBottom: '1rem' }}>No forms yet</h3>
                <p style={{ color: '#ccc', marginBottom: '2rem' }}>
                    Create your first form to start collecting submissions
                </p>

                href="/admin/collections/forms/create"
                style={{
                    background: '#0066cc',
                    color: 'white',
                    padding: '1rem 2rem',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    fontWeight: 'bold'
                }}
          >
                Create Your First Form
            </a>
        </div >
      ) : (
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                gap: '1.5rem'
            }}>
                {forms.map((form) => (
                    <div
                        key={form.id}
                        style={{
                            backgroundColor: '#1a1a1a',
                            border: '1px solid #333',
                            borderRadius: '8px',
                            padding: '1.5rem',
                            transition: 'border-color 0.2s'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                            <div>
                                <h3 style={{ color: '#fff', margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>
                                    {form.title}
                                </h3>
                                <p style={{ color: '#999', fontSize: '0.9rem', margin: 0 }}>
                                    /{form.slug}
                                </p>
                            </div>
                            <div style={{
                                background: form.isActive ? '#0f5132' : '#721c24',
                                color: form.isActive ? '#75b798' : '#f1aeb5',
                                padding: '0.25rem 0.5rem',
                                borderRadius: '4px',
                                fontSize: '0.8rem'
                            }}>
                                {form.isActive ? 'Active' : 'Inactive'}
                            </div>
                        </div>

                        {form.description && (
                            <p style={{ color: '#ccc', fontSize: '0.9rem', marginBottom: '1rem' }}>
                                {form.description}
                            </p>
                        )}

                        <div style={{ color: '#999', fontSize: '0.8rem', marginBottom: '1.5rem' }}>
                            <div>📝 {form.fields?.length || 0} fields</div>
                            <div>📅 Created {new Date(form.createdAt).toLocaleDateString()}</div>
                        </div>

                        <div style={{ display: 'flex', gap: '0.5rem' }}>

                            href={`/admin/collections/forms/${form.id}`}
                            style={{
                                background: '#0066cc',
                                color: 'white',
                                padding: '0.5rem 1rem',
                                borderRadius: '4px',
                                textDecoration: 'none',
                                fontSize: '0.9rem',
                                flex: 1,
                                textAlign: 'center'
                            }}
                >
                            Edit
                        </a>
                        <button
                            onClick={() => deleteForm(form.id)}
                            style={{
                                background: '#dc3545',
                                color: 'white',
                                border: 'none',
                                padding: '0.5rem 1rem',
                                borderRadius: '4px',
                                fontSize: '0.9rem',
                                cursor: 'pointer'
                            }}
                        >
                            Delete
                        </button>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(`${window.location.origin}/tenant-slug/${form.slug}`)
                                alert('Form URL copied to clipboard!')
                            }}
                            style={{
                                background: '#6c757d',
                                color: 'white',
                                border: 'none',
                                padding: '0.5rem 1rem',
                                borderRadius: '4px',
                                fontSize: '0.9rem',
                                cursor: 'pointer'
                            }}
                        >
                            📋
                        </button>
                    </div>
            </div>
        ))
    }
        </div >
      )
}
    </div >
  )
}