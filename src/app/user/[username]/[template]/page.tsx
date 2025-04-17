'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { Player } from '@remotion/player';
import Main2 from '@/remotion/Template2/Main'; // Template2 component
import Main from '@/remotion/MyComp/Main';   // MyComp component

export default function TemplatePage() {
  const { username } = useParams();
  const searchParams = useSearchParams();

  const amount = searchParams.get('amount') || '';
  const tenure = searchParams.get('tenure') || '';

  // Check the template stored in localStorage to decide which component to render
  const template = localStorage.getItem('selectedTemplate') || 'template1';

  // Choose the correct component based on the stored template value
  const SelectedComponent = template === 'template1' ? Main : Main2;

  return (
    <div className="p-6">
      <h1 className="text-xl mb-4">Hi {username}, here’s your video preview!</h1>
      <Player
        component={SelectedComponent}
        durationInFrames={450}
        fps={30}
        compositionWidth={1200}
        compositionHeight={700}
        controls
        autoPlay
        inputProps={{
          username,
          amount,
          tenure: tenure,
        }}
      />
    </div>
  );
}
