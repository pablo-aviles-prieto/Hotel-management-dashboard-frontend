import * as d3 from 'd3';
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { keyframes } from 'styled-components';

const fadeIn = keyframes`
 0% { transform: scale(0.8) translate(-0.5em, -0.5em); opacity: 0 }
 100% { transform: scale(1) translate(0, 0); opacity: 1 }
`;

const TooltipContainer = styled.div`
  position: fixed;
  pointer-events: none;
  padding: 0.75em;
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 0.5em;
  box-shadow: 0 0.25em 1em 0 rgba(0, 0, 0, 0.15);
  animation: ${fadeIn} 0.25s ease;
  font-size: 0.9em;
  span {
    text-align: center;
    display: block;
    margin-bottom: 0.5em;
  }
  .tooltip__title {
    font-weight: bold;
  }
`;

function Bar({ x, y, width, height, color, onMouseEnter, onMouseLeave }) {
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
}

export function GroupedBarChart({ data }) {
  const [tooltip, setTooltip] = useState(null);
  const axisBottomRef = useRef(null);
  const axisLeftRef = useRef(null);
  const axisRightRef = useRef(null);

  const margin = { top: 10, right: 60, bottom: 35, left: 30 };
  const width = 600 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  const labels = data.map(({ label }) => label);
  const sublabels = Object.keys(data[0].values);
  const salesValues = data.map(({ values }) => values.sales).flat();

  const scaleX = d3
    .scaleBand()
    .domain(labels)
    .range([0, width])
    .paddingOuter(0)
    .paddingInner(0.2);
  const scaleYOccupancy = d3.scaleLinear().domain([0, 100]).range([height, 0]);
  const scaleYSales = d3
    .scaleLinear()
    .domain([0, Math.max(...salesValues)])
    .range([height, 0]);
  const subscaleX = d3
    .scaleBand()
    .domain(sublabels)
    .range([0, scaleX.bandwidth()])
    .padding(0.4);

  useEffect(() => {
    if (axisBottomRef.current) {
      d3.select(axisBottomRef.current).call(
        d3.axisBottom(scaleX).tickSize(0).tickPadding(25)
      );
    }

    if (axisLeftRef.current) {
      d3.select(axisLeftRef.current).call(
        d3.axisLeft(scaleYOccupancy).ticks(5).tickSize(0).tickPadding(5)
      );
    }

    if (axisRightRef.current) {
      const rightAxis = d3
        .select(axisRightRef.current)
        .call(d3.axisRight(scaleYSales).tickSize(0).tickPadding(5));
      rightAxis
        .selectAll('path,line')
        // .style('opacity', 1)
        // .transition()
        // .duration(2000)
        // .style('opacity', 0)
        .remove();
    }
  }, [scaleX, scaleYOccupancy, scaleYSales]);

  return (
    <>
      <svg
        width={width + margin.left + margin.right}
        height={height + margin.top + margin.bottom}
      >
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <g ref={axisBottomRef} transform={`translate(0, ${height})`} />
          <g ref={axisLeftRef} />
          <g ref={axisRightRef} transform={`translate(${width}, 0)`} />
          {data.map(({ label, values }, groupIndex) => (
            <g
              key={`rect-group-${groupIndex}`}
              transform={`translate(${scaleX(label)}, 0)`}
            >
              <Bar
                key={`rect-${label}-occupancy`}
                x={subscaleX('occupancy') || 0}
                y={scaleYOccupancy(values.occupancy)}
                width={subscaleX.bandwidth()}
                height={height - scaleYOccupancy(values.occupancy)}
                color='#135846'
                onMouseEnter={(event) => {
                  setTooltip({
                    x: event.clientX,
                    y: event.clientY,
                    info: { label, msg: `${values.occupancy}% occupied` },
                  });
                }}
                onMouseLeave={() => setTooltip(null)}
              />
              <Bar
                key={`rect-${label}-sales`}
                x={subscaleX('sales') || 0}
                y={scaleYSales(values.sales)}
                width={subscaleX.bandwidth()}
                height={height - scaleYSales(values.sales)}
                color='#e23428'
                onMouseEnter={(event) => {
                  setTooltip({
                    x: event.clientX,
                    y: event.clientY,
                    info: { label, msg: `${values.sales}$ on sales` },
                  });
                }}
                onMouseLeave={() => setTooltip(null)}
              />
            </g>
          ))}
        </g>
      </svg>
      {tooltip !== null ? (
        <TooltipContainer style={{ top: tooltip.y, left: tooltip.x }}>
          <span className='tooltip__title'>{tooltip.info.label}</span>
          <span className='tooltip__msg'>{tooltip.info.msg}</span>
        </TooltipContainer>
      ) : null}
    </>
  );
}
