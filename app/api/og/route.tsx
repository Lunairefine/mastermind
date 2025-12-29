import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams, origin } = new URL(request.url);

    const score = (searchParams.get('score') || '0').slice(0, 5);
    const time = (searchParams.get('time') || '00:00').slice(0, 10);
    const username = (searchParams.get('user') || 'PLAYER').slice(0, 15).toUpperCase();

    const logoUrl = `${origin}/media/icon.png`;

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000000',
            padding: '40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              height: '100%',
              backgroundColor: '#1a1a1a', 
              borderRadius: '30px',
              border: '1px solid #333',
              position: 'relative',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div style={{ position: 'absolute', top: 50, left: 50, display: 'flex', alignItems: 'center' }}>
              <img
                src={logoUrl}
                alt="Logo"
                width="40"
                height="40"
                style={{ 
                  borderRadius: '8px', 
                  marginRight: '15px' 
                }}
              />
              <span style={{ color: 'white', fontSize: 28, fontWeight: 900, fontFamily: 'sans-serif', letterSpacing: '1px' }}>
                MASTERMIND
              </span>
            </div>

            <div style={{ position: 'absolute', top: 50, right: 50, display: 'flex' }}>
              <span style={{ color: '#ffffff', fontSize: 24, fontWeight: 700, fontFamily: 'sans-serif', textTransform: 'uppercase' }}>
                @{username}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
              <span style={{ 
                color: 'white', 
                fontSize: 180, 
                fontWeight: 900, 
                lineHeight: 1,
                fontFamily: 'sans-serif',
                textShadow: '0 4px 20px rgba(0,0,0,0.5)'
              }}>
                {score}
              </span>
              
              <span style={{ 
                color: '#00FF00', 
                fontSize: 50, 
                fontWeight: 700,
                marginTop: '10px',
                fontFamily: 'monospace',
                letterSpacing: '2px'
              }}>
                {time}
              </span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    return new Response(`Failed to generate image`, { status: 500 });
  }
}