import RefreshTokenHandler from "@/app/(public)/(auth)/restore-session/_components/refresh-token-handler";
import { Suspense } from "react";

export default function RestoreSession() {
  return (
    <Suspense>
      <RefreshTokenHandler />
    </Suspense>
  );
}
