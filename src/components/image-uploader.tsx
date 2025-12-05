"use client";

import { useState } from "react";
import { UploadButton } from "@uploadthing/react";
import toast from "react-hot-toast";

import type { OurFileRouter } from "@/app/api/uploadthing/core";

type Props = {
  name: string;
  label?: string;
  defaultValue?: string | null;
  placeholder?: string;
};

export function ImageUploader({
  name,
  label = "Görsel adresi",
  defaultValue = "",
  placeholder = "https://... veya yükle",
}: Props) {
  const [value, setValue] = useState(defaultValue ?? "");
  const [isUploading, setIsUploading] = useState(false);

  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-stone-500">{label}</label>
      <div className="flex flex-col gap-3">
        <input
          name={name}
          type="url"
          value={value}
          placeholder={placeholder}
          onChange={(event) => setValue(event.target.value)}
          className="w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100"
        />
        <UploadButton<OurFileRouter>
          endpoint="menuImage"
          appearance={{
            button:
              "inline-flex items-center justify-center rounded-xl border border-dashed border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:border-emerald-300",
          }}
          onUploadProgress={() => setIsUploading(true)}
          onClientUploadComplete={(res) => {
            setIsUploading(false);
            const url = res?.[0]?.url;
            if (url) {
              setValue(url);
              toast.success("Görsel yüklendi!");
            }
          }}
          onUploadError={(error) => {
            setIsUploading(false);
            toast.error(error.message ?? "Yükleme başarısız");
          }}
        />
        {isUploading && <p className="text-xs text-emerald-600">Yükleniyor...</p>}
        {value && (
          <p className="truncate text-xs text-stone-500">
            Aktif URL: <span className="font-medium text-stone-700">{value}</span>
          </p>
        )}
      </div>
    </div>
  );
}



