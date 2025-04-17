// ✅ File: remotion/MyComp/Main.tsx
'use client';

import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import {MainComposition2} from './MainComposition2';
import { useSearchParams } from 'next/navigation';

const Main2 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const searchParams = useSearchParams();

  const username = searchParams.get('username');
  const amount = searchParams.get('amount');
  const date = searchParams.get('tenure');

  return (
    <AbsoluteFill>
      <MainComposition2
        frame={frame}
        fps={fps}
        username={username}
        amount={amount}
        date={date}
      />
    </AbsoluteFill>
  );
};

export default Main2;
