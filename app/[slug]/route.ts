import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug

  return NextResponse.json({
    status: 'success',
    slug: slug,
    message: `You reached the destination for: ${slug}`,
    timestamp: new Date().toISOString(),
  })
}
