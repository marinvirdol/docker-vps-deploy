"use client";

import { Toaster } from "sonner";

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        className: "rounded-md",
        duration: 3000,
      }}
    />
  );
}
