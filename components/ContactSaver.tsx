'use client';
import React from 'react';

interface Props {
  text: string;
}

function extractContactDetails(text: string) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

  let name = '';
  let phone = '';
  let company = '';

  for (const line of lines) {
    if (!name && /^[A-Z][a-z]+(\s[A-Z][a-z]+)+$/.test(line)) {
      name = line;
    }

    if (!phone && /(\+?\d[\d\s-]{9,})/.test(line)) {
      phone = line.match(/(\+?\d[\d\s-]{9,})/)?.[0] || '';
    }

    if (!company && /Designer|Technologies|Corp|Inc|LLC|Ltd|Company/.test(line)) {
      company = line;
    }
  }

  return { name, phone, company };
}

function downloadVCard({ name, phone, company }: { name: string; phone: string; company: string }) {
  const vCard = `
BEGIN:VCARD
VERSION:3.0
FN:${name}
ORG:${company}
TEL;TYPE=CELL:${phone}
END:VCARD
  `.trim();

  const blob = new Blob([vCard], { type: 'text/vcard' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `${name || 'contact'}.vcf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

const ContactSaver: React.FC<Props> = ({ text }) => {
  const { name, phone, company } = extractContactDetails(text);

  if (!name && !phone) return null;

  return (
    <div className="mt-4 space-y-2">
      <h3 className="font-semibold text-gray-700">Extracted Contact:</h3>
      <ul className="text-sm text-gray-600">
        <li><strong>Name:</strong> {name || 'Not Found'}</li>
        <li><strong>Phone:</strong> {phone || 'Not Found'}</li>
        <li><strong>Company:</strong> {company || 'Not Found'}</li>
      </ul>
      <button
        onClick={() => downloadVCard({ name, phone, company })}
        className="mt-2 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        Save to Contacts
      </button>
    </div>
  );
};

export default ContactSaver;
