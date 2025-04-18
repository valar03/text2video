import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
import { generateVoiceoverScript as script1 } from 'D:/git stuff/text2video/types/constants';
import { generateVoiceoverScript as script2 } from 'D:/git stuff/text2video/types/constants2';

export async function POST(req: NextRequest) {
  const { name, amount, date, template } = await req.json();

  // Choose the correct script template
  let text: string;
  if (template === 'template1') {
    // console.log("template1", template);
    text = script1(name, amount, date);
  } else if (template === 'template2') {
    text = script2(name, amount, date);
  } else {
    return NextResponse.json({
      success: false,
      error: `Unknown template: ${template}`,
    });
  }

  return new Promise((resolve) => {
    const python = spawn('python', ['generate_voiceover.py'], {
      cwd: process.cwd(),
    });

    const payload = JSON.stringify({ name, amount, date, template, text });
    python.stdin.write(payload);
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
