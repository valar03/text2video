'use client';

import { useParams, useSearchParams } from 'next/navigation';
// import dynamic from 'next/dynamic';

// Remotion Player (client-only)
import { Player } from '@remotion/player';
import Main from '@/remotion/MyComp/Main';

export default function TemplatePage() {
  // const { username } = useParams();
  const searchParams = useSearchParams();
  const  username = searchParams.get('username') || '';

  const amount = searchParams.get('amount') || '';
  const tenure = searchParams.get('date') || '';

  return (
    <div className="p-6">
      <h1 className="text-xl mb-4">Hi {username}, here’s your video preview!</h1>
      <Player
        component={Main}
        durationInFrames={450}
        fps={30}
        compositionWidth={1200}
        compositionHeight={700}
        controls
        autoPlay
        inputProps={{
          username,
          amount,
          date: tenure,
        }}
      />
    </div>
  );
}
