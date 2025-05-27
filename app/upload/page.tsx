'use client';
import UploadExtractor from '@/components/UploadExtractor';
import { useRouter } from 'next/navigation';
import NavBar from '@/components/NavBar';

export default function UploadPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-100 dark:from-neutral-900 dark:to-neutral-800 text-gray-800 dark:text-gray-100 px-4 py-8">
      <NavBar />
      <div className="w-full max-w-lg bg-white/90 dark:bg-neutral-900/80 rounded-2xl shadow-xl p-8 flex flex-col items-center">
        <h1 className="text-3xl font-semibold mb-4 text-center">📤 Upload & Extract Text</h1>
        <UploadExtractor />
        <button
          onClick={() => router.push('/')}
          className="mt-8 px-5 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition font-semibold shadow"
        >
          ← Back to Home
        </button>
      </div>
    </main>
  );
}