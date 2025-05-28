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
            <div className="mt-8 text-center p-6 border border-gray-300 rounded-lg bg-gray-50">
                {message && (
                    <div className="bg-green-100 text-green-800 p-4 rounded border border-green-300 mb-4">
                        {message}
                    </div>
                )}

                <p className="mb-4 text-gray-600 text-base">
                    Don't have an account?
                </p>
                <button
                    onClick={() => setShowSignup(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded cursor-pointer transition-colors duration-200"
                >
                    Create Tenant Account
                </button>
            </div>
        )
    }

    return (
        <div className="mt-8 border border-gray-300 p-8 rounded-lg bg-gray-50">
            <h3 className="mb-6 text-center text-gray-800 text-xl font-semibold">
                Create New Tenant Account
            </h3>

            {error && (
                <div className="bg-red-100 text-red-800 p-4 rounded border border-red-300 mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSignup} className="space-y-4">
                <div>
                    <label className="block mb-2 font-bold text-gray-800">
                        Company/Tenant Name *
                    </label>
                    <input
                        type="text"
                        value={formData.tenantName}
                        onChange={(e) => setFormData({ ...formData, tenantName: e.target.value })}
                        required
                        className="w-full p-3 border border-gray-300 rounded text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Your Company Name"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-bold text-gray-800">
                        Email Address *
                    </label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="w-full p-3 border border-gray-300 rounded text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="admin@yourcompany.com"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-bold text-gray-800">
                        Password *
                    </label>
                    <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                        className="w-full p-3 border border-gray-300 rounded text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Password"
                    />
                </div>

                <div className="mb-6">
                    <label className="block mb-2 font-bold text-gray-800">
                        Confirm Password *
                    </label>
                    <input
                        type="password"
                        value={formData.retypePassword}
                        onChange={(e) => setFormData({ ...formData, retypePassword: e.target.value })}
                        required
                        className="w-full p-3 border border-gray-300 rounded text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Confirm Password"
                    />
                </div>

                <div className="flex gap-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-bold py-3 px-6 rounded cursor-pointer text-base flex-1 transition-colors duration-200"
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
                        className="bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded cursor-pointer text-base transition-colors duration-200"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}