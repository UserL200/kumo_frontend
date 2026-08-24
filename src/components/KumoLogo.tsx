import React from 'react';

interface KumoLogoProps {
  className?: string;
  size?: number | string;
  strokeColor?: string;
}

export const KumoLogo: React.FC<KumoLogoProps> = ({
  className = 'w-7 h-7',
  size,
  strokeColor = 'currentColor',
}) => {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      fill="none"
      aria-label="Kumo Logo"
    >
      {/* Roof: a single simple peak */}
      <path
        d="M18,40 L50,12 L82,40"
        stroke={strokeColor}
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Checkmark, clearly separated below */}
      <path
        d="M28,72 L44,88 L76,56"
        stroke={strokeColor}
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
