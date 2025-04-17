import { z } from "zod";

// 🎞️ Composition Settings
export const COMP_NAME = "LoanCompletionVideo";
export const DURATION_IN_FRAMES = 320;
export const VIDEO_WIDTH = 1280;
export const VIDEO_HEIGHT = 720;
export const VIDEO_FPS = 20;

export const CompositionProps = z.object({
  title: z.string(),
});

// Optional default props if needed
// export const defaultMyCompProps: z.infer<typeof CompositionProps> = {
//   title: "Loan Successfully Completed!",
// };

// 📦 Overlay colors to improve contrast
export const videoOverlays = [
  "rgba(0, 0, 0, 0.3)",
  "rgba(0, 0, 0, 0.4)",
  "rgba(0, 0, 0, 0.25)"
];

// ✨ Voiceover + Slide generator
export const generateSlideTexts = (name: string, amount: string, date: string) => [
  [`Congratulations ${name}!`, "Your Home Loan is Fully Paid Off!"],
  [`Amount Paid: $${amount}`, `Completion Date: ${date}`],
  ["Your Financial Freedom Starts Now!"]
];

export const generateVoiceoverScript = (name: string, amount: string, date: string) =>
  `Congratulations ${name}! Your Home Loan of $${amount} has been fully paid off on ${date}. Your financial freedom starts now!`;

// 💬 Fallback prompts
export const prompts = [
  "Welcome to our loan completion celebration!",
  "A huge congratulations on your achievement!",
  "You've reached a major milestone in your financial journey!",
  "Here's to new beginnings and financial freedom!"
];
