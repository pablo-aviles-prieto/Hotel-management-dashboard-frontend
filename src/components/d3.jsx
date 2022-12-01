import { BarChart } from './BarChart/BarChart';

const DUMMY_MONTHLY_SALES_OCCUPANCY = [
  { label: 'Jan', values: { occupancy: 70, sales: 175400 } },
  { label: 'Feb', values: { occupancy: 52, sales: 125975 } },
  { label: 'Mar', values: { occupancy: 41, sales: 120852 } },
  { label: 'Apr', values: { occupancy: 14, sales: 73561 } },
  { label: 'May', values: { occupancy: 26, sales: 82829 } },
  { label: 'June', values: { occupancy: 75, sales: 192201 } },
  { label: 'July', values: { occupancy: 83, sales: 221019 } },
  { label: 'Aug', values: { occupancy: 95, sales: 242111 } },
  { label: 'Sep', values: { occupancy: 88, sales: 230919 } },
  { label: 'Oct', values: { occupancy: 49, sales: 141822 } },
  { label: 'Nov', values: { occupancy: 21, sales: 62819 } },
  { label: 'Dec', values: { occupancy: 28, sales: 73013 } },
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
      <h1>D3</h1>
      <BarChart data={DUMMY_WEEKLY_SALES_OCCUPANCY} />
      {/* <BarChart data={DUMMY_MONTHLY_SALES_OCCUPANCY} /> */}
    </>
  );
};
