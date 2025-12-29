import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams, origin } = new URL(request.url);

    // Safety: Potong teks jika terlalu panjang agar tidak merusak gambar
    const score = (searchParams.get('score') || '0').slice(0, 6); // Max 6 digit score
    const time = (searchParams.get('time') || '00:00').slice(0, 10);
    const username = (searchParams.get('user') || 'PLAYER').slice(0, 12).toUpperCase(); // Max 12 char username

    // Pastikan path gambar logo benar
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
            // Gunakan padding langsung di container utama
            padding: '40px', 
          }}
        >
          {/* Inner Card dengan Border */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              height: '100%',
              backgroundColor: '#1a1a1a',
              borderRadius: '30px',
              border: '2px solid #333', // Sedikit pertebal border
              padding: '50px', // Internal padding agar konten tidak mepet border
              justifyContent: 'space-between', // PENTING: Pisahkan Header dan Content
            }}
          >
            {/* --- HEADER ROW (Flexbox, bukan Absolute) --- */}
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              
              {/* Kiri: Logo & Title */}
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

              {/* Kanan: Username */}
              <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#333', padding: '10px 20px', borderRadius: '12px' }}>
                <span style={{ color: '#ffffff', fontSize: 24, fontWeight: 700, fontFamily: 'sans-serif', textTransform: 'uppercase' }}>
                  @{username}
                </span>
              </div>
            </div>

            {/* --- CENTER CONTENT (Score & Time) --- */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
              
              {/* Label Score Kecil */}
              <span style={{ color: '#888', fontSize: 24, letterSpacing: '4px', marginBottom: '10px', fontFamily: 'sans-serif', textTransform: 'uppercase' }}>
                TOTAL SCORE
              </span>

              {/* Angka Score Besar */}
              <span style={{ 
                color: 'white', 
                fontSize: 180, 
                fontWeight: 900, 
                lineHeight: 1,
                fontFamily: 'sans-serif',
                textShadow: '0 10px 30px rgba(0,0,0,0.5)',
                marginBottom: '20px'
              }}>
                {score}
              </span>
              
              {/* Waktu */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: 'rgba(0, 255, 0, 0.1)', padding: '10px 30px', borderRadius: '50px' }}>
                <span style={{ color: '#00FF00', fontSize: 40, fontWeight: 700, fontFamily: 'monospace' }}>
                  {time}
                </span>
              </div>
            </div>

            {/* --- FOOTER (Opsional, Branding) --- */}
            <div style={{ display: 'flex', justifyContent: 'center', opacity: 0.4 }}>
               <span style={{ color: 'white', fontSize: 16, letterSpacing: '2px', fontFamily: 'sans-serif' }}>
                 PLAY ON WARPCAST
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
    console.error(error);
    return new Response(`Failed to generate image`, { status: 500 });
  }
}