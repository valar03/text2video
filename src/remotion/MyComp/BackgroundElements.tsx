import { useCurrentFrame, interpolate } from 'remotion';

const BackgroundElements = ({ slideIndex }) => {
  const frame = useCurrentFrame();
  const shapes = Array(5).fill(null).map((_, i) => {
    const size = 30 + i * 10;
    const x = interpolate(frame, [0, 200], [10 + i * 20, 30 + i * 20]);
    const y = interpolate(frame, [0, 150], [10 + ((i + slideIndex) % 5) * 20, 5]);
    return (
      <div
        key={i}
        style={{
          position: 'absolute',
          left: `${x}%`,
          top: `${y}%`,
          width: size,
          height: size,
          background: 'rgba(255,255,255,0.2)',
          borderRadius: i % 2 === 0 ? '50%' : 0,
          transform: `rotate(${interpolate(frame, [0, 100], [0, 360])}deg)`,
        }}
      />
    );
  });

  return <>{shapes}</>;
};

export default BackgroundElements;
