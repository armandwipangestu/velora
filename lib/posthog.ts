import posthog from 'posthog-js';

export const phCapture = (
  event: string,
  properties?: Record<string, unknown>
) => {
  if (typeof window === 'undefined') return;
  posthog.capture(event, properties);
};