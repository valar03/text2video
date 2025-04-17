// ✅ File: MainComposition.tsx
import { AbsoluteFill } from 'remotion';
import { generateSlideTexts } from '../../../types/constants';
import { Rings } from './Rings';
import { NextLogo } from './NextLogo';
import SlideTransition from './SlideTransition';
import TextAnimation from './TextAnimation';
import CTAButton from './CTAButton';
import BackgroundElements from './BackgroundElements';
import { useEffect, useState } from 'react';
import { Sequence, Audio } from 'remotion';

const MainComposition = ({ frame, fps }: { frame: number; fps: number }) => {
    const searchParams = new URLSearchParams(window.location.search);
    const pathParts = window.location.pathname.split("/"); 
    const template = pathParts[3];  // "template1"
    
    const username = searchParams.get('username') || 'John Doe';
    const amount = searchParams.get('amount') || '150,000';
    const date = localStorage.getItem('date') || 'April 7th, 2025';
  const slideTexts = generateSlideTexts(username, amount, date);
  const transitionStart = 2 * fps;
  const transitionDuration = 1 * fps;
  const voiceoverStartFrame = transitionStart + transitionDuration;
  const slideFrames = 75;
  const totalSlidesDuration = slideTexts.length * slideFrames;

  const [audioReady, setAudioReady] = useState(false);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const triggerVoiceover = async () => {
      try {
        const res = await fetch('/api/generate-voiceover', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: username, amount, date, template }),
        });
        const data = await res.json();
        if (data.success) setAudioReady(true);
      } catch (err) {
        console.error('Voiceover fetch error:', err);
      }
    };
    triggerVoiceover();
  }, []);

  return (
    <AbsoluteFill className="bg-gradient-to-br from-blue-500 to-purple-600">
      {!play ? (
        <AbsoluteFill className="items-center justify-center">
          <button
            onClick={() => setPlay(true)}
            style={{
              padding: '16px 32px',
              fontSize: '20px',
              fontWeight: 'bold',
              backgroundColor: '#4f46e5',
              color: 'white',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Play Video
          </button>
        </AbsoluteFill>
      ) : (
        <>
          <Sequence from={0} durationInFrames={transitionStart + transitionDuration}>
            <AbsoluteFill className="justify-center items-center">
              <Rings />
            </AbsoluteFill>
            <AbsoluteFill className="justify-center items-center">
              <NextLogo />
            </AbsoluteFill>
          </Sequence>

          {audioReady && (
            <Sequence from={voiceoverStartFrame} durationInFrames={totalSlidesDuration}>
              <Audio src={`/voiceovers/voiceover_${template}_${username}.mp3`} volume={1} />
            </Sequence>
          )}

          {slideTexts.map((lines, slideIndex) => {
            const slideStart = voiceoverStartFrame + slideIndex * slideFrames;
            const isActive = frame >= slideStart && frame < slideStart + slideFrames + 5;
            const isLastSlide = slideIndex === slideTexts.length - 1;

            return (
              <Sequence key={slideIndex} from={slideStart} durationInFrames={slideFrames}>
                <SlideTransition slideIndex={slideIndex} template={template} isActive={isActive} isLastSlide={isLastSlide}>
                  <BackgroundElements slideIndex={slideIndex} />
                  <AbsoluteFill className="justify-center items-center">
                    <div className="flex flex-col gap-6 items-center">
                      {lines.map((line, lineIndex) => (
                        <TextAnimation key={lineIndex} index={lineIndex} textColor="white">
                          {line}
                        </TextAnimation>
                      ))}
                      {isLastSlide && (
                        <div style={{ marginTop: '40px' }}>
                          <CTAButton text="Learn More" url="https://google.com" />
                        </div>
                      )}
                    </div>
                  </AbsoluteFill>
                </SlideTransition>
              </Sequence>
            );
          })}
        </>
      )}
    </AbsoluteFill>
  );
};

export default MainComposition;