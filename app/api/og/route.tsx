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
        <div className="flex h-full w-full flex-col bg-black p-10">
          <div className="relative flex h-full w-full flex-col justify-start rounded-[30px] border-2 border-[#333] bg-[#1a1a1a] p-10">
            <div className="flex h-[60px] w-full flex-row items-center justify-between">
              <div className="flex items-center">
                <img
                  src={logoUrl}
                  alt="Logo"
                  width="48"
                  height="48"
                  className="mr-4 rounded-lg"
                />
                <span className="text-[32px] font-black tracking-widest text-white">
                  MASTERMIND
                </span>
              </div>
              <div className="flex items-center rounded-xl bg-[#333] px-5 py-2">
                <span className="text-2xl font-bold uppercase text-white">
                  @{username}
                </span>
              </div>
            </div>
            <div className="mb-auto mt-auto flex flex-col items-center justify-center">
              <span className="mb-0 text-2xl uppercase tracking-[4px] text-[#888]">
                TOTAL SCORE
              </span>
              <span 
                className="my-2 text-[200px] font-black leading-none text-white"
                style={{ textShadow: '0 10px 40px rgba(0,0,0,0.6)' }}
              >
                {score}
              </span>
              
              <span className="font-mono text-5xl font-bold tracking-widest text-[#00FF00]">
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