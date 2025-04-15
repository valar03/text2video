import { NextRequest, NextResponse } from 'next/server';

const FLASK_API_URL = 'http://localhost:3005/vid'; // Flask API endpoint

export async function GET(req: NextRequest) {
  const prompts = [
    "Create a video about a loan approval"
  ];

  try {
    const response = await fetch(FLASK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompts }),
    });

    if (!response.ok) {
      throw new Error(`Flask API responded with status ${response.status}`);
    }

    const data = await response.json();

    // Corrected line here
    const videoPaths = data[0].result.map((video: string) => `/videos/${video}`);
    console.log("videopaths:", videoPaths);

    return NextResponse.json(videoPaths);
  } catch (error: unknown) {
    console.error('Error communicating with Flask API:', error);
    return NextResponse.json(
      { error: 'Failed to communicate with Flask API' },
      { status: 500 }
    );
  }
}
