import { http } from '@/lib/http';

// Keep API calls grouped by feature in features/<feature>/api/*.
// This file is a small shared place for cross-feature endpoints.

export type HealthResponse = { status: 'ok' };

export function getHealth() {
  return http<HealthResponse>('/actuator/health');
}
