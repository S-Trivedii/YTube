// utils/cookieOptions.js
export const getCookieOptions = () => ({
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "Lax",
});

// getCookieOptions returning an object
