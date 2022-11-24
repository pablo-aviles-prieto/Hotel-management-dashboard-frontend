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
  MenuContainer,
} from '../components/Styles';
import { fetchRooms } from '../store/roomSlice';
import { DotMenu } from '../assets/icons';
import { CardDnd } from '../components';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { useNavigate } from 'react-router-dom';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  paginationDataHandler,
  numberOfPages,
  paginationButtonsHandler,
} from '../utils';
import roomData from '../assets/data/rooms.json';

const PAGINATION_OFFSET = 10;

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
    value: 'id1',
  },
  {
    label: 'Oldest',
    value: 'id0',
  },
  {
    label: 'Higher Price',
    value: 'ratePerNight1',
  },
  {
    label: 'Lower Price',
    value: 'ratePerNight0',
  },
  {
    label: 'Available',
    value: 'status0',
  },
  {
    label: 'Booked',
    value: 'status1',
  },
];

const RoomsList = () => {
  const [page, setPage] = useState(1);
  const [orderBy, setOderBy] = useState('id1');
  const [filteredRoomsList, setFilteredRoomsList] = useState([]);
  const [roomsListSliced, setRoomsListSliced] = useState([]);
  const roomsListRedux = useSelector((state) => state.rooms.roomList);
  const statusAPI = useSelector((state) => state.rooms.status);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log('roomsListRedux', roomsListRedux);

  useEffect(() => {
    dispatch(fetchRooms(roomData));
  }, [dispatch, fetchRooms, roomData]);

  useEffect(() => {
    const filteredRooms = [...roomsListRedux];
    const orderValue = orderBy.replace(/\d+/g, '');
    const orderDirection = orderBy.replace(/\D+/g, '');

    filteredRooms.sort((a, b) => {
      if (a[orderValue] > b[orderValue]) return orderDirection === '0' ? 1 : -1;
      if (a[orderValue] < b[orderValue]) return orderDirection === '0' ? -1 : 1;
      return 0;
    });

    const arrayToRender = paginationDataHandler(
      filteredRooms,
      PAGINATION_OFFSET,
      page
    );
    setRoomsListSliced(arrayToRender);
    setFilteredRoomsList(filteredRooms);
  }, [roomsListRedux, orderBy, page]);

  const totalPages = useMemo(() => {
    return numberOfPages(filteredRoomsList.length, PAGINATION_OFFSET);
  }, [filteredRoomsList.length]);

  const inputSelectHandler = (e) => {
    console.log('e.target.value', e.target.value);
    setOderBy(e.target.value);
    setPage(1);
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
            <img src={room.photo} alt='View of the Hotel' />
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
          onClick={() => navigate(`/rooms/${room.id}`)}
        />
      </td>
    </tr>
  );

  return (
    <>
      <MenuContainer>
        <div id='links-container'>
          <a href='#' className='link-active'>
            All Rooms
          </a>
          <a href='#'>Active Employee</a>
          <a href='#'>Inactive Employee</a>
        </div>
        <div id='buttons-container'>
          <ButtonGreen
            onClick={() => navigate(`/rooms/new`)}
            padding='13px 35px'
          >
            + New Room
          </ButtonGreen>
          <InputSelect
            padding='13px 25px'
            positionArrowY='5px'
            onChange={inputSelectHandler}
          >
            {optionsSelect.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </InputSelect>
        </div>
      </MenuContainer>
      {statusAPI === 'loading' ? (
        <h1
          style={{ textAlign: 'center', margin: '100px 0', fontSize: '40px' }}
        >
          Loading
        </h1>
      ) : (
        <>
          <DndProvider backend={HTML5Backend}>
            <TableCard
              borderRadius='20px'
              style={{ marginTop: '50px', marginBottom: '30px' }}
            >
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
              Showing {roomsListSliced.length} of {filteredRoomsList.length}{' '}
              Data
            </p>
            <div id='pagination-container'>
              {paginationButtonsHandler(page, totalPages, setPage)}
            </div>
          </PaginationButtons>
        </>
      )}
    </>
  );
};

export default RoomsList;
