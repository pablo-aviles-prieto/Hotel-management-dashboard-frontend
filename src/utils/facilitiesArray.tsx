import {
  DoubleBed,
  LedTV,
  Coffee,
  AirConditioner,
  WiFi,
  Bath,
  Shower,
  Towel,
} from '../assets/icons/facilities';
import { FlexContainer } from '../components/Styles';
import { IFacility } from '../interfaces';

export const renderFacilities = ({
  facilities,
  facilitiesObj,
}: {
  facilities: string[];
  facilitiesObj: IFacility[];
}): JSX.Element[] => {
  return facilities.map((singleFacility) => {
    const facilityInfo = facilitiesObj.find(
      (facility) => facility.label === singleFacility
    );

    if (!facilityInfo) return <DoubleBed />;

    return (
      <div className='info-room-facilities-container-individuals'>
        <FlexContainer className='initial-mod'>
          <facilityInfo.component width={22} height={22} />
          <p>{singleFacility}</p>
        </FlexContainer>
      </div>
    );
  });
};

export const facilitiesArray: IFacility[] = [
  {
    label: 'Double Bed',
    component: DoubleBed,
  },
  {
    label: 'LED TV',
    component: LedTV,
  },
  {
    label: 'Coffee Set',
    component: Coffee,
  },
  {
    label: 'AC',
    component: AirConditioner,
  },
  {
    label: 'Wifi',
    component: WiFi,
  },
  {
    label: 'Towel',
    component: Towel,
  },
  {
    label: 'Shower',
    component: Shower,
  },
  {
    label: 'Bath',
    component: Bath,
  },
];
