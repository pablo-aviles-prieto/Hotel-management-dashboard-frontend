import { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
} from '../utils';
import { fetchBookings } from '../store/bookingSlice';
import styled from 'styled-components';
import { Modal } from '../components';
import { reorderHandler } from '../utils';
import bookingsData from '../assets/data/bookings.json';

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
    // value: 'bookingNumber1',
  },
  {
    label: 'Oldest',
    value: { value: 'bookingNumber', sort: 0 },
    // value: 'bookingNumber0',
  },
  {
    label: 'Guest A-Z',
    value: { value: ['user', 'name'], sort: 0 },
  },
  {
    label: 'Guest Z-A',
    value: { value: ['user', 'name'], sort: 1 },
    // value: 'user[name]1',
  },
  // {
  //   label: 'Check in',
  //   value: { value: ['checkIn', 'date'], sort: 0 },
  // },
  // {
  //   label: 'Check out',
  //   value: { value: ['checkIn', 'date'], sort: 1 },
  // },
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
  const [modalState, setModalState] = useState('');
  const [page, setPage] = useState(1);
  const [filteredBookingsList, setFilteredBookingsList] = useState([]);
  const [orderBy, setOderBy] = useState(
    JSON.stringify({ value: 'bookingNumber', sort: 1 })
  );
  // const [orderBy, setOderBy] = useState('bookingNumber1');
  const [bookingsList, setBookingsList] = useState(bookingsData);
  const [bookingsListSliced, setBookingsListSliced] = useState([]);
  const bookingsListRedux = useSelector((state) => state.bookings.bookingsList);
  const statusAPI = useSelector((state) => state.bookings.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchBookings(bookingsData));
  }, [dispatch]);

  useEffect(() => {
    const filteredBookings = [...bookingsListRedux];
    const parsedObj = JSON.parse(orderBy);
    const orderValue = parsedObj.value;
    const orderDirection = parsedObj.sort;
    // const orderValue = JSON.parse(orderBy).replace(/\d+/g, '');
    // const orderDirection = JSON.parse(orderBy).replace(/\D+/g, '');

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
    setModalState('');
  };

  const inputSelectHandler = (e) => {
    setOderBy(e.target.value);
    setPage(1);
  };
  const inputDateSelectHandler = (e) => {
    console.log('option selected =>', e.target.value);
  };

  const singleBookingHandler = (id) => {
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
            positionArrowY='5px'
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
            positionArrowY='5px'
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
      {statusAPI === 'loading' ? (
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
                    <td>{bookings.orderDate}</td>
                    <td>
                      <p>{bookings.checkIn.date}</p>
                      <p>{bookings.checkIn.hour}</p>
                    </td>
                    <td>
                      <p>{bookings.checkOut.date}</p>
                      <p>{bookings.checkOut.hour}</p>
                    </td>
                    <td>
                      {bookings.specialRequest ? (
                        <ButtonForRequest
                          onClick={() =>
                            setModalState({
                              title: `Request from ${bookings.user.name}`,
                              message: bookings.specialRequest,
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
              Showing {bookingsListSliced.length} of {bookingsList.length} Data
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
