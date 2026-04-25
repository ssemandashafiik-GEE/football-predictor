import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fixtureId = searchParams.get('fixture');

  if (!fixtureId) {
    return NextResponse.json({ error: 'fixture parameter required' }, { status: 400 });
  }

  const res = await fetch(
    `https://v3.football.api-sports.io/predictions?fixture=${fixtureId}`,
    {
      headers: {
        'x-apisports-key': process.env.API_FOOTBALL_KEY!,
      },
      next: { revalidate: 3600 }, // ISR cache for 1 hour
    }
  );

  const data = await res.json();
  return NextResponse.json(data);
}
