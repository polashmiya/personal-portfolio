import { useEffect, useState } from 'react';

/** The current time in a time zone, like "4:12 PM", refreshed every 15 seconds. */
export function useLocalTime(timeZone) {
  const [time, setTime] = useState(() => format(timeZone));
  useEffect(() => {
    const id = setInterval(() => setTime(format(timeZone)), 15_000);
    return () => clearInterval(id);
  }, [timeZone]);
  return time;
}

function format(timeZone) {
  return new Intl.DateTimeFormat('en-US', { timeZone, hour: 'numeric', minute: '2-digit', hour12: true }).format(new Date());
}
