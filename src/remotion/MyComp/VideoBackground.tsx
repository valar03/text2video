// ✅ File: VideoBackground.tsx
import { AbsoluteFill, Video, useVideoConfig, useCurrentFrame } from 'remotion';

const VideoBackground = ({ videoSrc, overlayColor }: { videoSrc: string; overlayColor: string }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <Video
        src={videoSrc}
        startFrom={0}
        className="w-full h-full object-cover"
      />
      <AbsoluteFill style={{ backgroundColor: overlayColor }} />
    </AbsoluteFill>
  );
};

export default VideoBackground;
