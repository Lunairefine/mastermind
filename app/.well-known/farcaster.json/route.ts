import { NextResponse } from 'next/server';

export async function GET() {
  const appUrl = "https://pre-mastermind.vercel.app";

  const manifest = {
  "miniapp": {
    "name": "Preview Mastermind",
    "version": "1",
    "iconUrl": "https://pre-mastermind.vercel.app/media/icon.png",
    "homeUrl": "https://pre-mastermind.vercel.app/",
    "buttonTitle": "Play Logic Game",
    "splashImageUrl": "https://pre-mastermind.vercel.app/media/icon.png",
    "splashBackgroundColor": "#000000",
    "subtitle": "Play Logic Color Game",
    "description": "A simple yet challenging color puzzle game that tests logic, pattern recognition, and strategic thinking.",
    "primaryCategory": "games",
    "tags": ["games", "puzzle", "logic"],
    "noindex": false,
    "tagline": "Play game",
    "ogTitle": "Mastermind Baseapp",
    "heroImageUrl": "https://pre-mastermind.vercel.app/media/icon.png"
  },
  "accountAssociation": {
    "header": "eyJmaWQiOjU0ODczNSwidHlwZSI6ImF1dGgiLCJrZXkiOiIweDk1MDU2QUM2QUY2YjMzNjg2MTY2MkQ4N0YyNzRBODgyNzEzZmUxNkUifQ",
    "payload": "eyJkb21haW4iOiJwcmUtbWFzdGVybWluZC52ZXJjZWwuYXBwIn0",
    "signature": "jST6hPTlb961e0gpyiyLkQnszCAlQa3Xnb40WLNk3z8KWn7oa67xd5nCgk6XyubyzqlX0snf72c0Cnh9DCCc5xw="
  },
    "BaseBuilder": {
        "ownerAddress": "0x66D89085a083d18a5F0FbdDc4AC2DBe57D3B8031"
    }
  };

  return NextResponse.json(manifest, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Cache-Control': 'public, max-age=60',
    },
  });
}