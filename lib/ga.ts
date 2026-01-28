import { ANALYTICS_ENABLED } from "./env";

interface GAEventParams {
  action: string;
  category?: string;
  label?: string;
  value?: string | number;
}

export const gaEvent = ({
  action,
  category,
  label,
  value,
}: GAEventParams) => {
  if (!ANALYTICS_ENABLED) return;
  if (typeof window === 'undefined') return;
  if (!window.gtag) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
};