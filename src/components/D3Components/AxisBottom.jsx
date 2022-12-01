import * as d3 from 'd3';
import { useRef, useEffect } from 'react';

export const AxisBottom = ({ scale, transform }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      d3.select(ref.current).call(d3.axisBottom(scale));
    }
  }, [scale]);

  return <g ref={ref} transform={transform} />;
};
