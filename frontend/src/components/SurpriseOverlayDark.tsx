"use client";

import { useEffect, useState } from "react";
import { Zap } from "lucide-react";

interface SurpriseOverlayDarkProps {
  trigger: boolean;
  onFlash?: () => void;
}

export function SurpriseOverlayDark({ trigger, onFlash }: SurpriseOverlayDarkProps) {
  const [showIcon, setShowIcon] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    if (trigger) {
      setShowIcon(true);

      const iconTimer = setTimeout(() => {
        setShowIcon(false);

        if (onFlash) onFlash();
        setShowOverlay(true);

        const overlayTimer = setTimeout(() => {
          setShowOverlay(false);
        }, 3000);

        return () => clearTimeout(overlayTimer);
      }, 500);

      return () => clearTimeout(iconTimer);
    }
  }, [trigger, onFlash]);

  return (
    <>
      {showIcon && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <Zap className="h-16 w-16 text-gray-800 animate-ping" />
        </div>
      )}
      {showOverlay && (
        <div className="fixed inset-0 bg-black animate-surprise-fade-dark pointer-events-none z-40" />
      )}
    </>
  );
}
