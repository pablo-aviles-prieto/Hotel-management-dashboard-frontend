import { BarChart } from './D3Components/BarChart';
import { GroupedBarChart } from './D3Components/GroupedBarChart';
import { GroupedBarChart2 } from './D3Components/GroupedBarChart-bkup';

const DATA = [
  { label: 'Apples', value: 100, value2: 40 },
  { label: 'Bananas', value: 200, value2: 90 },
  { label: 'Oranges', value: 50, value2: 120 },
  { label: 'Kiwis', value: 150, value2: 10 },
];

const GROUPED_BAR_CHART_DATA = [
  { label: 'Monday', values: [60, 84] },
  { label: 'Tuesday', values: [160, 200] },
  { label: 'Wednesday', values: [60, 40] },
  { label: 'Thursday', values: [60, 40] },
  { label: 'Friday', values: [60, 40] },
  { label: 'Saturday', values: [60, 40] },
  { label: 'Sunday', values: [60, 40] },
];

const DUMMY_WEEKLY_SALES_OCCUPANCY = [
  { label: 'Monday', values: { occupancy: 80, sales: 65400 } },
  { label: 'Tuesday', values: { occupancy: 20, sales: 15400 } },
  { label: 'Wednesday', values: { occupancy: 61, sales: 36100 } },
  { label: 'Thursday', values: { occupancy: 5, sales: 7853 } },
  { label: 'Friday', values: { occupancy: 96, sales: 72829 } },
  { label: 'Saturday', values: { occupancy: 88, sales: 68201 } },
  { label: 'Sunday', values: { occupancy: 65, sales: 42819 } },
];

export const D3Component = () => {
  return (
    <>
      <h1>Manolito</h1>
      <BarChart data={DATA} />
      <GroupedBarChart data={DUMMY_WEEKLY_SALES_OCCUPANCY} />
      <GroupedBarChart2 data={GROUPED_BAR_CHART_DATA} />
    </>
  );
};
