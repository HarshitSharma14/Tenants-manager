import { getPayload } from 'payload'
import config from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ tenant: string; slug: string }> }
) {
    try {
        const { tenant, slug } = await params // Await params first
        const payload = await getPayload({ config })

        console.log('Looking for tenant:', tenant)

        // Find tenant
        const tenants = await payload.find({
            collection: 'tenants',
            where: { slug: { equals: tenant } }
        })

        console.log('Found tenants:', tenants.docs.length)

        if (tenants.docs.length === 0) {
            const allTenants = await payload.find({
                collection: 'tenants'
            })
            console.log('All tenants in DB:', allTenants.docs)

            return NextResponse.json({
                error: 'Tenant not found',
                searchedFor: tenant,
                allTenants: allTenants.docs.map(t => t.slug)
            }, { status: 404 })
        }

        // Find form
        const forms = await payload.find({
            collection: 'forms',
            where: {
                and: [
                    { tenant: { equals: tenants.docs[0].id } },
                    { slug: { equals: slug } }
                ]
            }
        })

        if (forms.docs.length === 0) {
            return NextResponse.json({ error: 'Form not found' }, { status: 404 })
        }

        return NextResponse.json(forms.docs[0])
    } catch (error) {
        console.error('API Error:', error)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ tenant: string; slug: string }> }
) {
    try {
        const { tenant, slug } = await params // Await params first
        const payload = await getPayload({ config })
        const body = await request.json()

        // Find tenant and form (same logic as GET)
        const tenants = await payload.find({
            collection: 'tenants',
            where: { slug: { equals: tenant } }
        })

        if (tenants.docs.length === 0) {
            return NextResponse.json({ error: 'Tenant not found' }, { status: 404 })
        }

        const forms = await payload.find({
            collection: 'forms',
            where: {
                and: [
                    { tenant: { equals: tenants.docs[0].id } },
                    { slug: { equals: slug } }
                ]
            }
        })

        if (forms.docs.length === 0) {
            return NextResponse.json({ error: 'Form not found' }, { status: 404 })
        }

        // Create submission
        const submission = await payload.create({
            collection: 'form-submissions',
            data: {
                tenant: tenants.docs[0].id,
                form: forms.docs[0].id,
                submissionData: body,
            }
        })

        return NextResponse.json({ success: true, id: submission.id })
    } catch (error) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}