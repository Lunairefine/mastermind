import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams, origin } = new URL(request.url);

    // Safety: Slice input agar tidak merusak layout
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
          {/* Inner Card */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              height: '100%',
              backgroundColor: '#1a1a1a',
              borderRadius: '30px',
              border: '2px solid #333',
              padding: '40px',
              // Ubah ke flex-start agar kita bisa kontrol posisi konten tengah lebih bebas
              justifyContent: 'flex-start', 
              position: 'relative',
            }}
          >
            {/* --- HEADER ROW --- */}
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '60px' }}>
              
              {/* Logo & Title */}
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

              {/* Username Badge */}
              <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#333', padding: '8px 20px', borderRadius: '12px' }}>
                <span style={{ color: '#ffffff', fontSize: 24, fontWeight: 700, fontFamily: 'sans-serif', textTransform: 'uppercase' }}>
                  @{username}
                </span>
              </div>
            </div>

            {/* --- CENTER CONTENT (Dibuat Lebih Rapat) --- */}
            {/* marginTop auto & marginBottom auto akan membuatnya berada persis di tengah sisa ruang */}
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              marginTop: 'auto', 
              marginBottom: 'auto' 
            }}>
              
              {/* Label Score */}
              <span style={{ 
                color: '#888', 
                fontSize: 24, 
                letterSpacing: '4px', 
                marginBottom: '0px', // Hapus jarak bawah agar nempel ke angka
                fontFamily: 'sans-serif', 
                textTransform: 'uppercase' 
              }}>
                TOTAL SCORE
              </span>

              {/* Angka Score Besar */}
              <span style={{ 
                color: 'white', 
                fontSize: 200, 
                fontWeight: 900, 
                lineHeight: 1, // Line height 1 agar tidak memakan ruang vertikal kosong
                fontFamily: 'sans-serif',
                textShadow: '0 10px 40px rgba(0,0,0,0.6)',
                marginTop: '10px',  // Jarak minimal dari label
                marginBottom: '10px' // Jarak minimal ke waktu
              }}>
                {score}
              </span>
              
              {/* Waktu (Tanpa Background) */}
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

            {/* Footer dihapus total */}

          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(`Failed to generate image`, { status: 500 });
  }
}