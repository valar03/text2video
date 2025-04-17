import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

export const TextAnimationTwo: React.FC<{ index: number; textColor: string; children: string }> = ({
  index,
  textColor,
  children,
}) => {
  const frame = useCurrentFrame();
  const delay = index * 10;

  const animationStyle = {
    opacity: interpolate(frame, [delay, delay + 20], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
    transform: `translateY(${interpolate(frame, [delay, delay + 20], [50, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })}px)`,
  };

  return (
    <h1
      style={{
        color: textColor,
        ...animationStyle,
        fontSize: "40px",
        fontWeight: "bold",
        textAlign: "center",
      }}
    >
      {children}
    </h1>
  );
};