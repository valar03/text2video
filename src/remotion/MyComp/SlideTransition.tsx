import { AbsoluteFill, useVideoConfig, useCurrentFrame } from 'remotion';
import VideoBackground from './VideoBackground';
import { backgroundVideos, videoOverlays } from '../../../types/constants';

const SlideTransition = ({ children, slideIndex, isActive, isLastSlide }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const transitionType = slideIndex % 5;

  const entryProgress = (frame < 20 ? frame : 20) / 20;
  let entryAnimation = {};

  switch (transitionType) {
    case 0:
      entryAnimation = { opacity: entryProgress, transform: `scale(${0.8 + entryProgress * 0.2})` };
      break;
    case 1:
      entryAnimation = { transform: `translateX(${(1 - entryProgress) * 100}%)` };
      break;
    case 2:
      entryAnimation = { clipPath: `inset(0 ${100 - entryProgress * 100}% 0 0)` };
      break;
    case 3:
      entryAnimation = { transform: `perspective(1000px) rotateY(${(1 - entryProgress) * 90}deg)` };
      break;
    default:
      entryAnimation = { opacity: entryProgress };
  }

  const videoSrc = backgroundVideos[slideIndex % backgroundVideos.length];
  const overlayColor = videoOverlays[slideIndex % videoOverlays.length];

  return (
    <AbsoluteFill style={entryAnimation}>
      <VideoBackground videoSrc={videoSrc} overlayColor={overlayColor} />
      <AbsoluteFill>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};

export default SlideTransition;
