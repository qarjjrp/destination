import { NextResponse, type NextRequest } from 'next/server'

function isAllowedMainSiteReferrer(value: string) {
  if (!value) return false
  return (
    value.startsWith('https://employee-management-9yicp.kinsta.app/') ||
    value.startsWith('http://localhost:3000/') ||
    value.startsWith('http://127.0.0.1:3000/') ||
    value.includes('ftiservice.net')
  )
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  // Security Check: Referer/Origin
  const referer = request.headers.get('referer') || ''
  const origin = request.headers.get('origin') || ''
  
  // Allow direct access for testing if no referer/origin is present
  const isDirectAccess = !referer && !origin
  const isAuthorized = isDirectAccess || isAllowedMainSiteReferrer(referer) || isAllowedMainSiteReferrer(origin)

  if (!isAuthorized) {
    return NextResponse.json(
      { error: 'Unauthorized', message: 'Access denied' },
      { status: 403 }
    )
  }

  return NextResponse.json({
    status: 'success',
    slug: slug,
    message: `You reached the destination for: ${slug}`,
    timestamp: new Date().toISOString(),
  })
}
