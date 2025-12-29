import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Default values jika parameter kosong
    const score = searchParams.get('score') || '0';
    const time = searchParams.get('time') || '00:00';
    const username = searchParams.get('user') || 'PLAYER';

    return new ImageResponse(
      (
        // Container Utama (Hitam Pekat)
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
          {/* Kartu Abu-abu (Rounded) */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              height: '100%',
              backgroundColor: '#1a1a1a', // Warna kartu sesuai desain
              borderRadius: '30px',
              border: '1px solid #333',
              position: 'relative',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* Header Kiri: Logo Kotak + Tulisan MASTERMIND */}
            <div style={{ position: 'absolute', top: 50, left: 50, display: 'flex', alignItems: 'center' }}>
              {/* Logo Grid 2x2 Warna */}
              <div style={{ display: 'flex', flexWrap: 'wrap', width: '40px', height: '40px', borderRadius: '8px', overflow: 'hidden', marginRight: '15px' }}>
                 <div style={{ width: '20px', height: '20px', backgroundColor: '#FF0000' }} />
                 <div style={{ width: '20px', height: '20px', backgroundColor: '#FFFF00' }} />
                 <div style={{ width: '20px', height: '20px', backgroundColor: '#00FF00' }} />
                 <div style={{ width: '20px', height: '20px', backgroundColor: '#0000FF' }} />
              </div>
              <span style={{ color: 'white', fontSize: 28, fontWeight: 900, fontFamily: 'sans-serif', letterSpacing: '1px' }}>
                MASTERMIND
              </span>
            </div>

            {/* Header Kanan: Username */}
            <div style={{ position: 'absolute', top: 50, right: 50, display: 'flex' }}>
              <span style={{ color: '#ffffff', fontSize: 24, fontWeight: 700, fontFamily: 'sans-serif', textTransform: 'uppercase' }}>
                @{username}
              </span>
            </div>

            {/* Konten Tengah: Angka Skor Besar */}
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
              
              {/* Waktu Hijau di Bawah */}
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
  } catch (e: any) {
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}