import React from 'react';

interface IBar {
  x: number | undefined;
  y: number;
  width: number;
  height: number;
  color: string;
  onMouseEnter: (event: React.MouseEvent<SVGPathElement, MouseEvent>) => void;
  onMouseLeave: () => void;
}

export const Bar: React.FC<IBar> = ({
  x,
  y,
  width,
  height,
  color,
  onMouseEnter,
  onMouseLeave,
}) => {
  const radius = height === 0 ? 0 : width * 0.15;

  return (
    <path
      d={`
        m${x},${y + radius}
        a${radius},${radius} 0 0 1 ${radius},${-radius}
        h${width - 2 * radius}
        a${radius},${radius} 0 0 1 ${radius},${radius}
        v${height - radius}
        h-${width}
        z
      `}
      fill={color}
      onMouseEnter={(event) => onMouseEnter(event)}
      onMouseLeave={onMouseLeave}
    />
  );
};
