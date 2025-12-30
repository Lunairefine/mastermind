import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams, origin } = new URL(request.url);
    const score = (searchParams.get('score') || '0').slice(0, 6);
    const time = (searchParams.get('time') || '00:00').slice(0, 10);
    const username = (searchParams.get('user') || 'PLAYER').slice(0, 12).toUpperCase();

    const logoUrl = `${origin}/media/icon.png`;

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#000000',
            padding: '40px', 
          }}
        >
          <div style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              height: '100%',
              backgroundColor: '#1a1a1a',
              borderRadius: '30px',
              border: '2px solid #333',
              padding: '40px',
              justifyContent: 'flex-start', 
              position: 'relative',
            }}
          >

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '60px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={logoUrl}
                  alt="Logo"
                  width="48"
                  height="48"
                  style={{ borderRadius: '8px', marginRight: '16px' }}
                />
                <span style={{ color: 'white', fontSize: 32, fontWeight: 900, fontFamily: 'sans-serif', letterSpacing: '2px' }}>
                  MASTERMIND
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#333', padding: '8px 20px', borderRadius: '12px' }}>
                <span style={{ color: '#ffffff', fontSize: 24, fontWeight: 700, fontFamily: 'sans-serif', textTransform: 'uppercase' }}>
                  @{username}
                </span>
              </div>
            </div>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              marginTop: 'auto', 
              marginBottom: 'auto' 
            }}>
              
              <span style={{ 
                color: '#888', 
                fontSize: 24, 
                letterSpacing: '4px', 
                marginBottom: '0px',
                fontFamily: 'sans-serif', 
                textTransform: 'uppercase' 
              }}>
                TOTAL SCORE
              </span>

              <span style={{ 
                color: 'white', 
                fontSize: 200, 
                fontWeight: 900, 
                lineHeight: 1,
                fontFamily: 'sans-serif',
                textShadow: '0 10px 40px rgba(0,0,0,0.6)',
                marginTop: '10px',
                marginBottom: '10px'
              }}>
                {score}
              </span>
              
              <span style={{ 
                color: '#00FF00', 
                fontSize: 48, 
                fontWeight: 700, 
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
        width: 1000,
        height: 630,
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(`Failed to generate image`, { status: 500 });
  }
}