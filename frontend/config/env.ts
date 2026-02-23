// Central place for Expo public env vars.
// In Expo, only variables prefixed with EXPO_PUBLIC_ are exposed to the app.

export const env = {
  apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL ?? 'http://10.0.2.2:8080',
} as const;
