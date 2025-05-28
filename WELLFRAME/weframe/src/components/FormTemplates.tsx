'use client'

import { useState } from 'react'

const FORM_TEMPLATES = [
    {
        name: 'Contact Us',
        description: 'Basic contact form with name, email, and message',
        fields: [
            { name: 'fullName', label: 'Full Name', type: 'text', required: true, placeholder: 'Enter your full name' },
            { name: 'email', label: 'Email Address', type: 'email', required: true, placeholder: 'your@email.com' },
            { name: 'phone', label: 'Phone Number', type: 'tel', required: false, placeholder: '(555) 123-4567' },
            { name: 'message', label: 'Message', type: 'textarea', required: true, placeholder: 'How can we help you?' }
        ]
    },
    {
        name: 'Lead Generation',
        description: 'Capture leads with company and job title information',
        fields: [
            { name: 'firstName', label: 'First Name', type: 'text', required: true },
            { name: 'lastName', label: 'Last Name', type: 'text', required: true },
            { name: 'email', label: 'Email Address', type: 'email', required: true },
            { name: 'company', label: 'Company Name', type: 'text', required: true },
            { name: 'jobTitle', label: 'Job Title', type: 'text', required: false },
            { name: 'website', label: 'Website', type: 'url', required: false }
        ]
    },
    {
        name: 'Event Registration',
        description: 'Event registration with dietary preferences',
        fields: [
            { name: 'fullName', label: 'Full Name', type: 'text', required: true },
            { name: 'email', label: 'Email Address', type: 'email', required: true },
            { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
            { name: 'company', label: 'Company/Organization', type: 'text', required: false },
            { name: 'dietaryRestrictions', label: 'Dietary Restrictions', type: 'textarea', required: false }
        ]
    },
    {
        name: 'Feedback Survey',
        description: 'Customer feedback form with rating',
        fields: [
            { name: 'name', label: 'Name (Optional)', type: 'text', required: false },
            { name: 'email', label: 'Email (Optional)', type: 'email', required: false },
            {
                name: 'rating', label: 'Overall Rating', type: 'select', required: true, options: [
                    { label: '⭐⭐⭐⭐⭐ Excellent', value: '5' },
                    { label: '⭐⭐⭐⭐ Good', value: '4' },
                    { label: '⭐⭐⭐ Average', value: '3' },
                    { label: '⭐⭐ Poor', value: '2' },
                    { label: '⭐ Very Poor', value: '1' }
                ]
            },
            { name: 'feedback', label: 'Your Feedback', type: 'textarea', required: true }
        ]
    },
    {
        name: 'Newsletter Signup',
        description: 'Simple newsletter subscription form',
        fields: [
            { name: 'email', label: 'Email Address', type: 'email', required: true, placeholder: 'Enter your email' },
            { name: 'firstName', label: 'First Name', type: 'text', required: false, placeholder: 'Your first name' },
            {
                name: 'interests', label: 'Interests', type: 'checkbox', required: false, options: [
                    { label: 'Product Updates', value: 'products' },
                    { label: 'Industry News', value: 'news' },
                    { label: 'Special Offers', value: 'offers' },
                    { label: 'Events', value: 'events' }
                ]
            }
        ]
    }
]

export default function FormTemplates({ onSelectTemplate }: { onSelectTemplate: (template: any) => void }) {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1rem',
            padding: '1rem'
        }}>
            {FORM_TEMPLATES.map((template, index) => (
                <div
                    key={index}
                    style={{
                        border: '1px solid #333',
                        borderRadius: '8px',
                        padding: '1.5rem',
                        backgroundColor: '#1a1a1a',
                        cursor: 'pointer',
                        transition: 'border-color 0.2s'
                    }}
                    onClick={() => onSelectTemplate(template)}
                    onMouseOver={(e) => e.currentTarget.style.borderColor = '#0066cc'}
                    onMouseOut={(e) => e.currentTarget.style.borderColor = '#333'}
                >
                    <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>{template.name}</h3>
                    <p style={{ color: '#ccc', marginBottom: '1rem', fontSize: '0.9rem' }}>
                        {template.description}
                    </p>
                    <div style={{ fontSize: '0.8rem', color: '#999' }}>
                        {template.fields.length} fields
                    </div>
                </div>
            ))}
        </div>
    )
}