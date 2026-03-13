"use client";

import { usePathname, useRouter } from "next/navigation";
import { refreshTokensIfNeeded } from "@/lib/utils/auth-client";
import { useEffect } from "react";

// Pages that should not check the refresh token
const UNAUTHENTICATED_PATHS = ["/login", "/restore-session"];

// This component handles the case where the access token expires while using the website
// It prevents that situation by creating a setInterval to continuously check the token and refresh it before it expires

export default function TokenRefreshManager() {
  const pathname = usePathname();
  const router = useRouter();

  // Get the socket instance from the app store
  // Get the disconnectSocket function from the app store

  useEffect(() => {
    // Pages that do not need to check the refresh token
    if (UNAUTHENTICATED_PATHS.includes(pathname)) {
      return;
    }

    let interval: any = null;

    // The interval timeout must be shorter than the access token expiration time
    // Example: if the access token expires in 10 seconds, check once every second

    // It must be called once immediately because the interval only runs after the timeout, so it will not run right away the first time
    const onRefreshToken = (force?: boolean) =>
      refreshTokensIfNeeded({
        onError: () => {
          clearInterval(interval);

          // Disconnect socket

          router.push("/login");
        },
        force,
      });

    // Call it immediately the first time to get the latest access token and refresh token
    onRefreshToken();

    const TIMEOUT = 1000;

    // Start checking the token every TIMEOUT interval
    interval = setInterval(onRefreshToken, TIMEOUT);

    // Socket listeners to handle the socket connection, disconnection and other socket events

    return () => {
      clearInterval(interval);

      // Remove socket listeners
    };
  }, [
    pathname,
    router,
    // socket and disconnectSocket dependencies
  ]);

  return null;
}
