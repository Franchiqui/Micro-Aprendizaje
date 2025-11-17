'use client';

import { Button } from '@/components/ui/button';
import { useState, useEffect, useRef, ReactNode } from 'react';

interface FloatingChatButtonProps {
  onClick?: () => void;
  children: ReactNode;
}

export function FloatingChatButton({ onClick, children }: FloatingChatButtonProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePosition = () => {
      if (buttonRef.current) {
        const buttonWidth = buttonRef.current.offsetWidth;
        const buttonHeight = buttonRef.current.offsetHeight;
        // Position above the original FloatingButton (database button)
        const initialX = window.innerWidth - buttonWidth - 20;
        const initialY = window.innerHeight - buttonHeight - 90; // 20 (bottom margin) + 56 (button height) + 14 (some spacing)
        setPosition({ x: initialX, y: initialY });
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
    };
  }, []);

  const buttonClass = 'h-14 w-14 rounded-full shadow-lg transition-all hover:shadow-xl bg-transparent border-2 border-white text-white flex items-center justify-center';

  return (
    <div
      ref={buttonRef}
      className="fixed z-50" // z-index 50 to be above other content, but below iframe overlays
      style={{ left: position.x, top: position.y }} data-zeus-id="Z-283">

      <Button
        className={buttonClass}
        size="icon"
        variant="default"
        onClick={onClick} data-zeus-id="Z-284">

        {children}
      </Button>
    </div>);

}