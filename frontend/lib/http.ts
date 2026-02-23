import { env } from '@/config/env';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export class HttpError extends Error {
  status: number;
  bodyText?: string;

  constructor(message: string, status: number, bodyText?: string) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.bodyText = bodyText;
  }
}

export async function http<T>(path: string, init?: RequestInit & { method?: HttpMethod }): Promise<T> {
  const url = path.startsWith('http') ? path : `${env.apiBaseUrl}${path}`;

  const res = await fetch(url, {
    ...init,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  });

  if (!res.ok) {
    const bodyText = await res.text().catch(() => undefined);
    throw new HttpError(`HTTP ${res.status} for ${url}`, res.status, bodyText);
  }

  // If API returns empty body
  if (res.status === 204) return undefined as T;

  return (await res.json()) as T;
}
