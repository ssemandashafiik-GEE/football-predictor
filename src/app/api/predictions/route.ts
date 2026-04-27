import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fixtureId = searchParams.get('fixture');
  if (!fixtureId) {
    return NextResponse.json({ error: 'fixture parameter required' }, { status: 400 });
  }

  // Temporary mock prediction – real model will be plugged in later
  const mockPrediction = {
    response: [{
      fixture: { id: fixtureId },
      teams: {
        home: { name: "Home Team" },
        away: { name: "Away Team" }
      },
      predictions: {
        percent: {
          home: "45",
          draw: "25",
          away: "30"
        }
      }
    }]
  };

  return NextResponse.json(mockPrediction);
}
