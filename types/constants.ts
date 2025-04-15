import { z } from "zod";

// 🎞️ Composition Settings
export const COMP_NAME = "LoanVideo";
export const DURATION_IN_FRAMES = 320;
export const VIDEO_WIDTH = 1280;
export const VIDEO_HEIGHT = 720;
export const VIDEO_FPS = 20;

export const CompositionProps = z.object({
  title: z.string(),
});
// Optional default props if needed
// export const defaultMyCompProps: z.infer<typeof CompositionProps> = {
//   title: "Congratulations John Doe!",
// };

// 📦 Overlay colors to improve contrast
export const videoOverlays = [
  "rgba(0, 0, 0, 0.3)",
  "rgba(0, 0, 0, 0.4)",
  "rgba(0, 0, 0, 0.25)"
];

// 📽️ Fallback background videos (used if localStorage fails)
export const fallbackBackgroundVideos = [
  "/videos/video1.mp4",
  "/videos/video2.mp4",
  "/videos/video3.mp4"
];

// ✅ Dynamically fetch background videos from localStorage
export const getBackgroundVideos = (template: string): string[] => {
  if (typeof window === "undefined") return fallbackBackgroundVideos;

  try {
    const stored = localStorage.getItem(`template-${template}-videos`);
    const filenames = JSON.parse(stored || "[]");
    
    if (!Array.isArray(filenames) || !filenames.length) {
      return fallbackBackgroundVideos;
    }

    return filenames.map((name: string) => `${name}`);
  } catch (err) {
    console.error("❌ Failed to load background videos from localStorage:", err);
    return fallbackBackgroundVideos;
  }
};

// ✨ Voiceover + Slide generator
export const generateSlideTexts = (name: string, amount: string, date: string) => [
  [`Exciting News for ${name}!`, "Your Home Loan is Approved!"],
  [`Amount: $${amount}`, `Approval Date: ${date}`],
  ["Welcome to a New Financial Journey!"]
];

export const generateVoiceoverScript = (name: string, amount: string, date: string) =>
  `Congratulations ${name}! Your Home Loan of $${amount} has been approved on ${date}. Welcome to your financial journey.`;

// 💬 Fallback prompts
export const prompts = [
  "Welcome to our video presentation!",
  "Get ready for an exciting journey!",
  "We have some amazing content for you!",
  "Stay tuned for more updates!"
];
