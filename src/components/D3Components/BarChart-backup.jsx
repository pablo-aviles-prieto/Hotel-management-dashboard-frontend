import * as d3 from 'd3';
import { useState } from 'react';
import { AxisBottom } from './AxisBottom';
import { AxisRight } from './AxisRight';
import { AxisLeft } from './AxisLeft';
import { Bars } from './Bars';
import { Barsv2 } from './Barsv2';

export const BarChart = ({ data }) => {
  const [tooltip, setTooltip] = useState(null);

  const margin = { top: 20, right: 50, bottom: 20, left: 50 };
  const width = 500 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  const onMouseEnterHandler = (e) => {
    setTooltip({
      x: e.clientX,
      y: e.clientY,
    //   index: groupIndex,
    });
  };

  const onMouseLeaveHandler = () => {
    setTooltip(null);
  };

  const scaleX = d3
    .scaleBand()
    .domain(data.map(({ label }) => label))
    .range([0, width])
    .padding(0.5);

  const scaleYLeft = d3
    .scaleLinear()
    .domain([0, Math.max(...data.map(({ value }) => value))])
    .range([height, 0]);

  const scaleYRight = d3
    .scaleLinear()
    .domain([0, Math.max(...data.map(({ value }) => value))])
    .range([height, 0]);

  return (
    <svg
      width={width + margin.left + margin.right}
      height={height + margin.top + margin.bottom}
    >
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom scale={scaleX} transform={`translate(0, ${height})`} />
        <AxisLeft scale={scaleYLeft} />
        <AxisRight scale={scaleYRight} transform={`translate(${width}, 0)`} />
        {/* <Bars
          data={data}
          height={height}
          scaleX={scaleX}
          scaleY={scaleYLeft}
          onMouseEnter={onMouseEnterHandler}
          onMouseLeave={onMouseLeaveHandler}
        /> */}
        <Barsv2
          data={data}
          height={height}
          scaleX={scaleX}
          scaleY={scaleYLeft}
          onMouseEnter={onMouseEnterHandler}
          onMouseLeave={onMouseLeaveHandler}
        />
      </g>
    </svg>
  );
};
