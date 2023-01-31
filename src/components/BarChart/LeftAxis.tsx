import * as d3 from 'd3';
import { useRef, useEffect } from 'react';

interface ILeftAxis {
  scale: d3.ScaleLinear<number, number, never>;
  width: number;
}

export const LeftAxis: React.FC<ILeftAxis> = ({ scale, width }) => {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (ref.current) {
      const leftAxis = d3
        .select(ref.current)
        .call(d3.axisLeft(scale).ticks(5).tickSize(0).tickPadding(15));
      leftAxis.selectAll('path').remove();
      leftAxis
        .selectAll('text')
        .style('font-size', 13)
        .style('color', '#196e58');
      leftAxis
        .selectAll('line')
        .attr('x1', 0)
        .attr('x2', width)
        .style('color', '#196e58')
        .style('opacity', 0.2);
    }
  }, [scale, width]);

  return <g ref={ref} />;
};
