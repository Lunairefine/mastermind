import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    // 1. Dapatkan URL dasar (domain) saat ini agar bisa memanggil gambar di folder public
    const { searchParams, origin } = new URL(request.url);

    const score = searchParams.get('score') || '0';
    const time = searchParams.get('time') || '00:00';
    const username = searchParams.get('user') || 'PLAYER';

    // 2. Tentukan path ke logo asli Anda.
    // PASTIKAN file ini ada di folder public/media/images/ Anda.
    // Jika nama filenya beda, ubah bagian 'icon.png' ini.
    const logoUrl = `${origin}/media/images/icon.png`;

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
          {/* Kartu Abu-abu Gelap (Rounded) */}
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
            {/* Header Kiri: Logo + MASTERMIND */}
            <div style={{ position: 'absolute', top: 50, left: 50, display: 'flex', alignItems: 'center' }}>
              
              {/* --- PERUBAHAN DI SINI --- */}
              {/* Kita HAPUS div kotak warna-warni, ganti dengan tag <img> */}
              <img
                src={logoUrl}
                alt="Mastermind Logo"
                width="40"
                height="40"
                style={{ 
                  borderRadius: '8px', 
                  marginRight: '15px' 
                }}
              />
              {/* ------------------------- */}

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

            {/* Konten Tengah: Angka Skor Besar & Time */}
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
  } catch (e: any) {
    console.error(e);
    return new Response(`Failed to generate the image`, { status: 500 });
  }
}