'use client'

import { useState } from 'react'

export default function SignupButton() {
    const [showSignup, setShowSignup] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        retypePassword: '',
        tenantName: ''
    })
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setMessage('')

        // Validation
        if (formData.password !== formData.retypePassword) {
            setError('Passwords do not match')
            setLoading(false)
            return
        }

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    tenantName: formData.tenantName
                })
            })

            const result = await response.json()

            if (response.ok) {
                setMessage('Account created successfully! You can now login with your credentials.')
                setShowSignup(false)
                setFormData({ email: '', password: '', retypePassword: '', tenantName: '' })
            } else {
                setError(result.error || 'Signup failed')
            }
        } catch (err) {
            setError('Network error occurred')
        }

        setLoading(false)
    }

    if (!showSignup) {
        return (
            <div style={{
                marginTop: '2rem',
                textAlign: 'center',
                padding: '1.5rem',
                border: '1px solid #ddd',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9'
            }}>
                {message && (
                    <div style={{
                        background: '#d4edda',
                        color: '#155724',
                        padding: '1rem',
                        borderRadius: '4px',
                        marginBottom: '1rem',
                        border: '1px solid #c3e6cb'
                    }}>
                        {message}
                    </div>
                )}

                <p style={{ marginBottom: '1rem', color: '#666', fontSize: '1rem' }}>
                    Don't have an account?
                </p>
                <button
                    onClick={() => setShowSignup(true)}
                    style={{
                        background: '#007cba',
                        color: 'white',
                        border: 'none',
                        padding: '0.75rem 2rem',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontWeight: 'bold'
                    }}
                >
                    Create Tenant Account
                </button>
            </div>
        )
    }

    return (
        <div style={{
            marginTop: '2rem',
            border: '1px solid #ddd',
            padding: '2rem',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9'
        }}>
            <h3 style={{ marginBottom: '1.5rem', textAlign: 'center', color: '#333' }}>
                Create New Tenant Account
            </h3>

            {error && (
                <div style={{
                    background: '#f8d7da',
                    color: '#721c24',
                    padding: '1rem',
                    borderRadius: '4px',
                    marginBottom: '1rem',
                    border: '1px solid #f5c6cb'
                }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSignup}>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: 'bold',
                        color: '#333'
                    }}>
                        Company/Tenant Name *
                    </label>
                    <input
                        type="text"
                        value={formData.tenantName}
                        onChange={(e) => setFormData({ ...formData, tenantName: e.target.value })}
                        required
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '1rem',
                            boxSizing: 'border-box'
                        }}
                        placeholder="Your Company Name"
                    />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: 'bold',
                        color: '#333'
                    }}>
                        Email Address *
                    </label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '1rem',
                            boxSizing: 'border-box'
                        }}
                        placeholder="admin@yourcompany.com"
                    />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: 'bold',
                        color: '#333'
                    }}>
                        Password *
                    </label>
                    <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '1rem',
                            boxSizing: 'border-box'
                        }}
                        placeholder="Password"
                    />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: 'bold',
                        color: '#333'
                    }}>
                        Confirm Password *
                    </label>
                    <input
                        type="password"
                        value={formData.retypePassword}
                        onChange={(e) => setFormData({ ...formData, retypePassword: e.target.value })}
                        required
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '1rem',
                            boxSizing: 'border-box'
                        }}
                        placeholder="Confirm Password"
                    />
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            background: '#28a745',
                            color: 'white',
                            border: 'none',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            flex: 1,
                            fontWeight: 'bold',
                            opacity: loading ? 0.5 : 1
                        }}
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            setShowSignup(false)
                            setError('')
                            setFormData({ email: '', password: '', retypePassword: '', tenantName: '' })
                        }}
                        style={{
                            background: '#6c757d',
                            color: 'white',
                            border: 'none',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '1rem'
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}