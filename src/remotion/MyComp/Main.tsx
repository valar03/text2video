// ✅ File: remotion/MyComp/Main.tsx
'use client';

import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import MainComposition from './MainComposition';
import { useSearchParams } from 'next/navigation';

const Main = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const searchParams = useSearchParams();

  const username = searchParams.get('username');
  const amount = searchParams.get('amount');
  const date = searchParams.get('date');

  return (
    <AbsoluteFill>
      <MainComposition
        frame={frame}
        fps={fps}
        username={username}
        amount={amount}
        date={date}
      />
    </AbsoluteFill>
  );
};

export default Main;
