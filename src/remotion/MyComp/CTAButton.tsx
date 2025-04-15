import { useCurrentFrame, interpolate } from 'remotion';

const CTAButton = ({ text, url }) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame % 30, [0, 15, 30], [1, 1.05, 1]);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        transform: `scale(${scale})`,
        padding: '12px 24px',
        backgroundColor: '#4285f4',
        color: 'white',
        fontSize: '24px',
        fontWeight: 'bold',
        borderRadius: '8px',
        textDecoration: 'none',
        boxShadow: `0 0 8px #4285f4`,
      }}
    >
      {text}
    </a>
  );
};

export default CTAButton;
