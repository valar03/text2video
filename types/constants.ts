import { z } from "zod";

export const COMP_NAME = "LoanVideo";

// 👇 Only include this if you still want to support `title` via props
export const CompositionProps = z.object({
  title: z.string(),
});
// export const defaultMyCompProps: z.infer<typeof CompositionProps> = {
//   title: "Congratulations John Doe!",
// };

export const DURATION_IN_FRAMES = 320; // 3 slides × 60 frames = 180 (or adjust based on # of slides)
export const VIDEO_WIDTH = 1280;
export const VIDEO_HEIGHT = 720;
export const VIDEO_FPS = 20;

// // 🧾 Slide Texts for Video
// export const slideTexts = [
//   ["Exciting News for John!", "Your Home Loan is Approved!"],
//   ["Amount: $150,000", "Approval Date: April 7th, 2025"],
//   ["Welcome to a New Financial Journey!"]
// ];

// 🎥 Background Videos for each slide - local video paths
export const backgroundVideos = [
  "/videos/video1.mp4",
  "/videos/video2.mp4",
  "/videos/video3.mp4"
];

// 🎨 Overlay colors for videos (to improve text readability)
export const videoOverlays = [
  "rgba(0, 0, 0, 0.3)",  // Slight dark overlay for first slide
  "rgba(0, 0, 0, 0.4)",  // Medium dark overlay for second slide
  "rgba(0, 0, 0, 0.25)"  // Light dark overlay for third slide
];

export const generateSlideTexts = (
  name: string,
  amount: string,
  date: string
) => [
  [`Exciting News for ${name}!`, "Your Home Loan is Approved!"],
  [`Amount: $${amount}`, `Approval Date: ${date}`],
  ["Welcome to a New Financial Journey!"]
];

export const generateVoiceoverScript = (
  name: string,
  amount: string,
  date: string
) =>
  `Congratulations ${name}! Your Home Loan of $${amount} has been approved on ${date}. Welcome to your financial journey.`;
