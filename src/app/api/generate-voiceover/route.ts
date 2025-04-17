import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';

export async function POST(req: NextRequest) {
  const { name, amount, date, template } = await req.json();
  
  return new Promise((resolve) => {
    const python = spawn('python', ['generate_voiceover.py'], {
      cwd: process.cwd(),
    });

    python.stdin.write(JSON.stringify({ name, amount, date, template }));
    python.stdin.end();

    let output = '';
    let errorOutput = '';

    python.stdout.on('data', (data) => {
      output += data.toString();
    });

    python.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    python.on('close', (code) => {
      if (code === 0) {
        resolve(NextResponse.json({ success: true, output }));
      } else {
        resolve(
          NextResponse.json({
            success: false,
            error: errorOutput || 'Voiceover generation failed',
          })
        );
      }
    });
  });
}
