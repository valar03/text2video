// ✅ File: remotion/MyComp/MainContent.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { generateSlideTexts } from '../../../types/constants';

const MainContent = () => {
  const searchParams = useSearchParams();
  const username = searchParams.get('username') || 'John Doe';
  const amount = searchParams.get('amount') || '150,000';
  const date = searchParams.get('date') || 'April 7th, 2025';

  const slideTexts = generateSlideTexts(username, amount, date);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Preview: Generated Slide Texts</h1>
      {slideTexts.map((lines, index) => (
        <div key={index} className="mb-4 p-4 border rounded bg-gray-50">
          {lines.map((line, subIndex) => (
            <p key={subIndex} className="text-lg text-gray-800">
              {line}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MainContent;
