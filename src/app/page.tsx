'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [fixtureId, setFixtureId] = useState('');
  const [predictions, setPredictions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPredictions = async (id: string) => {
    setLoading(true);
    const res = await fetch(`/api/predictions?fixture=${id}`);
    const data = await res.json();
    setPredictions(data.response || []);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-green-800">
        Football Match Predictor
      </h1>
      <div className="max-w-md mx-auto mb-8">
        <input
          type="text"
          value={fixtureId}
          onChange={(e) => setFixtureId(e.target.value)}
          placeholder="Enter Fixture ID"
          className="w-full p-3 border rounded-lg shadow-sm"
        />
        <button
          onClick={() => fetchPredictions(fixtureId)}
          className="mt-2 w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700"
        >
          Get Predictions
        </button>
      </div>
      {loading && <p className="text-center">Loading...</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {predictions.map((p: any) => (
          <div key={p.fixture.id} className="bg-white rounded-xl shadow-md p-6">
            <h2 className="font-bold text-lg">
              {p.teams.home.name} vs {p.teams.away.name}
            </h2>
            <div className="mt-3 space-y-1 text-sm">
              <p>Home: {p.predictions.percent.home}%</p>
              <p>Draw: {p.predictions.percent.draw}%</p>
              <p>Away: {p.predictions.percent.away}%</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
