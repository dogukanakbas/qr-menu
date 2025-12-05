"use client";

import QRCode from "react-qr-code";
import toast from "react-hot-toast";

type Props = {
  label: string;
  url: string;
  slug: string;
};

export function TableQrCard({ label, url, slug }: Props) {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    toast.success(`${label} linki kopyalandı`);
  };

  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-stone-200 bg-white/70 p-4">
      <div className="rounded-xl border border-stone-200 bg-white p-4">
        <QRCode value={url} size={140} />
      </div>
      <div className="text-center text-sm">
        <p className="font-semibold text-stone-900">{label}</p>
        <p className="font-mono text-xs text-stone-500">{slug}</p>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex w-full items-center justify-center rounded-full border border-stone-200 px-4 py-2 text-xs font-semibold text-stone-600 transition hover:border-stone-300"
      >
        QR linkini kopyala
      </button>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="inline-flex w-full items-center justify-center rounded-full bg-emerald-700 px-4 py-2 text-xs font-semibold text-white transition hover:bg-emerald-800"
      >
        Menüyü aç
      </a>
    </div>
  );
}



