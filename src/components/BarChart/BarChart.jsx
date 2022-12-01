import * as d3 from 'd3';
import styled from 'styled-components';
import { useState } from 'react';
import { keyframes } from 'styled-components';
import { Bar } from './Bar';
import { BottomAxis } from './BottomAxis';
import { LeftAxis } from './LeftAxis';
import { RightAxis } from './RightAxis';

const fadeIn = keyframes`
 0% { transform: scale(0.8) translate(-0.5em, -0.5em); opacity: 0 }
 100% { transform: scale(1) translate(0, 0); opacity: 1 }
`;

const TooltipContainer = styled.div`
  position: fixed;
  pointer-events: none;
  padding: 0.75em;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.borderColor};
  border-radius: 0.5em;
  box-shadow: 0 0.25em 1em 0 rgba(0, 0, 0, 0.15);
  animation: ${fadeIn} 0.3s ease;
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

export const BarChart = ({ data, containerWidth }) => {
  const [tooltip, setTooltip] = useState(null);

  const margin = { top: 10, right: 62, bottom: 40, left: 40 };
  const width = containerWidth - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  const labels = data.map(({ label }) => label);
  const sublabels = Object.keys(data[0].values);
  const salesValues = data.map(({ values }) => values.sales).flat();

  const scaleX = d3
    .scaleBand()
    .domain(labels)
    .range([0, width])
    .paddingOuter(0)
    .paddingInner(0.3);
  const scaleYOccupancy = d3.scaleLinear().domain([0, 100]).range([height, 0]);
  const scaleYSales = d3
    .scaleLinear()
    .domain([0, Math.max(...salesValues)])
    .range([height, 0]);
  const subscaleX = d3
    .scaleBand()
    .domain(sublabels)
    .range([0, scaleX.bandwidth()])
    .padding(0.3);

  return (
    <>
      <svg
        width={width + margin.left + margin.right}
        height={height + margin.top + margin.bottom}
      >
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <BottomAxis scale={scaleX} transform={`translate(0, ${height})`} />
          <LeftAxis scale={scaleYOccupancy} width={width} />
          <RightAxis
            scale={scaleYSales}
            width={width}
            transform={`translate(${width}, 0)`}
          />
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
      {tooltip && (
        <TooltipContainer style={{ top: tooltip.y, left: tooltip.x }}>
          <span className='tooltip__title'>{tooltip.info.label}</span>
          <span className='tooltip__msg'>{tooltip.info.msg}</span>
        </TooltipContainer>
      )}
    </>
  );
};
