import posthog from 'posthog-js';
import { ANALYTICS_ENABLED } from './env';

export const phCapture = (
  event: string,
  properties?: Record<string, unknown>
) => {
  if (!ANALYTICS_ENABLED) return;
  if (typeof window === 'undefined') return;
  posthog.capture(event, properties);
};