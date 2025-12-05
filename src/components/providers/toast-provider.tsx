"use client";

import { Toaster } from "react-hot-toast";

export function ToastProvider() {
  return (
    <Toaster
      toastOptions={{
        className: "text-sm font-medium",
        success: {
          iconTheme: {
            primary: "#065f46",
            secondary: "#ecfdf5",
          },
        },
        error: {
          iconTheme: {
            primary: "#b91c1c",
            secondary: "#fee2e2",
          },
        },
      }}
    />
  );
}



