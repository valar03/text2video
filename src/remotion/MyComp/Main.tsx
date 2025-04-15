import React, { useEffect, useRef, useState } from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Audio,
  Video,
} from "remotion";
import { loadFont, fontFamily } from "@remotion/google-fonts/Inter";
import { generateSlideTexts, videoOverlays } from "../../../types/constants";
import { Rings } from "./Rings";
import { NextLogo } from "./NextLogo";
// import gsap from "gsap";

const name = "John";
const amount = "150,000";
const date = "April 7th, 2025";

const slideTexts = generateSlideTexts(name, amount, date);

loadFont("normal", {
  subsets: ["latin"],
  weights: ["400", "700"],
});

// Background color themes for each slide (fallback if videos don't load)
const colorThemes = [
  { bg: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)", text: "#1a365d" },
  { bg: "linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)", text: "#22543d" },
  { bg: "linear-gradient(120deg, #ff9a9e 0%, #fad0c4 100%)", text: "#742a2a" },
  { bg: "linear-gradient(120deg, #a18cd1 0%, #fbc2eb 100%)", text: "#44337a" },
  { bg: "linear-gradient(120deg, #fccb90 0%, #d57eeb 100%)", text: "#553c9a" },
];

// Video Background Component
const VideoBackground = ({ videoSrc, overlayColor }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  
  return (
    <AbsoluteFill>
      {/* Video from public directory */}
      <Video 
        src={videoSrc} 
         
        startFrom={0}
        className="w-full h-full object-cover" 
      />
      {/* Semi-transparent overlay to improve text readability */}
      <AbsoluteFill style={{ backgroundColor: overlayColor }} />
    </AbsoluteFill>
  );
};

