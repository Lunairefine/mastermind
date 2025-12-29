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
        <div tw="flex flex-col w-full h-full bg-black p-10">
          <div tw="flex flex-col w-full h-full bg-[#1a1a1a] rounded-[30px] border-2 border-[#333333] p-10 relative">
            <div tw="flex justify-between items-center w-full h-16">
              <div tw="flex items-center">
                <img
                  src={logoUrl}
                  alt="Logo"
                  width="48"
                  height="48"
                  style={{ borderRadius: '8px' }} 
                />
                <span tw="text-white text-4xl font-black tracking-widest ml-4">
                  MASTERMIND
                </span>
              </div>

              <div tw="flex items-center bg-[#333333] px-5 py-2 rounded-xl">
                <span tw="text-white text-2xl font-bold uppercase">
                  @{username}
                </span>
              </div>
            </div>

            <div tw="flex flex-col items-center justify-center my-auto">
              
              <span tw="text-[#888888] text-2xl tracking-[0.25em] font-sans uppercase m-0">
                TOTAL SCORE
              </span>

              <span tw="text-white text-[200px] font-black leading-none mt-2 mb-2 shadow-2xl">
                {score}
              </span>
              
              <span tw="text-[#00FF00] text-5xl font-bold font-mono tracking-widest">
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
    return new Response(`Failed to generate image`, { status: 500 });
  }
}