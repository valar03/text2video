'use client';

import {  useSearchParams } from 'next/navigation';
import { Player } from '@remotion/player';
import Main2 from '@/remotion/Template2/Main'; // Template2 component
import Main from '@/remotion/MyComp/Main';   // MyComp component
import { generateVoiceoverScript as script1 } from 'D:/git stuff/text2video/types/constants';
import { generateVoiceoverScript as script2 } from 'D:/git stuff/text2video/types/constants2';

export default function TemplatePage() {
  // const { username } = useParams();
  const searchParams = useSearchParams();
  const username = localStorage.getItem('username') || 'John Doe';
  const amount = localStorage.getItem('amount') || searchParams.get('amount') || '';
  const tenure = localStorage.getItem('tenure') || searchParams.get('tenure') || '';


  // Check the template stored in localStorage to decide which component to render
  const template = localStorage.getItem('selectedTemplate') || 'template1';

  // Choose the correct component based on the stored template value
  const SelectedComponent = template === 'template1' ? Main : Main2;
  const transcript = template === 'template1' ? script1(username, amount, tenure) : script2(username, amount, tenure) ;
  console.log("transcript", transcript);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="text-center p-6">
        <h1 className="text-xl mb-4">Hi {username}, here’s your video preview!</h1>
        
        {/* Video Player */}
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

        {/* Transcript Box */}
        <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-gray-100">
          <h2 className="text-lg font-semibold mb-2">Transcript:</h2>
          <p className="text-sm">{transcript}</p>
        </div>
      </div>
    </div>
  );
}
