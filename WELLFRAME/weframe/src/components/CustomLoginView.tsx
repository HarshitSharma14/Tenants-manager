'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CustomLoginView() {
    const [isSignup, setIsSignup] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        retypePassword: '',
        tenantName: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setSuccess('')

        if (isSignup) {
            // Signup validation
            if (formData.password !== formData.retypePassword) {
                setError('Passwords do not match')
                setLoading(false)
                return
            }
            if (!formData.tenantName.trim()) {
                setError('Company/Tenant name is required')
                setLoading(false)
                return
            }

            // Handle signup
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
                    setSuccess('Account created successfully! Please log in with your credentials.')
                    setIsSignup(false) // Switch to login mode
                    setFormData({
                        email: formData.email, // Keep email
                        password: '',
                        retypePassword: '',
                        tenantName: ''
                    })
                } else {
                    setError(result.error || 'Signup failed')
                }
            } catch (err) {
                setError('Network error occurred')
            }
        } else {
            // Handle login - use Payload's built-in login
            try {
                const response = await fetch('/api/users/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password
                    })
                })

                const result = await response.json()

                if (response.ok) {
                    // Successful login - redirect to admin dashboard
                    window.location.href = '/admin'
                } else {
                    setError(result.errors?.[0]?.message || 'Login failed')
                }
            } catch (err) {
                setError('Network error occurred')
            }
        }

        setLoading(false)
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        {isSignup ? 'Create Tenant Account' : 'Sign in to Admin'}
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Multi-tenant Form Builder
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                            {success}
                        </div>
                    )}

                    <div className="space-y-4">
                        {isSignup && (
                            <div>
                                <label htmlFor="tenantName" className="block text-sm font-medium text-gray-700">
                                    Company/Tenant Name
                                </label>
                                <input
                                    id="tenantName"
                                    name="tenantName"
                                    type="text"
                                    required={isSignup}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Your Company Name"
                                    value={formData.tenantName}
                                    onChange={(e) => setFormData({ ...formData, tenantName: e.target.value })}
                                />
                            </div>
                        )}

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="admin@yourcompany.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>

                        {isSignup && (
                            <div>
                                <label htmlFor="retypePassword" className="block text-sm font-medium text-gray-700">
                                    Confirm Password
                                </label>
                                <input
                                    id="retypePassword"
                                    name="retypePassword"
                                    type="password"
                                    required={isSignup}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-one focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Confirm Password"
                                    value={formData.retypePassword}
                                    onChange={(e) => setFormData({ ...formData, retypePassword: e.target.value })}
                                />
                            </div>
                        )}
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                            {loading ? 'Processing...' : (isSignup ? 'Create Account' : 'Sign In')}
                        </button>
                    </div>

                    <div className="text-center">
                        <button
                            type="button"
                            onClick={() => {
                                setIsSignup(!isSignup)
                                setError('')
                                setSuccess('')
                                setFormData({
                                    email: formData.email, // Keep email when switching
                                    password: '',
                                    retypePassword: '',
                                    tenantName: ''
                                })
                            }}
                            className="text-indigo-600 hover:text-indigo-500 text-sm underline"
                        >
                            {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Create one"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}