import { getPayload } from 'payload'
import config from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const { email, password, tenantName } = await request.json()
        const payload = await getPayload({ config })

        // Validation
        if (!email || !password || !tenantName) {
            return NextResponse.json({
                error: 'Email, password, and tenant name are required'
            }, { status: 400 })
        }

        // Check if user already exists
        const existingUsers = await payload.find({
            collection: 'users',
            where: { email: { equals: email } }
        })

        if (existingUsers.docs.length > 0) {
            return NextResponse.json({
                error: 'User with this email already exists'
            }, { status: 400 })
        }

        // Create tenant first
        const tenant = await payload.create({
            collection: 'tenants',
            data: {
                name: tenantName,
                slug: tenantName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
            }
        })

        // Create user with tenant
        const user = await payload.create({
            collection: 'users',
            data: {
                email,
                password,
                tenant: tenant.id,
                role: 'tenant-admin'
            }
        })

        return NextResponse.json({
            success: true,
            message: 'Account created successfully. You can now log in.',
            user: { id: user.id, email: user.email }
        })

    } catch (error: any) {
        console.error('Signup error:', error)
        return NextResponse.json({
            error: error.message || 'Failed to create account'
        }, { status: 400 })
    }
}