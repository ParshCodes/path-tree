"use client";

import { useEffect, useState } from "react";
import { Zap } from "lucide-react";

interface SurpriseOverlayProps {
  trigger: boolean;
  onFlash?: () => void; // callback to run while overlay is active
}

export function SurpriseOverlay({ trigger, onFlash }: SurpriseOverlayProps) {
  const [showIcon, setShowIcon] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    if (trigger) {
      // Step 1: show icon while still in dark mode
      setShowIcon(true);

      const iconTimer = setTimeout(() => {
        setShowIcon(false);

        // Step 2: show overlay
        setShowOverlay(true);

        // Step 3: trigger theme change while overlay is active
        if (onFlash) onFlash();

        // Step 4: hide overlay after 3s
        const overlayTimer = setTimeout(() => {
          setShowOverlay(false);
        }, 3000);

        return () => clearTimeout(overlayTimer);
      }, 500); // icon lasts 0.5s

      return () => clearTimeout(iconTimer);
    }
  }, [trigger, onFlash]);

  return (
    <>
      {showIcon && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <Zap className="h-16 w-16 text-yellow-400 animate-ping" />
        </div>
      )}
      {showOverlay && (
        <div className="fixed inset-0 bg-white animate-surprise-fade pointer-events-none z-40" />
      )}
    </>
  );
}
