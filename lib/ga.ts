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
  if (typeof window === 'undefined') return;
  if (!window.gtag) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
};