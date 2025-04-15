'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import axios from 'axios';

const prompts = [
  'Welcome to our video presentation!',
  'Get ready for an exciting journey!',
  'We have some amazing content for you!',
  'Stay tuned for more updates!',
];

export default function LoadingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { username, template } = useParams();

  useEffect(() => {
    const generateAndMove = async () => {
      try {
        const res = await axios.post('http://localhost:3005/vid', { prompts });
        const resultVideos = res.data;

        const savedVideoNames: string[] = [];

        for (const item of resultVideos) {
          if (item.result) {
            savedVideoNames.push(item.result);

            const src = `/videos/${item.result}`;
            const destFolder = `/videos/${template}`;
            const srcFullPath = `${window.location.origin}${src}`;

            const videoBlob = await fetch(srcFullPath).then((r) => r.blob());
            await videoBlob.arrayBuffer(); // simulate "moving" logic

            console.log(`✅ Simulated move: ${src} → ${destFolder}/${item.result}`);
          }
        }

        localStorage.setItem(`template-${template}-videos`, JSON.stringify(savedVideoNames));

        const encoded = {
          username: encodeURIComponent(searchParams.get('username') || ''),
          amount: encodeURIComponent(searchParams.get('amount') || ''),
          tenure: encodeURIComponent(searchParams.get('tenure') || ''),
        };

        router.push(
          `/user/${encoded.username}/${template}?username=${encoded.username}&amount=${encoded.amount}&tenure=${encoded.tenure}`
        );
      } catch (err) {
        console.error('❌ Failed during loading sequence:', err);
        alert('Something went wrong during video generation.');
      }
    };

    generateAndMove();
  }, [router, template, username, searchParams]);

  return (
    <main className="p-8 flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-3xl font-semibold mb-4">Generating your video...</h1>
      <p className="text-gray-600">Please wait while we prepare your personalized video experience.</p>
      <div className="mt-6 animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent" />
    </main>
  );
}
