import styled from 'styled-components';
import update from 'immutability-helper';
import { useState, useCallback } from 'react';
import {
  ButtonGreen,
  InputSelect,
  MainCard,
  Table,
  ImgHolder,
} from '../components/Styles';
import { DotMenu } from '../assets/icons';
import { CardDnd } from '../components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const MenuContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  #links-container {
    display: flex;
    a {
      padding: 5px 15px;
      border-bottom: 2px solid #d7d7d8;
    }
    .link-active {
      border-color: #135846;
      color: #135846;
      font-weight: 700;
    }
  }
  #buttons-container {
    button {
      margin-right: 25px;
    }
  }
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TableCard = styled(MainCard)`
  padding: 0;
`;

const ButtonListRooms = styled(ButtonGreen)`
  color: #fff;
  min-width: 108px;
  background-color: ${({ bground }) => bground};
`;

const optionsSelect = [
  {
    label: 'Newest',
    value: 'newest',
  },
  {
    label: 'Status',
    value: 'status',
  },
  {
    label: 'Price',
    value: 'price',
  },
];

const RoomsList = () => {
  const [roomsList, setRoomsList] = useState([
    {
      id: 1,
      roomId: '#0001',
      roomName: 'Deluxe A-91234',
      bedType: 'Double Bed',
      roomFloor: 'A-1',
      facilities:
        'AC, Shower, Double Bed, Towel, Bath, Coffee Set, LED TV, Wifi',
      ratePerNight: 145,
      availability: true,
      text: 'test1',
    },
    {
      id: 2,
      roomId: '#0002',
      roomName: 'Deluxe A-43219',
      bedType: 'Double Bed',
      roomFloor: 'A-2',
      facilities: 'AC, Shower, Double Bed, Towel, Bath, Coffee Set, Wifi',
      ratePerNight: 199,
      availability: false,
      text: 'test2',
    },
    {
      id: 3,
      roomId: '#0003',
      roomName: 'Deluxe A-51515',
      bedType: 'Double Bed',
      roomFloor: 'A-3',
      facilities: 'AC, Shower, Double Bed, LED TV, Wifi',
      ratePerNight: 119,
      availability: true,
      text: 'test3',
    },
    {
      id: 4,
      roomId: '#0004',
      roomName: 'Deluxe A-ASDA2',
      bedType: 'Double Bed',
      roomFloor: 'A-1',
      facilities:
        'AC, Shower, Double Bed, Towel, Bath, Coffee Set, LED TV, Wifi',
      ratePerNight: 150,
      availability: false,
      text: 'test4',
    },
  ]);

  const inputSelectHandler = (e) => {
    console.log('e', e.target.value);
  };

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setRoomsList((prevRoomsList) =>
      update(prevRoomsList, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevRoomsList[dragIndex]],
        ],
      })
    );
  }, []);

  const renderRoomRow = (room, ref, dragOpacity, handlerId) => (
    <tr ref={ref} style={{ opacity: dragOpacity }} data-handler-id={handlerId}>
      <td>
        <FlexContainer>
          <ImgHolder width='150px' height='77px'></ImgHolder>
          <div>
            <p style={{ color: '#799283', marginBottom: '10px' }}>
              {room.roomId}
            </p>
            <p>{room.roomName}</p>
          </div>
        </FlexContainer>
      </td>
      <td>{room.bedType}</td>
      <td>Floor {room.roomFloor}</td>
      <td>{room.facilities}</td>
      <td>
        <p style={{ fontWeight: '700' }}>
          ${room.ratePerNight}
          <span
            style={{
              marginLeft: '5px',
              color: '#799283',
              fontWeight: '400',
              fontSize: '13px',
            }}
          >
            /night
          </span>
        </p>
      </td>
      <td
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '15px',
        }}
      >
        <ButtonListRooms
          style={{ marginRight: '20px' }}
          padding='12px 22px'
          bground={room.availability ? '#5AD07A' : '#E23428'}
          onClick={() => console.log('check btn')}
        >
          {room.availability ? 'Available' : 'Booked'}
        </ButtonListRooms>
        <DotMenu
          style={{ cursor: 'pointer' }}
          width='25px'
          height='35px'
          onClick={() => console.log('check menu dots')}
        />
      </td>
    </tr>
  );

  return (
    <>
      <MenuContainer>
        <div id='links-container'>
          <a className='link-active'>All Rooms</a>
          <a>Active Employee</a>
          <a>Inactive Employee</a>
        </div>
        <div id='buttons-container'>
          <ButtonGreen padding='13px 35px'>+ New Room</ButtonGreen>
          <InputSelect
            padding='13px 25px'
            positionArrowY='5px'
            onChange={inputSelectHandler}
          >
            {optionsSelect.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </InputSelect>
        </div>
      </MenuContainer>
      <DndProvider backend={HTML5Backend}>
        <TableCard borderRadius='20px' style={{ margin: '30px 0' }}>
          <Table>
            <thead>
              <tr>
                <th>Room name</th>
                <th>Bed Type</th>
                <th>Room Floor</th>
                <th style={{ width: '300px' }}>Facilities</th>
                <th>Rate</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: '15px' }}>
              {roomsList.map((room, i) => (
                <CardDnd
                  key={room.id}
                  id={room.id}
                  index={i}
                  data={room}
                  renderData={renderRoomRow}
                  moveCard={moveCard}
                />
              ))}
            </tbody>
          </Table>
        </TableCard>
      </DndProvider>
    </>
  );
};

export default RoomsList;
