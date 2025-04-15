import { useCurrentFrame, interpolate } from 'remotion';
import { fontFamily } from '@remotion/google-fonts/Inter';

const TextAnimation = ({ children, index, textColor = 'white' }) => {
  const frame = useCurrentFrame();
  const delay = index * 5;
  const start = delay;
  const end = start + 10;

  return (
    <h1
      className="text-[50px] font-bold text-center"
      style={{
        fontFamily,
        color: textColor,
        opacity: interpolate(frame, [start, end], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        }),
        transform: `translateY(${interpolate(frame, [start, end], [50, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })}px)`,
      }}
    >
      {children}
    </h1>
  );
};

export default TextAnimation;
