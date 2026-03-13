import RefreshTokenHandler from "@/app/(public)/(auth)/restore-session/_components/refresh-token-handler";
import Loader from "@/components/loader";
import { Suspense } from "react";

export default function RestoreSession() {
  return (
    <Suspense fallback={<Loader fullPage message="Restoring session..." />}>
      <RefreshTokenHandler />
    </Suspense>
  );
}
