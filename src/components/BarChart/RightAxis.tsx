import * as d3 from 'd3';
import { useRef, useEffect } from 'react';

interface IRightAxis {
  scale: d3.ScaleLinear<number, number, never>;
  transform: string;
  width: number;
}

export const RightAxis: React.FC<IRightAxis> = ({
  scale,
  transform,
  width,
}) => {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (ref.current) {
      const rightAxis = d3
        .select(ref!.current)
        .call(d3.axisRight(scale).tickSize(0).tickPadding(15));
      rightAxis.selectAll('path').remove();
      rightAxis
        .selectAll('text')
        .style('font-size', 12)
        .style('color', '#e23428');
      rightAxis
        .selectAll('line')
        .attr('x1', -width)
        .attr('x2', 0)
        .style('color', '#e23428')
        .style('opacity', 0.2);
    }
  }, [scale]);

  return <g ref={ref} transform={transform} />;
};
