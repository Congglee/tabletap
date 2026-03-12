"use client";

import { useEffect } from "react";
import { create } from "zustand";

type AppStoreType = {
  count: number;
  increment: () => void;
};

export const useAppStore = create<AppStoreType>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { increment } = useAppStore();

  useEffect(() => {
    increment();
  }, []);

  return <>{children}</>;
}
