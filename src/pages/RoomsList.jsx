import styled from 'styled-components';
import update from 'immutability-helper';
import { useState, useCallback, useMemo, useEffect } from 'react';
import {
  ButtonGreen,
  InputSelect,
  MainCard,
  Table,
  ImgHolder,
  PaginationButtons,
} from '../components/Styles';
import { DotMenu } from '../assets/icons';
import { CardDnd } from '../components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  paginationDataHandler,
  numberOfPages,
  paginationButtonsHandler,
} from '../utils';
import roomData from '../assets/data/rooms.json';

const PAGINATION_OFFSET = 10;

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
    label: 'Oldest',
    value: 'oldest',
  },
  {
    label: 'Higher Price',
    value: 'higher',
  },
  {
    label: 'Lower Price',
    value: 'lower',
  },
  {
    label: 'Available',
    value: 'available',
  },
  {
    label: 'Booked',
    value: 'booked',
  },
];

const RoomsList = () => {
  const [page, setPage] = useState(1);
  const [roomsList, setRoomsList] = useState(roomData);
  const [roomsListSliced, setRoomsListSliced] = useState([]);

  useEffect(() => {
    const arrayToRender = paginationDataHandler(
      roomsList,
      PAGINATION_OFFSET,
      page
    );
    setRoomsListSliced(arrayToRender);
  }, [roomsList, PAGINATION_OFFSET, page]);

  const totalPages = useMemo(() => {
    return numberOfPages(roomsList.length, PAGINATION_OFFSET);
  }, [roomsListSliced, PAGINATION_OFFSET]);

  const inputSelectHandler = (e) => {
    switch (e.target.value) {
      case 'newest':
        setRoomsList((prevState) => {
          const newArr = [...prevState];
          return newArr.sort((a, b) => +b.roomNumber - +a.roomNumber);
        });
        setPage(1);
        return;

      case 'oldest': {
        setRoomsList((prevState) => {
          const newArr = [...prevState];
          return newArr.sort((a, b) => +a.roomNumber - +b.roomNumber);
        });
        setPage(1);
        return;
      }
      case 'higher': {
        setRoomsList((prevState) => {
          const newArr = [...prevState];
          return newArr.sort((a, b) => +b.ratePerNight - +a.ratePerNight);
        });
        setPage(1);
        return;
      }
      case 'lower': {
        setRoomsList((prevState) => {
          const newArr = [...prevState];
          return newArr.sort((a, b) => +a.ratePerNight - +b.ratePerNight);
        });
        setPage(1);
        return;
      }
      case 'available': {
        setRoomsList((prevState) => {
          const availableArr = prevState.filter(
            (room) => room.status === 'Available'
          );
          const bookedArr = prevState.filter(
            (room) => room.status === 'Booked'
          );
          return [...availableArr, ...bookedArr];
        });
        setPage(1);
        return;
      }
      case 'booked': {
        setRoomsList((prevState) => {
          const availableArr = prevState.filter(
            (room) => room.status === 'Available'
          );
          const bookedArr = prevState.filter(
            (room) => room.status === 'Booked'
          );
          return [...bookedArr, ...availableArr];
        });
        setPage(1);
        return;
      }
    }
  };

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setRoomsListSliced((prevRoomsList) =>
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
          <ImgHolder width='150px' height='77px'>
            <img src={room.photo} alt='Photo from Hotel' />
          </ImgHolder>
          <div style={{ width: '73%' }}>
            <p style={{ color: '#799283', marginBottom: '10px' }}>
              #{room.roomNumber}
            </p>
            <p>{room.roomName}</p>
          </div>
        </FlexContainer>
      </td>
      <td>{room.bedType}</td>
      <td>Floor {room.roomFloor}</td>
      <td>
        {room.facilities.map((facility) => (
          <span key={facility} style={{ marginRight: '5px' }}>
            {facility}
          </span>
        ))}
      </td>
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
          bground={room.status === 'Available' ? '#5AD07A' : '#E23428'}
          onClick={() => console.log('check btn')}
        >
          {room.status}
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
            <thead id='card-header'>
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
              {roomsListSliced.map((room, i) => (
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
      <PaginationButtons>
        <p>
          Showing {roomsListSliced.length} of {roomsList.length} Data
        </p>
          <div id='pagination-container'>
            {paginationButtonsHandler(page, totalPages, setPage)}
          </div>
      </PaginationButtons>
    </>
  );
};

export default RoomsList;
