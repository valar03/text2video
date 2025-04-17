import React, { useEffect, useState } from "react";
import { AbsoluteFill, Sequence, useVideoConfig, Audio } from "remotion";
import { generateSlideTexts } from "../../../types/constants2";
import { Rings } from "../MyComp/Rings";
import { NextLogo } from "../MyComp/NextLogo";
import SlideTransitionTwo from "./SlideTransitionTwo";
import { TextAnimationTwo } from "./TextAnimationTwo";
import CTAButton from "../MyComp/CTAButton";

import { useSearchParams } from "next/navigation";

export const MainComposition2: React.FC = () => {
  const searchParams = useSearchParams();

  const name = searchParams.get('username') || 'John Doe';
  const amount = searchParams.get('amount') || '150,000';
  const date = localStorage.getItem('tenure') || 'April 7th, 2025';
  const slideTexts = generateSlideTexts(name, amount, date);
  const template = "template2"; // Hardcoded template name
  const { fps } = useVideoConfig();
  const transitionStart = 2 * fps;
  const transitionDuration = 1 * fps;
  const voiceoverStartFrame = transitionStart + transitionDuration;
  const slideFrames = 90; // Longer duration for each slide
  const totalSlidesDuration = slideTexts.length * slideFrames;

  const [audioReady, setAudioReady] = useState(false);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const triggerVoiceover = async () => {
      try {
        console.log("Request body:", { name, amount, date, template });
        // Make sure to log the request body for debugging
        const res = await fetch("/api/generate-voiceover", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",

          },
          body: JSON.stringify({ name, amount, date, template }),
        });
        const data = await res.json();
        if (data.success) {
          setAudioReady(true);
        } else {
          console.error("Voiceover error:", data.error);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    triggerVoiceover();
  }, []);

  return (
    <AbsoluteFill className="bg-gradient-to-br from-green-500 to-blue-600">
      {!play ? (
        <AbsoluteFill className="items-center justify-center">
          <button
            onClick={() => setPlay(true)}
            style={{
              padding: "16px 32px",
              fontSize: "20px",
              fontWeight: "bold",
              backgroundColor: "#34d399",
              color: "white",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
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
              <Audio src={`/voiceovers/voiceover_${template}_${name}.mp3`} volume={1} />
            </Sequence>
          )}

          {slideTexts.map((lines, slideIndex) => {
            const slideStart = voiceoverStartFrame + slideIndex * slideFrames;
            const isLastSlide = slideIndex === slideTexts.length - 1;

            return (
              <Sequence
                key={slideIndex}
                from={slideStart}
                durationInFrames={slideFrames}
              >
                <SlideTransitionTwo slideIndex={slideIndex}>
                  <AbsoluteFill className="justify-center items-center">
                    <div className="flex flex-col gap-6 items-center">
                      {lines.map((line, lineIndex) => (
                        <TextAnimationTwo
                          key={lineIndex}
                          index={lineIndex}
                          textColor="white"
                        >
                          {line}
                        </TextAnimationTwo>
                      ))}

                      {isLastSlide && (
                        <div style={{ marginTop: "40px" }}>
                          <CTAButton text="Get Started" url="https://example.com" />
                        </div>
                      )}
                    </div>
                  </AbsoluteFill>
                </SlideTransitionTwo>
              </Sequence>
            );
          })}
        </>
      )}
    </AbsoluteFill>
  );
};