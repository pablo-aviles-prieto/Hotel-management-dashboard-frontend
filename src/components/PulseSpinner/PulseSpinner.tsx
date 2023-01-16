import { PulseLoader } from 'react-spinners';

export const PulseSpinner: React.FC<{ isLoading: boolean }> = ({
  isLoading,
}) => {
  return (
    <PulseLoader
      color='#135846'
      loading={isLoading}
      cssOverride={{ textAlign: 'center', margin: 20 }}
      size={50}
      speedMultiplier={0.7}
      aria-label='Loading Spinner'
      data-testid='loader'
    />
  );
};
