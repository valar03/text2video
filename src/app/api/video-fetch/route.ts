import { NextRequest, NextResponse } from 'next/server';

const FLASK_API_URL = 'http://localhost:3005/vid'; // Update with your Flask API URL

export async function GET(req: NextRequest) {
  // Hardcoded prompts
  const prompts = [
    "couple in front of the house",
    "female looking at home loan docs",
    "loan officer with family"
  ];

  try {
    // Send the prompts to the Flask API
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
    return NextResponse.json(data); // Return the response from the Flask API
  } catch (error: unknown) {
    console.error('Error communicating with Flask API:', error);
    return NextResponse.json(
      { error: 'Failed to communicate with Flask API' },
      { status: 500 }
    );
  }
}