import React, { useState, useEffect, useMemo, useContext } from 'react';
import { useAppDispatch, useAppSelector } from '../store/typedHooks';
import { useNavigate } from 'react-router-dom';
import {
  MenuContainer,
  MainCard,
  InputSelect,
  Table,
  ImgHolder,
  ButtonSidebar,
  PaginationButtons,
  FlexContainer,
} from '../components/Styles';
import {
  paginationDataHandler,
  numberOfPages,
  paginationButtonsHandler,
  dateHandler,
  reorderHandler
} from '../utils';
import { AuthContext } from '../store/auth-context';
import { fetchBookings, IBookingObj } from '../store/bookingSlice';
import styled from 'styled-components';
import { Modal } from '../components';

interface IModalState {
  title: string;
  message: string;
}

const PAGINATION_OFFSET = 10;

const InputSelectInverted = styled(InputSelect)`
  cursor: pointer;
  background-color: #135846;
  color: #fff;
  font-weight: 400;
  margin-right: 25px;
  background-image: url("data:image/svg+xml;utf8,<svg fill='white' height='30' viewBox='0 0 24 24' width='30' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
`;

const TableCard = styled(MainCard)`
  padding: 0;
  margin: 30px 0;
  margin-top: 50px;
`;

const ButtonForRequest = styled(ButtonSidebar)`
  color: ${({ theme }) => theme.blackToWhite};
  background-color: ${({ theme }) => theme.lightGreenToGrey};
  font-weight: 700;
`;

const ButtonForNoRequest = styled(ButtonForRequest)`
  cursor: default;
  color: ${({ theme }) => theme.greyToGreen};
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.greyToGreen};
`;

const ButtonStatusGreen = styled(ButtonForRequest)`
  color: #5ad07a;
  background-color: ${({ theme }) => theme.greener};
`;

const ButtonStatusRed = styled(ButtonForRequest)`
  color: #e23428;
  background-color: ${({ theme }) => theme.reder};
`;

const ButtonStatusYellow = styled(ButtonForRequest)`
  color: #9b9807;
  background-color: ${({ theme }) => theme.yellower};
`;

const optionsSelect1 = [
  {
    label: 'Newest',
    value: { value: 'bookingNumber', sort: 1 },
  },
  {
    label: 'Oldest',
    value: { value: 'bookingNumber', sort: 0 },
  },
  {
    label: 'Guest A-Z',
    value: { value: ['user', 'name'], sort: 0 },
  },
  {
    label: 'Guest Z-A',
    value: { value: ['user', 'name'], sort: 1 },
  },
  {
    label: 'Check in',
    value: { value: 'checkIn', sort: 0 },
  },
  {
    label: 'Check out',
    value: { value: 'checkOut', sort: 0 },
  },
];

const optionsSelect2 = [
  {
    label: '1 November 2022 - 30 November 2022',
    value: 'november 2022',
  },
  {
    label: '1 December 2022 - 31 December 2022',
    value: 'december 2022',
  },
];

