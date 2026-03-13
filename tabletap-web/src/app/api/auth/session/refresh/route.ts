import authApiRequest from "@/apis/auth.api";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

// If any error occurs while sending the refresh token request, return an error with status code 401
// This lets the client detect the error and continue handling it in `http.ts`
export async function POST() {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    return Response.json(
      { message: "Refresh token not found" },
      { status: 401 }
    );
  }

  try {
    const { payload } = await authApiRequest.refreshTokenFromServer({
      refreshToken,
    });

    const decodedAccessToken = jwt.decode(payload.data.accessToken) as {
      exp: number;
    };
    const decodedRefreshToken = jwt.decode(payload.data.refreshToken) as {
      exp: number;
    };

    cookieStore.set("accessToken", payload.data.accessToken, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      expires: decodedAccessToken.exp * 1000,
    });
    cookieStore.set("refreshToken", payload.data.refreshToken, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      expires: decodedRefreshToken.exp * 1000,
    });

    return Response.json(payload);
  } catch (error: any) {
    return Response.json(
      { message: error.message ?? "An error occurred" },
      { status: 401 }
    );
  }
}
