'use client';
import { useRouter } from 'next/navigation';
import './globals.css';

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-100 dark:from-neutral-900 dark:to-neutral-800 text-center px-4">
      <h1 className="text-5xl font-bold mb-6 text-gray-800 dark:text-gray-100">📇 Contact Snapshot</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Scan or upload business cards and extract contact information instantly.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => router.push('/camera')}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        >
          Take a Photo
        </button>
        <button
          onClick={() => router.push('/upload')}
          className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
        >
          Upload an Image
        </button>
      </div>
    </main>
  );
}
