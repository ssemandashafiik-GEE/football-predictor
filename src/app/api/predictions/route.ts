import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fixtureId = searchParams.get('fixture');
  if (!fixtureId) {
    return NextResponse.json({ error: 'fixture parameter required' }, { status: 400 });
  }

  // Your working model API
  const modelUrl = 'https://shafik256-football-predictor-api.hf.space';

  const body = {
    home_stats: [1.5, 0.8, 13, 4.5, 10, 5, 2, 0.1],
    away_stats: [1.2, 0.7, 11, 3.8, 9, 6, 2, 0.1]
  };

  try {
    const res = await fetch(`${modelUrl}/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error('Model API error');
    const data = await res.json();

    return NextResponse.json({
      response: [{
        fixture: { id: fixtureId },
        teams: {
          home: { name: 'Home Team' },
          away: { name: 'Away Team' }
        },
        predictions: {
          percent: {
            home: (data.home_win * 100).toFixed(0),
            draw: (data.draw * 100).toFixed(0),
            away: (data.away_win * 100).toFixed(0)
          }
        }
      }]
    });
  } catch (err) {
    return NextResponse.json({ error: 'Prediction failed' }, { status: 502 });
  }
}