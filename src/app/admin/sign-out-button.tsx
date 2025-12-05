"use client";

import { ReactNode } from "react";
import { signOut } from "next-auth/react";

type Props = {
  children: ReactNode;
};

export function SignOutButton({ children }: Props) {
  return (
    <button
      className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-4 py-2 text-xs font-semibold text-stone-600 transition hover:border-stone-400 hover:text-stone-900"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      {children}
    </button>
  );
}

