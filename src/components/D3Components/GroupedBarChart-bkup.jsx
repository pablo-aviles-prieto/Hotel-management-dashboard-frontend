import * as d3 from 'd3';
import styled from 'styled-components';
import { MouseEvent, useEffect, useRef, useState } from 'react';
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
  &__title {
    display: block;
    margin-bottom: 0.5em;
    font-weight: bold;
  }
  &__table {
    border-collapse: collapse;
    td {
      border: 1px solid;
      padding: 0.25em;
    }
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

export function GroupedBarChart2({ data }) {
  const [tooltip, setTooltip] = useState(null);
  const axisBottomRef = useRef(null);
  const axisLeftRef = useRef(null);

  const margin = { top: 10, right: 30, bottom: 20, left: 30 };
  const width = 600 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  const labels = data.map(({ label }) => label);
  const sublabels = Object.keys(data[0].values);
  const values = data.map(({ values }) => values).flat();

  const scaleX = d3.scaleBand().domain(labels).range([0, width]).padding(0.2);
  const scaleY = d3
    .scaleLinear()
    .domain([0, Math.max(...values)])
    .range([height, 0]);
  const subscaleX = d3
    .scaleBand()
    .domain(sublabels)
    .range([0, scaleX.bandwidth()])
    .padding(0.4);

  useEffect(() => {
    if (axisBottomRef.current) {
      d3.select(axisBottomRef.current).call(d3.axisBottom(scaleX));
    }

    if (axisLeftRef.current) {
      d3.select(axisLeftRef.current).call(d3.axisLeft(scaleY));
    }
  }, [scaleX, scaleY]);

  return (
    <>
      <svg
        width={width + margin.left + margin.right}
        height={height + margin.top + margin.bottom}
      >
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <g ref={axisBottomRef} transform={`translate(0, ${height})`} />
          <g ref={axisLeftRef} />
          {data.map(({ label, values }, groupIndex) => (
            <g
              key={`rect-group-${groupIndex}`}
              transform={`translate(${scaleX(label)}, 0)`}
            >
              {values.map((value, barIndex) => (
                <Bar
                  key={`rect-${barIndex}`}
                  x={subscaleX(String(barIndex)) || 0}
                  y={scaleY(value)}
                  width={subscaleX.bandwidth()}
                  height={height - scaleY(value)}
                  color='teal'
                  onMouseEnter={(event) => {
                    setTooltip({
                      x: event.clientX,
                      y: event.clientY,
                      index: groupIndex,
                    });
                  }}
                  onMouseLeave={() => setTooltip(null)}
                />
              ))}
            </g>
          ))}
        </g>
      </svg>
      {tooltip !== null ? (
        <TooltipContainer
          className='tooltip'
          style={{ top: tooltip.y, left: tooltip.x }}
        >
          <span className='tooltip__title'>{labels[tooltip.index]}</span>
          <table className='tooltip__table'>
            <thead>
              <tr>
                <td>Value 1</td>
                <td>Value 2</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{data[tooltip.index].values[0]}</td>
                <td>{data[tooltip.index].values[1]}</td>
              </tr>
            </tbody>
          </table>
        </TooltipContainer>
      ) : null}
    </>
  );
}
