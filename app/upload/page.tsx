'use client';
import { useState } from 'react';
import NavBar from '@/components/NavBar';
import ContactSaver from '@/components/ContactSaver';

export default function UploadPage() {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setImage(file);

      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result;
        if (typeof base64 === 'string') {
          setPreviewUrl(base64);
          setLoading(true);
          try {
            const res = await fetch('/api/extract-text', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ base64Image: base64 }),
            });
            const data = await res.json();
            setText(data.text || 'No text found.');
          } catch (err) {
            setText('Failed to extract text.');
          }
          setLoading(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-200 px-4 py-12">
      <NavBar />

      <div className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-2xl text-center space-y-6">
        <h1 className="text-4xl font-extrabold text-indigo-700">Upload an Image</h1>

        <label className="inline-block px-6 py-3 bg-indigo-600 text-white font-medium rounded-full cursor-pointer hover:bg-indigo-700 transition">
          📁 Choose Image
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {previewUrl && (
          <div className="border-4 border-indigo-300 rounded-2xl overflow-hidden mt-4 shadow-lg">
            <img
              src={previewUrl}
              alt="Uploaded Preview"
              className="w-full h-auto max-h-96 object-contain"
            />
          </div>
        )}

        {loading && (
          <p className="text-indigo-500 font-semibold animate-pulse">🔍 Extracting text...</p>
        )}

        {text && (
          <div className="mt-4 bg-gray-900 text-lime-200 p-5 rounded-xl whitespace-pre-wrap max-h-[300px] overflow-y-auto text-left shadow-inner">
            <pre className="text-sm">{text}</pre>
          </div>
        )}

        {/* ✅ Show ContactSaver when text is available */}
        {text && <ContactSaver text={text} />}
      </div>
    </main>
  );
}
