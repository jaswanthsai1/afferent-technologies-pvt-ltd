import React, { useEffect, useState } from 'react';

export const StardustCursor: React.FC = () => {
  const [isMobile, setIsMobile] = useState(true); // Default to mobile/hidden to be safe

  useEffect(() => {
    const isTouch = 'ontouchstart' in window;
    const isSmallScreen = window.innerWidth < 768;
    setIsMobile(isTouch || isSmallScreen);

    if (isTouch || isSmallScreen) return;

    // Direct DOM manipulation completely bypasses React's render queue (0 Lag)
    const cursor = document.getElementById('stardust-cursor');
    if (!cursor) return;

    let ticking = false;
    const updateCursor = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', updateCursor, { passive: true });
    return () => window.removeEventListener('mousemove', updateCursor);
  }, []);

  if (isMobile) return null;

  return (
    <div
      id="stardust-cursor"
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] rounded-full mix-blend-screen transition-transform duration-75 ease-out translate-x-[-50%] translate-y-[-50%] will-change-transform"
      style={{
        background: 'radial-gradient(circle, rgba(0, 243, 255, 0.8) 0%, rgba(0, 243, 255, 0) 70%)',
        boxShadow: '0 0 20px rgba(0, 243, 255, 0.4), 0 0 40px rgba(255, 171, 145, 0.2)',
        marginLeft: '-16px', // Offset center
        marginTop: '-16px'   // Offset center
      }}
    >
      <div className="absolute inset-2 rounded-full bg-white blur-[1px]" />
    </div>
  );
};
