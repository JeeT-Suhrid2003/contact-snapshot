import CameraCapture from '@/components/UploadExtractor';

export default function CameraPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-neutral-900 text-gray-800 dark:text-gray-100 px-4 py-8">
      <CameraCapture />
    </main>
  );
}
