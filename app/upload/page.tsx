'use client';
import UploadExtractor from '@/components/UploadExtractor';
import { useRouter } from 'next/navigation';

export default function UploadPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-neutral-900 text-gray-800 dark:text-gray-100 px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4 text-center">📤 Upload & Extract Text</h1>
      <UploadExtractor />

      <button
        onClick={() => router.push('/')}
        className="mt-8 px-5 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
      >
        ← Back to Home
      </button>
    </main>
  );
}