// PowerPoint style slide transition component
const SlideTransition = ({ children, slideIndex, isActive, isLastSlide  }) => {
  const containerRef = useRef(null);
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // Choose transition effect based on slideIndex
  const transitionType = slideIndex % 5;
  
  // Entry animations based on transition type
  let entryAnimation;
  let exitAnimation;
  
  const entryProgress = interpolate(
    frame, 
    [0, 20], 
    [0, 1], 
    { extrapolateRight: "clamp" }
  );
  
  
  // Different PowerPoint-style transitions
  switch (transitionType) {
    case 0: // Fade + Zoom
      entryAnimation = {
        opacity: entryProgress,
        transform: `scale(${interpolate(frame, [0, 20], [0.8, 1], { extrapolateRight: "clamp" })})`
      };
      break;
      
    case 1: // Slide from right
      entryAnimation = {
        transform: `translateX(${interpolate(frame, [0, 20], [100, 0], { extrapolateRight: "clamp" })}%)`
      };
      break;
      
    case 2: // Wipe effect
      entryAnimation = {
        clipPath: `inset(0 ${interpolate(frame, [0, 20], [100, 0], { extrapolateRight: "clamp" })}% 0 0)`
      };
      break;
      
    case 3: // Flip effect
      entryAnimation = {
        transform: `perspective(1000px) rotateY(${interpolate(frame, [0, 20], [90, 0], { extrapolateRight: "clamp" })}deg)`
      };
      break;
      
    case 4: // Blinds effect
      const blindsProgress = entryProgress;
      entryAnimation = {
        clipPath: `inset(${blindsProgress < 0.2 ? 0 : 0}% 0 ${blindsProgress < 0.2 ? 100 - blindsProgress * 500 : blindsProgress < 0.4 ? 0 : 0}% 0,
                   ${blindsProgress < 0.4 ? 0 : 0}% 0 ${blindsProgress < 0.4 ? 100 : blindsProgress < 0.6 ? 100 - (blindsProgress - 0.4) * 500 : 0}% 0,
                   ${blindsProgress < 0.6 ? 0 : 0}% 0 ${blindsProgress < 0.6 ? 100 : blindsProgress < 0.8 ? 100 - (blindsProgress - 0.6) * 500 : 0}% 0,
                   ${blindsProgress < 0.8 ? 0 : 0}% 0 ${blindsProgress < 0.8 ? 100 : 100 - (blindsProgress - 0.8) * 500}% 0)`
      };
      break;
      
    default:
      entryAnimation = { opacity: entryProgress };
  }
  
  const animationStyle = isActive
  ? frame < 20
    ? entryAnimation
    : !isLastSlide
    ? exitAnimation
    : {}
  : { opacity: 0 };
  
  // Get video source and overlay for this slide
  const videoSrc = backgroundVideos[slideIndex % backgroundVideos.length];
  const overlayColor = videoOverlays[slideIndex % videoOverlays.length];
  
  return (
    <AbsoluteFill
      ref={containerRef}
      style={{
        ...animationStyle,
      }}
    >
      {/* Video Background */}
      <VideoBackground 
        videoSrc={videoSrc} 
        overlayColor={overlayColor} 
      />
      
      {/* Slide Content */}
      <AbsoluteFill>
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Enhanced Text Animation Component 
const TextAnimation = ({ children, index, textColor }) => {
  const textRef = useRef(null);
  const frame = useCurrentFrame();
  
  const delay = index * 5;
  const startFrame = delay;
  const visibleFrame = startFrame + 10;
  const endStartFrame = 45 + delay;
  const endFrame = endStartFrame + 10;
  
  // Different animation types for each text line
  const animationType = index % 4;
  
  let animationStyle = {};
  
  // Apply different animations based on type
  switch (animationType) {
    case 0: // Fade up
      animationStyle = {
        opacity: interpolate(
          frame,
          [startFrame, visibleFrame],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        ),
        transform: `translateY(${interpolate(
          frame,
          [startFrame, visibleFrame],
          [50, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        )}px)`
      };
      break;
      
    case 1: // Zoom in with bounce
      const scale = interpolate(
        frame,
        [startFrame, visibleFrame, visibleFrame + 5],
        [0.5, 1.1, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      );
      animationStyle = {
        opacity: interpolate(
          frame,
          [startFrame, visibleFrame],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        ),
        transform: `scale(${scale})`
      };
      break;
      
    case 2: // Slide in from side
      animationStyle = {
        opacity: interpolate(
          frame,
          [startFrame, visibleFrame],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        ),
        transform: `translateX(${interpolate(
          frame,
          [startFrame, visibleFrame],
          [-100, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        )}px)`
      };
      break;
      
    case 3: // Character by character reveal
      const characters = children.split('');
      return (
        <h1
          className="text-[50px] font-bold text-center flex flex-wrap justify-center"
          style={{ 
            fontFamily,
            color: textColor || "white", // Default to white for better contrast on video backgrounds
            textShadow: "0px 2px 4px rgba(0,0,0,0.6)" // Add text shadow for better readability
          }}
        >
          {characters.map((char, charIndex) => {
            const charDelay = index * 3 + charIndex * 1;
            const charStart = charDelay;
            const charVisible = charStart + 5;
            const charEndStart = endStartFrame;
            const charEnd = endFrame;

            return (
              <span
                key={charIndex}
                style={{
                  display: 'inline-block',
                  opacity: interpolate(
                    frame,
                    [charStart, charVisible, charEndStart, charEnd],
                    [0, 1, 1, 0],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                  ),
                  transform: `translateY(${interpolate(
                    frame,
                    [charStart, charVisible, charEndStart, charEnd],
                    [20, 0, 0, -20],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                  )}px)`,
                  margin: '0 1px'
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            );
          })}
        </h1>
      );
  }
  
  return (
    <h1
      ref={textRef}
      className="text-[50px] font-bold text-center"
      style={{ 
        fontFamily,
        color: textColor || "white", // Default to white for better contrast
        textShadow: "0px 2px 4px rgba(0,0,0,0.6)", // Add text shadow for better readability
        ...animationStyle
      }}
    >
      {children}
    </h1>
  );
};

// Call to Action Button Component
const CTAButton = ({ text = "Learn More", url = "https://google.com" }) => {
  const buttonRef = useRef(null);
  const frame = useCurrentFrame();
  
  // Button animation timings
  const startFrame = 25; // Appear after the text lines
  const visibleFrame = startFrame + 10;
  const endStartFrame = 55;
  const endFrame = endStartFrame + 10;
  
  // Button pulsing effect
  const pulseScale = interpolate(
    frame % 30,
    [0, 15, 30],
    [1, 1.05, 1],
    { extrapolateRight: "clamp" }
  );
  
  // Button glow effect
  const glowIntensity = interpolate(
    frame % 60, 
    [0, 30, 60], 
    [0, 8, 0],
    { extrapolateRight: "clamp" }
  );
  
  // Button entry/exit animation
  const opacity = interpolate(
    frame,
    [startFrame, visibleFrame],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  
  const translateY = interpolate(
    frame,
    [startFrame, visibleFrame],
    [50, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  
  // Interactive link - in Remotion preview, this works as a clickable link
  return (
    <a
      ref={buttonRef}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        opacity,
        transform: `translateY(${translateY}px) scale(${pulseScale})`,
        padding: '12px 24px',
        backgroundColor: '#4285f4',
        color: 'white',
        fontFamily,
        fontSize: '24px',
        fontWeight: 'bold',
        borderRadius: '8px',
        cursor: 'pointer',
        textDecoration: 'none',
        boxShadow: `0 0 ${glowIntensity}px #4285f4`,
        transition: 'all 0.3s ease',
        border: '2px solid rgba(255, 255, 255, 0.7)',
        textShadow: '0px 1px 2px rgba(0,0,0,0.3)',
      }}
    >
      {text}
    </a>
  );
};

// Enhanced Logo Animation with colorful effects
const ColorfulLogoAnimation = () => {
  const logoRef = useRef(null);
  const frame = useCurrentFrame();
  
  // Create colorful shine effect
  const shinePosition = interpolate(
    frame % 120,
    [0, 60, 120],
    [-100, 0, 100],
    { extrapolateRight: "clamp" }
  );
  
  const scale = interpolate(
    frame,
    [0, 20, 100, 120],
    [0.7, 1, 1, 1.2],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  
  const rotation = interpolate(
    frame,
    [0, 30, 120],
    [15, 0, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  
  const opacity = interpolate(
    frame,
    [0, 20, 100, 120],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div 
      ref={logoRef}
      style={{
        transform: `scale(${scale}) rotate(${rotation}deg)`,
        opacity,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '-30%',
          left: `${shinePosition}%`,
          width: '50%',
          height: '200%',
          background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)',
          transform: 'rotate(45deg)',
          pointerEvents: 'none',
          zIndex: 10
        }}
      />
      <NextLogo />
    </div>
  );
};

// Enhanced Rings with colorful gradient
const ColorfulRings = () => {
  const ringsRef = useRef(null);
  const frame = useCurrentFrame();
  
  const scale = interpolate(
    frame,
    [0, 30, 100, 120],
    [0.5, 1, 1, 1.5],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  
  const opacity = interpolate(
    frame,
    [0, 30, 100, 120],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  
  const rotation = interpolate(
    frame,
    [0, 120],
    [0, 30],
    { extrapolateRight: "clamp" }
  );

  return (
    <div 
      ref={ringsRef}
      style={{
        transform: `scale(${scale}) rotate(${rotation}deg)`,
        opacity,
        filter: 'hue-rotate(45deg) saturate(1.5)'
      }}
    >
      <Rings />
    </div>
  );
};

// Decorative background elements
const BackgroundElements = ({ slideIndex }) => {
  const frame = useCurrentFrame();
  
  // Create random floating shapes based on slideIndex
  const shapes = Array(5).fill().map((_, i) => {
    const size = 20 + (i * 15);
    const xPos = 10 + (i * 20);
    const yPos = 10 + ((i + slideIndex) % 5) * 20;
    const speed = 0.2 + (i * 0.1);
    
    const x = interpolate(
      frame % 200,
      [0, 200],
      [xPos, xPos + 20],
      { extrapolateRight: "clamp" }
    );
    
    const y = interpolate(
      frame % 150,
      [0, 150], 
      [yPos, yPos - 15],
      { extrapolateRight: "clamp" }
    );
    
    const rotate = interpolate(
      frame,
      [0, 200],
      [0, 360 * speed],
      { extrapolateRight: "clamp" }
    );
    
    let shape;
    switch ((i + slideIndex) % 4) {
      case 0: // Circle
        shape = <div style={{
          width: size,
          height: size,
          borderRadius: '50%',
          background: `rgba(255, 255, 255, 0.2)`,
        }} />;
        break;
      case 1: // Square
        shape = <div style={{
          width: size,
          height: size,
          background: `rgba(255, 255, 255, 0.2)`,
        }} />;
        break;
      case 2: // Triangle
        shape = <div style={{
          width: 0,
          height: 0,
          borderLeft: `${size/2}px solid transparent`,
          borderRight: `${size/2}px solid transparent`,
          borderBottom: `${size}px solid rgba(255, 255, 255, 0.2)`,
        }} />;
        break;
      case 3: // Diamond
        shape = <div style={{
          width: size,
          height: size,
          background: `rgba(255, 255, 255, 0.2)`,
          transform: 'rotate(45deg)',
        }} />;
        break;
    }
    
    return (
      <div 
        key={i}
        style={{
          position: 'absolute',
          left: `${x}%`,
          top: `${y}%`,
          transform: `rotate(${rotate}deg)`,
          opacity: 0.7
        }}
      >
        {shape}
      </div>
    );
  });
  
  return <>{shapes}</>;
};
export const Main = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const transitionStart = 2 * fps;
  const transitionDuration = 1 * fps;
  const voiceoverStartFrame = transitionStart + transitionDuration;
  const slideFrames = 75;
  const totalSlidesDuration = slideTexts.length * slideFrames;

  const [backgroundVideos, setVideoPaths] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("/api/video-fetch");
        const data = await res.json();
        console.log("Data:",data);
        setVideoPaths(data); // array of `/videos/xyz.mp4`
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch videos", err);
      }
    };

    fetchVideos();
  }, []);

  console.log("videos-final:", backgroundVideos);

  const [audioReady, setAudioReady] = useState(false);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const triggerVoiceover = async () => {
      try {
        const res = await fetch('/api/generate-voiceover', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, amount, date }),
        });
        const data = await res.json();
        if (data.success) {
          setAudioReady(true);
        } else {
          console.error('Voiceover error:', data.error);
        }
      } catch (err) {
        console.error('Fetch error:', err);
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
            <Sequence
              from={voiceoverStartFrame}
              durationInFrames={totalSlidesDuration}
            >
              <Audio
                src={`/voiceovers/voiceover_${name}.mp3`}
                volume={1}
              />
            </Sequence>
          )}

          {slideTexts.map((lines, slideIndex) => {
            const slideStart = voiceoverStartFrame + slideIndex * slideFrames;
            const isActive = frame >= slideStart && frame < slideStart + slideFrames + 5;
            const isLastSlide = slideIndex === slideTexts.length - 1;

            return (
              <Sequence
                key={slideIndex}
                from={slideStart}
                durationInFrames={slideFrames}
              >
                <SlideTransition
                  slideIndex={slideIndex}
                  isActive={isActive}
                  isLastSlide={isLastSlide}
                  backgroundVideos={backgroundVideos}
                >
                  <BackgroundElements slideIndex={slideIndex} />
                  <AbsoluteFill className="justify-center items-center">
                    <div className="flex flex-col gap-6 items-center">
                      {lines.map((line, lineIndex) => (
                        <TextAnimation
                          key={lineIndex}
                          index={lineIndex}
                          textColor="white"
                        >
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