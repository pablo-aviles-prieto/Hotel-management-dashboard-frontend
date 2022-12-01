import * as d3 from 'd3';
import { useRef, useEffect } from 'react';

export const AxisLeft = ({ scale }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      d3.select(ref.current).call(d3.axisLeft(scale));
    }
  }, [scale]);

  return <g ref={ref} />;
};
