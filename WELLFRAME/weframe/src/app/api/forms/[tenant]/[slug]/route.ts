import { getPayload } from 'payload'
import config from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ tenant: string; slug: string }> }
) {
    try {
        const { tenant, slug } = await params
        const payload = await getPayload({ config })

        // Use tenant header for plugin
        const forms = await payload.find({
            collection: 'forms',
            where: { slug: { equals: slug } },
            context: { tenant } // Plugin uses this context
        })

        if (forms.docs.length === 0) {
            return NextResponse.json({ error: 'Form not found' }, { status: 404 })
        }

        return NextResponse.json(forms.docs[0])
    } catch (error) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ tenant: string; slug: string }> }
) {
    try {
        const { tenant, slug } = await params
        const payload = await getPayload({ config })
        const body = await request.json()

        // Find form with tenant context
        const forms = await payload.find({
            collection: 'forms',
            where: { slug: { equals: slug } },
            context: { tenant }
        })

        if (forms.docs.length === 0) {
            return NextResponse.json({ error: 'Form not found' }, { status: 404 })
        }

        // Create submission with tenant context
        const submission = await payload.create({
            collection: 'form-submissions',
            data: {
                form: forms.docs[0].id,
                submissionData: body,
            },
            context: { tenant } // Plugin will handle tenant association
        })

        return NextResponse.json({ success: true, id: submission.id })
    } catch (error) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}