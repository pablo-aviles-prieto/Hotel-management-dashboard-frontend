export const Bars = ({
  data,
  height,
  scaleX,
  scaleY,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <>
      {data.map(({ value, label }) => (
        <rect
          key={`bar-${label}`}
          x={scaleX(label)}
          y={scaleY(value)}
          width={scaleX.bandwidth()}
          height={height - scaleY(value)}
          fill='teal'
          onMouseEnter={(event) => onMouseEnter(event)}
          onMouseLeave={onMouseLeave}
        />
      ))}
    </>
  );
};
