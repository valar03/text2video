"use client";

import { Player } from "@remotion/player";
import type { NextPage } from "next";
import React, { useState } from "react";
import {
  DURATION_IN_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "../../types/constants";
import { Main } from "../remotion/MyComp/Main";

const Home: NextPage = () => {
  const [showLastFrame, setShowLastFrame] = useState(false);

  return (
    <div style={{ backgroundColor: "white", minHeight: "100vh" }}>
      <div className="max-w-screen-md m-auto mb-5">
        <div className="overflow-hidden rounded-geist shadow-[0_0_200px_rgba(0,0,0,0.15)] mb-10 mt-16">
          {showLastFrame ? (
            <div
              style={{
                width: "100%",
                height: VIDEO_HEIGHT,
                backgroundColor: "white",
              }}
            >
              {/* 🔥 This renders the final frame with your CTA */}
              <Main frame={DURATION_IN_FRAMES + 10} />
            </div>
          ) : (
            <div style={{ backgroundColor: "white" }}>
              <Player
                component={Main}
                durationInFrames={DURATION_IN_FRAMES}
                fps={VIDEO_FPS}
                compositionHeight={VIDEO_HEIGHT}
                compositionWidth={VIDEO_WIDTH}
                style={{ width: "100%" }}
                controls
                autoPlay
                loop={false}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
