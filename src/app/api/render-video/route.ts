import { NextRequest, NextResponse } from 'next/server';
import { renderMedia } from '@remotion/renderer';
import path from 'path';
import os from 'os';
import fs from 'fs';

export async function POST(req: NextRequest) {
  const { username, amount, tenure, template } = await req.json();

  // Determine the composition ID based on the template
  const compositionId = template === 'template1' ? 'Main' : 'TemplateTwo';

  // Define the output path for the rendered video
  const outputPath = path.join(os.tmpdir(), `video-${Date.now()}.mp4`);

  try {
    // Render the video using @remotion/renderer
    await renderMedia({
      composition: {
        id: compositionId,
        width: 1200,
        height: 700,
        fps: 20,
        durationInFrames: 600,
      },
      serveUrl: process.env.REMOTION_SERVE_URL || 'http://localhost:3000',
      codec: 'h264',
      outputLocation: outputPath,
      inputProps: {
        username,
        amount,
        tenure,
      },
    });

    // Ensure the file exists before returning the download URL
    if (!fs.existsSync(outputPath)) {
      throw new Error('Rendered video file not found.');
    }

    // Generate a unique token for the download URL
    const downloadToken = Buffer.from(outputPath).toString('base64');

    // Return the download URL for the rendered video
    return NextResponse.json({
      success: true,
      downloadUrl: `/api/download-video?token=${encodeURIComponent(downloadToken)}`,
    });
  } catch (error) {
    console.error('Error rendering video:', error);

    // Return a detailed error response
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to render video',
    });
  }
}