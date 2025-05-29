'use client'

import { useState } from 'react'

export default function SignupButton() {
    const [showSignup, setShowSignup] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        retypePassword: ''
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
                    password: formData.password
                })
            })

            const result = await response.json()

            if (response.ok) {
                setMessage('Account created successfully! You can now login with your credentials.')
                setShowSignup(false)
                setFormData({ email: '', password: '', retypePassword: '' })
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
                border: '1px solid #333',
                borderRadius: '8px',
                backgroundColor: '#1a1a1a'
            }}>
                {message && (
                    <div style={{
                        background: '#0f5132',
                        color: '#75b798',
                        padding: '1rem',
                        borderRadius: '4px',
                        marginBottom: '1rem',
                        border: '1px solid #0a3622'
                    }}>
                        {message}
                    </div>
                )}

                <p style={{ marginBottom: '1rem', color: '#ccc', fontSize: '1rem' }}>
                    Don't have an account?
                </p>
                <button
                    onClick={() => setShowSignup(true)}
                    style={{
                        background: '#0066cc',
                        color: 'white',
                        border: 'none',
                        padding: '0.75rem 2rem',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        transition: 'background-color 0.2s'
                    }}
                >
                    Create Admin Account
                </button>
            </div>
        )
    }

    return (
        <div style={{
            marginTop: '2rem',
            border: '1px solid #333',
            padding: '2rem',
            borderRadius: '8px',
            backgroundColor: '#1a1a1a'
        }}>
            <h3 style={{
                marginBottom: '1.5rem',
                textAlign: 'center',
                color: '#fff',
                fontSize: '1.25rem'
            }}>
                Create Admin Account
            </h3>

            {error && (
                <div style={{
                    background: '#721c24',
                    color: '#f1aeb5',
                    padding: '1rem',
                    borderRadius: '4px',
                    marginBottom: '1rem',
                    border: '1px solid #842029'
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
                        color: '#ccc',
                        fontSize: '0.9rem'
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
                            border: '1px solid #444',
                            borderRadius: '4px',
                            fontSize: '1rem',
                            boxSizing: 'border-box',
                            backgroundColor: '#2a2a2a',
                            color: '#fff'
                        }}
                        placeholder="admin@yourcompany.com"
                    />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: 'bold',
                        color: '#ccc',
                        fontSize: '0.9rem'
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
                            border: '1px solid #444',
                            borderRadius: '4px',
                            fontSize: '1rem',
                            boxSizing: 'border-box',
                            backgroundColor: '#2a2a2a',
                            color: '#fff'
                        }}
                        placeholder="Password"
                    />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: 'bold',
                        color: '#ccc',
                        fontSize: '0.9rem'
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
                            border: '1px solid #444',
                            borderRadius: '4px',
                            fontSize: '1rem',
                            boxSizing: 'border-box',
                            backgroundColor: '#2a2a2a',
                            color: '#fff'
                        }}
                        placeholder="Confirm Password"
                    />
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            background: loading ? '#155724' : '#28a745',
                            color: 'white',
                            border: 'none',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '4px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            fontSize: '1rem',
                            flex: 1,
                            fontWeight: 'bold',
                            opacity: loading ? 0.7 : 1,
                            transition: 'all 0.2s'
                        }}
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            setShowSignup(false)
                            setError('')
                            setFormData({ email: '', password: '', retypePassword: '' })
                        }}
                        style={{
                            background: '#6c757d',
                            color: 'white',
                            border: 'none',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            transition: 'background-color 0.2s'
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}