const Bookings = () => {
  const [modalState, setModalState] = useState<IModalState | null>(null);
  const [page, setPage] = useState(1);
  const [filteredBookingsList, setFilteredBookingsList] = useState<
    IBookingObj[]
  >([]);
  const [orderBy, setOderBy] = useState(
    JSON.stringify({ value: 'bookingNumber', sort: 1 })
  );
  const [bookingsListSliced, setBookingsListSliced] = useState<IBookingObj[]>(
    []
  );
  const bookingsListRedux = useAppSelector(
    (state) => state.bookings.bookingsList
  );
  const fetchStatusAPI = useAppSelector((state) => state.bookings.fetchStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { authStatus } = useContext(AuthContext);

  console.log('fetchStatusAPI bookings', fetchStatusAPI);

  useEffect(() => {
    dispatch(
      fetchBookings({
        url: new URL('http://localhost:3200/bookings'),
        fetchObjProps: {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authStatus.token}`,
          },
        },
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (fetchStatusAPI !== 'idle') return;

    const filteredBookings = Array.isArray(bookingsListRedux)
      ? [...bookingsListRedux]
      : [bookingsListRedux];
    const parsedObj = JSON.parse(orderBy);
    const orderValue = parsedObj.value;
    const orderDirection = parsedObj.sort;

    const filteredReorderedBookings = reorderHandler({
      array: filteredBookings,
      orderValue,
      orderDirection,
    });

    const arrayToRender = paginationDataHandler(
      filteredReorderedBookings,
      PAGINATION_OFFSET,
      page
    );
    setBookingsListSliced(arrayToRender);
    setFilteredBookingsList(filteredReorderedBookings);
  }, [bookingsListRedux, orderBy, page]);

  const totalPages = useMemo(() => {
    return numberOfPages(filteredBookingsList.length, PAGINATION_OFFSET);
  }, [filteredBookingsList.length]);

  const closeModalHandler = () => {
    setModalState(null);
  };

  const inputSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOderBy(e.target.value);
    setPage(1);
  };
  const inputDateSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('option selected =>', e.target.value);
  };

  const singleBookingHandler = (id: number) => {
    navigate(`/bookings/${id}`);
  };

  return (
    <>
      {modalState && (
        <Modal
          title={modalState.title}
          message={modalState.message}
          closeModalHandler={closeModalHandler}
        />
      )}
      <MenuContainer>
        <div id='pages-container'>
          <p className='active-page' style={{ cursor: 'auto' }}>
            All Guest
          </p>
          <p style={{ cursor: 'auto' }}>Pending</p>
          <p style={{ cursor: 'auto' }}>Booked</p>
          <p style={{ cursor: 'auto' }}>Canceled</p>
          <p style={{ cursor: 'auto' }}>Refund</p>
        </div>
        <div id='buttons-container'>
          <InputSelectInverted
            padding='13px 25px'
            positionArrowY='7px'
            onChange={inputDateSelectHandler}
          >
            {optionsSelect2.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </InputSelectInverted>
          <InputSelect
            padding='13px 25px'
            positionArrowY='7px'
            onChange={inputSelectHandler}
          >
            {optionsSelect1.map((option) => (
              <option key={option.label} value={JSON.stringify(option.value)}>
                {option.label}
              </option>
            ))}
          </InputSelect>
        </div>
      </MenuContainer>
      {fetchStatusAPI === 'loading' ? (
        <h1
          style={{
            textAlign: 'center',
            padding: '100px 0',
            fontSize: '30px',
          }}
        >
          Loading bookings...
        </h1>
      ) : (
        <>
          <TableCard borderRadius='20px'>
            <Table>
              <thead id='card-header'>
                <tr>
                  <th>Guest</th>
                  <th>Order Date</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Special Request</th>
                  <th>Room Type</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: '15px' }}>
                {bookingsListSliced.map((bookings) => (
                  <tr key={bookings.id}>
                    <td>
                      <FlexContainer>
                        <ImgHolder width='40px' height='40px'>
                          <img
                            src={bookings.user.picture}
                            alt={`Avatar from ${bookings.user.name}`}
                          />
                        </ImgHolder>
                        <div>
                          <p>{bookings.user.name}</p>
                          <p style={{ color: '#799283' }}>
                            #{bookings.bookingNumber}
                          </p>
                        </div>
                      </FlexContainer>
                    </td>
                    <td>{dateHandler(bookings.orderDate)}</td>
                    <td>
                      <p>{dateHandler(bookings.checkIn)}</p>
                    </td>
                    <td>
                      <p>{dateHandler(bookings.checkOut)}</p>
                    </td>
                    <td>
                      {bookings.specialRequest ? (
                        <ButtonForRequest
                          onClick={() =>
                            setModalState({
                              title: `Request from ${bookings.user.name}`,
                              message: bookings.specialRequest!,
                            })
                          }
                          padding='10px 25px'
                        >
                          View Notes
                        </ButtonForRequest>
                      ) : (
                        <ButtonForNoRequest padding='10px 25px'>
                          View Notes
                        </ButtonForNoRequest>
                      )}
                    </td>
                    <td>{bookings.roomType}</td>
                    <td>
                      {bookings.status === 'check in' ? (
                        <ButtonStatusGreen
                          onClick={() => singleBookingHandler(bookings.id)}
                          padding='10px 30px'
                        >
                          Booked
                        </ButtonStatusGreen>
                      ) : bookings.status === 'check out' ? (
                        <ButtonStatusRed
                          onClick={() => singleBookingHandler(bookings.id)}
                          padding='10px 31px'
                        >
                          Refund
                        </ButtonStatusRed>
                      ) : (
                        <ButtonStatusYellow
                          onClick={() => singleBookingHandler(bookings.id)}
                          padding='10px 17px'
                        >
                          In progress
                        </ButtonStatusYellow>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableCard>
          <PaginationButtons>
            <p>
              Showing {bookingsListSliced.length} of{' '}
              {Array.isArray(bookingsListRedux) && bookingsListRedux.length}{' '}
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

export default Bookings;
