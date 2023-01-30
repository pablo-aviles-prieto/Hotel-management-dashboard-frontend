import { IFacility } from '../interfaces';
import { DoubleBed } from '../assets/icons/facilities';
import { FlexContainer } from '../components/Styles';

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
