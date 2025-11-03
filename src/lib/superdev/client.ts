import { createSuperdevClient } from "@superdevhq/client";

// Fallback values for development when environment variables are not set
const appId = import.meta.env.VITE_APP_ID || 'demo_app_id';
const baseUrl = import.meta.env.VITE_SUPERDEV_BASE_URL || 'https://demo.superdev.url';

export const superdevClient = createSuperdevClient({
  appId: appId,
  requiresAuth: false, // Temporarily disabled for development
  baseUrl: baseUrl,
  loginUrl: `${baseUrl}/auth/app-login?app_id=${appId}`,
});
