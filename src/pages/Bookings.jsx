import { useState, useEffect, useMemo } from 'react';
import {
  MenuContainer,
  MainCard,
  InputSelect,
  Table,
  ImgHolder,
  ButtonSidebar,
  PaginationButtons,
  FlexContainer
} from '../components/Styles';
import {
  paginationDataHandler,
  numberOfPages,
  paginationButtonsHandler,
} from '../utils';
import styled from 'styled-components';
import { Modal } from '../components';
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
    value: 'newest',
  },
  {
    label: 'Guest',
    value: 'guest',
  },
  {
    label: 'Check in',
    value: 'check in',
  },
  {
    label: 'Check out',
    value: 'check out',
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
  const [modalState, setModalState] = useState('');
  const [page, setPage] = useState(1);
  const [bookingsList, setBookingsList] = useState(bookingsData);
  const [bookingsListSliced, setbookingsListSliced] = useState([]);

  useEffect(() => {
    const arrayToRender = paginationDataHandler(
      bookingsList,
      PAGINATION_OFFSET,
      page
    );
    setbookingsListSliced(arrayToRender);
  }, [bookingsList, page]);

  const totalPages = useMemo(() => {
    return numberOfPages(bookingsList.length, PAGINATION_OFFSET);
  }, [bookingsList.length]);

  const closeModalHandler = () => {
    setModalState('');
  };

  const inputSelectHandler = (e) => {
    console.log('option selected =>', e.target.value);
  };
  const inputDateSelectHandler = (e) => {
    console.log('option selected =>', e.target.value);
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
        <div id='links-container'>
          <a href='#' className='link-active'>
            All Guest
          </a>
          <a href='#'>Pending</a>
          <a href='#'>Booked</a>
          <a href='#'>Canceled</a>
          <a href='#'>Refund</a>
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
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </InputSelect>
        </div>
      </MenuContainer>
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
                    <ButtonStatusGreen padding='10px 30px'>
                      Booked
                    </ButtonStatusGreen>
                  ) : bookings.status === 'check out' ? (
                    <ButtonStatusRed padding='10px 31px'>
                      Refund
                    </ButtonStatusRed>
                  ) : (
                    <ButtonStatusYellow padding='10px 17px'>
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
  );
};

export default Bookings;
