// src/lib/auth.js
import jwt from "jsonwebtoken";

class AuthError extends Error {
  constructor(message = "Authentication error") {
    super(message);
    this.name = "AuthError";
  }
}
class ForbiddenError extends Error {
  constructor(message = "Forbidden") {
    super(message);
    this.name = "ForbiddenError";
  }
}

/**
 * Get token from request. App Router supports (req.cookies.get).
 */
export function getTokenFromReq(req) {
  // Next.js Request has req.cookies.get(...)
  try {
    const token = req?.cookies?.get?.("auth")?.value ?? null;
    if (token) return token;
  } catch (e) {}
  // Fallback: Read from cookie header (rare in App Router but useful for tests)
  const cookieHeader = req?.headers?.get?.("cookie") || req?.headers?.cookie;
  if (!cookieHeader) return null;
  const m = cookieHeader.match(/auth=([^;]+)/);
  return m ? decodeURIComponent(m[1]) : null;
}

/**
 * Checks the token and returns the payload or throws an AuthError.
 */
export function verifyToken(token) {
  if (!token) throw new AuthError("Missing token");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    throw new AuthError("Invalid token");
  }
}

/**
 * Ensures an authenticated user exists and returns the decoded payload.
 */
export function requireAuth(req) {
  const token = getTokenFromReq(req);
  const decoded = verifyToken(token);
  return decoded;
}

/**
 * Ensures that the user admin then returns the decoded payload.
 */
export function requireAdmin(req) {
  const decoded = requireAuth(req);
  if (!decoded || String(decoded.role).toLowerCase() !== "admin") {
    throw new ForbiddenError("Admin only");
  }
  return decoded;
}

export { AuthError, ForbiddenError };
