'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function HomePage() {
  const router = useRouter();
  const [template, setTemplate] = useState('template1');
  const [username, setUsername] = useState('');
  const [amount, setAmount] = useState('');
  const [tenure, setTenure] = useState('');

  const handleSubmit = () => {
    if (username && template) {
      router.push(`/loading/${template}?username=${username}&amount=${amount}&date=${tenure}`);
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Video Generator</h1>
      <select value={template} onChange={e => setTemplate(e.target.value)} className="border p-2 mb-2">
        <option value="template1">Template 1</option>
        {/* Add more templates here */}
      </select>
      <input placeholder="Username" className="block border p-2 mb-2" value={username} onChange={e => setUsername(e.target.value)} />
      <input placeholder="Amount" className="block border p-2 mb-2" value={amount} onChange={e => setAmount(e.target.value)} />
      <input placeholder="Date" className="block border p-2 mb-2" value={tenure} onChange={e => setTenure(e.target.value)} />
      <button className="bg-blue-500 text-white px-4 py-2" onClick={handleSubmit}>Generate</button>
    </main>
  );
}
