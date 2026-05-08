import { useState, useEffect } from 'react';

const OPEN_HOUR = 9;
const OPEN_MINUTE = 30;
const CLOSE_HOUR = 19;
const CLOSE_MINUTE = 30;
const TIMEZONE = 'America/Mexico_City';

export function useOperatingHours() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const checkHours = () => {
      const now = new Date();
      const mexicoTime = new Date(
        now.toLocaleString('en-US', { timeZone: TIMEZONE })
      );

      const currentMinutes = mexicoTime.getHours() * 60 + mexicoTime.getMinutes();
      const openMinutes = OPEN_HOUR * 60 + OPEN_MINUTE;
      const closeMinutes = CLOSE_HOUR * 60 + CLOSE_MINUTE;

      setIsOpen(currentMinutes >= openMinutes && currentMinutes < closeMinutes);
    };

    checkHours();
    const interval = setInterval(checkHours, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  return { isOpen };
}
