export function MessengerIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M12 3C6.9 3 3 6.8 3 11.6c0 2.6 1.2 4.9 3.1 6.4V21l2.9-1.6c.9.2 1.9.4 2.9.4 5.1 0 9-3.8 9-8.6S17.1 3 12 3z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M7.5 13.6l3.2-3.4 2.3 2 3.5-2.6-3.3 3.6-2.3-2z" fill="currentColor" />
    </svg>
  );
}
