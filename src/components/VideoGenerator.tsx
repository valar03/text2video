import { useEffect, useState } from "react";
import { Main } from "./MyComp/Main"; // Make sure the import path is correct

export const VideoGenerator = () => {
  const [videos, setVideos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true); // To track loading state

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // Fetching video paths
        const response = await fetch("http://localhost:3005/vid", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompts: ["Create a video about a loan approval"], // Add prompts or modify as needed
          }),
        });
        const data = await response.json();

        // Log data for debugging purposes
        console.log("Fetched Video Data:", data);

        // Extracting video filenames and creating paths
        const videoList = data[0].result.map((filename: string) => `/videos/${filename}`);
        setVideos(videoList); // Set video paths to state
        setLoading(false); // Set loading to false after fetching videos
      } catch (error) {
        console.error("Error fetching videos:", error);
        setLoading(false); // Stop loading even on error
      }
    };

    fetchVideos();
  }, []); // Empty dependency array means it runs only on mount

  if (loading) {
    return <div>Loading videos...</div>; // Show loading message
  }

  // Passing the video paths to the Main component
  return <Main backgroundVideos={videos} />;
};
