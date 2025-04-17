import { AbsoluteFill, useVideoConfig, useCurrentFrame } from 'remotion';
import VideoBackground from '../MyComp/VideoBackground';
import { videoOverlays } from '../../../types/constants2';

interface SlideProps {
  children: React.ReactNode;
  slideIndex: number;
  isActive: boolean;
  isLastSlide: boolean;
  template: string;
}

const SlideTransitionTwo = ({ children, slideIndex, isActive, isLastSlide, template }: SlideProps) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const transitionType = slideIndex % 6; // Increased to 6 for more transition types
  
  const entryProgress = (frame < 20 ? frame : 20) / 20; // Adjust the entry progress
  
  let entryAnimation: React.CSSProperties = {};

  // New animation effects based on transition type
  switch (transitionType) {
    case 0: // Fade-in and Scale-up
      entryAnimation = {
        opacity: entryProgress,
        transform: `scale(${0.7 + entryProgress * 0.3})`,
      };
      break;
    case 1: // Slide-in from Right
      entryAnimation = {
        transform: `translateX(${(1 - entryProgress) * 100}%)`,
        opacity: entryProgress,
      };
      break;
    case 2: // Wipe-in from Top
      entryAnimation = {
        clipPath: `inset(0 ${100 - entryProgress * 100}% 0 0)`,
        opacity: entryProgress,
      };
      break;
    case 3: // Flip effect
      entryAnimation = {
        transform: `perspective(1000px) rotateY(${(1 - entryProgress) * 90}deg)`,
        opacity: entryProgress,
      };
      break;
    case 4: // Zoom effect (zoom-in from 0.5 to 1)
      entryAnimation = {
        transform: `scale(${0.5 + entryProgress * 0.5})`,
        opacity: entryProgress,
      };
      break;
    case 5: // Bounce (slightly exaggerated scaling)
      entryAnimation = {
        opacity: entryProgress,
        transform: `scale(${1 + Math.sin(entryProgress * Math.PI) * 0.1})`,
      };
      break;
    default:
      entryAnimation = { opacity: entryProgress };
  }

  // Fallback for background videos if not available in localStorage
  const fallbackVideos = [
    "/videos/View_from_inside_a_furnished_home_looking_o.mp4",
    "/videos/View_from_inside_a_furnished_home_looking_o.mp4",
    "/videos/Loan_Pre_Approval.mp4",
  ];
  
  // Get video names from localStorage
  const raw = localStorage.getItem(`template-${template}-videos`);
  const backgroundList = raw ? JSON.parse(raw) : fallbackVideos;

  const videoSrc = backgroundList[slideIndex % backgroundList.length]; // Get video for the current slide
  const overlayColor = videoOverlays[slideIndex % videoOverlays.length]; // Set video overlay color

  return (
    <AbsoluteFill style={entryAnimation}>
      <VideoBackground videoSrc={videoSrc} overlayColor={overlayColor} />
      <AbsoluteFill>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};

export default SlideTransitionTwo;
