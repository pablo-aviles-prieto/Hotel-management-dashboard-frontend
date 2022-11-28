import {
  AlternativeCard,
  ImgHolder,
  InputSelect,
  MenuContainer,
  Table,
  MainCard,
  FlexContainer,
  PaginationButtons,
  ButtonGreen,
} from '../components/Styles';
import { Check, XCircle, Star } from '../assets/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContacts } from '../store/contactSlice';
import { useState, useEffect, useMemo } from 'react';
import {
  paginationDataHandler,
  numberOfPages,
  paginationButtonsHandler,
} from '../utils';
import styled from 'styled-components';
import { reorderHandler } from '../utils';
import RightArrowIcon from '../assets/icons/RightArrowLong.svg';
import LeftArrowIcon from '../assets/icons/LeftArrowLong.svg';

const PAGINATION_OFFSET = 5;

const SliderSection = styled.section`
  .reviews {
    margin: 20px 0;
    &-title {
      font-weight: 700;
      margin-bottom: 20px;
      padding: 0 30px;
    }
    &--flex {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      margin-bottom: 10px;
      transform: scale(1);
    }
    .swiper {
      position: relative;
      padding: 30px;
    }
    .swiper-button-next,
    .swiper-button-prev {
      position: fixed;
      top: 50%;
      width: 40px;
      height: 40px;
      background-color: #135846;
      color: #fff;
      border-radius: 6px;
    }
    .swiper-button-next {
      background-image: url(${RightArrowIcon});
      right: -10px;
    }
    .swiper-button-prev {
      background-image: url(${LeftArrowIcon});
      left: -10px;
    }
    .swiper-button-disabled {
      display: none;
    }
    .swiper-button-next::after {
      content: '';
    }
    .swiper-button-prev::after {
      content: '';
    }
  }
  .slider-container {
    &-content {
      color: ${({ theme }) => theme.greyToWhite};
    }
    &-author {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 40px;
      &-info {
        display: flex;
        align-items: center;
        gap: 20px;
        &--flex {
          #author-name {
            font-weight: 700;
            font-size: 16px;
          }
          #publish-date {
            color: #799283;
            font-size: 14px;
          }
        }
      }
      &-btns {
        cursor: pointer;
        min-width: 80px;
        svg {
          margin-left: 10px;
        }
      }
    }
  }
`;

const ArchiveBtn = styled(ButtonGreen)`
  color: #e23428;
  text-decoration: none;
  background-color: transparent;
  font-weight: 700;
  &:hover {
    text-decoration: underline;
  }
`;

const optionsSelect = [
  {
    label: 'Newest',
    value: 'date1',
  },
  {
    label: 'Oldest',
    value: 'date0',
  },
  {
    label: 'Top rated',
    value: 'rate1',
  },
  {
    label: 'Low rated',
    value: 'rate0',
  },
];

const Contact = () => {
  const [page, setPage] = useState(1);
  const [orderBy, setOderBy] = useState('date1');
  const [internalPage, setInternalPage] = useState('id');
  const [commentsListSliced, setCommentsListSliced] = useState([]);
  const [filteredContactsList, setFilteredContactsList] = useState([]);
  const contactListRedux = useSelector((state) => state.contacts.contactList);
  const statusAPI = useSelector((state) => state.contacts.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log('contactListRedux', contactListRedux);
  console.log('statusAPI', statusAPI);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  useEffect(() => {
    const contactList = [...contactListRedux];
    const orderValue = orderBy.replace(/\d+/g, '');
    const orderDirection = orderBy.replace(/\D+/g, '');

    const filteredContactsPage =
      internalPage === 'id'
        ? contactList
        : contactList.filter((contact) => contact?.archived === true);

    const filteredReorderedContacts = reorderHandler({
      array: filteredContactsPage,
      orderValue,
      orderDirection,
    });

    const arrayToRender = paginationDataHandler(
      filteredReorderedContacts,
      PAGINATION_OFFSET,
      page
    );
    setCommentsListSliced(arrayToRender);
    setFilteredContactsList(filteredReorderedContacts);
  }, [contactListRedux, orderBy, page, internalPage]);

  const totalPages = useMemo(() => {
    return numberOfPages(filteredContactsList.length, PAGINATION_OFFSET);
  }, [filteredContactsList.length]);

  const archiveContactHandler = (id) => {
    console.log('id contact pressed =>', id);
    // Have to update the contact obj and add the archived prop with a true value
  };

  const inputSelectHandler = (e) => {
    setOderBy(e.target.value);
    setPage(1);
  };

  const starsRateToRender = (rate) => Math.ceil(rate / 20);

  const dateHandler = (date) => {
    return new Date(date).toUTCString().replace(/(?<=2022).*$/, '');
  };

  return (
    <>
      <SliderSection id='bottom-container'>
        <div className='reviews'>
          <div className='reviews--flex'>
            <Swiper
              navigation={true}
              modules={[Navigation]}
              className='mySwiper'
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                900: {
                  slidesPerView: 2,
                },
                1200: {
                  slidesPerView: 3,
                },
              }}
            >
              <SwiperSlide>
                <AlternativeCard
                  className='slider-container'
                  borderRadius='16px'
                >
                  <p className='slider-container-content'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam
                  </p>
                  <div className='slider-container-author'>
                    <div className='slider-container-author-info'>
                      <ImgHolder width='56px' height='56px'></ImgHolder>
                      <div className='slider-container-author-info--flex'>
                        <p id='author-name'>Manolito Garcia</p>
                        <p id='publish-date'>4m ago</p>
                      </div>
                    </div>
                    <div className='slider-container-author-btns'>
                      <Check stroke='#5AD07A' width='30px' height='30px' />
                      <XCircle stroke='#E23428' width='30px' height='30px' />
                    </div>
                  </div>
                </AlternativeCard>
              </SwiperSlide>
              <SwiperSlide>
                <AlternativeCard
                  className='slider-container'
                  borderRadius='16px'
                >
                  <p className='slider-container-content'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam
                  </p>
                  <div className='slider-container-author'>
                    <div className='slider-container-author-info'>
                      <ImgHolder width='56px' height='56px'></ImgHolder>
                      <div className='slider-container-author-info--flex'>
                        <p id='author-name'>Manolito Garcia</p>
                        <p id='publish-date'>4m ago</p>
                      </div>
                    </div>
                    <div className='slider-container-author-btns'>
                      <Check stroke='#5AD07A' width='30px' height='30px' />
                      <XCircle stroke='#E23428' width='30px' height='30px' />
                    </div>
                  </div>
                </AlternativeCard>
              </SwiperSlide>
              <SwiperSlide>
                <AlternativeCard
                  className='slider-container'
                  borderRadius='16px'
                >
                  <p className='slider-container-content'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam
                  </p>
                  <div className='slider-container-author'>
                    <div className='slider-container-author-info'>
                      <ImgHolder width='56px' height='56px'></ImgHolder>
                      <div className='slider-container-author-info--flex'>
                        <p id='author-name'>Manolito Garcia</p>
                        <p id='publish-date'>4m ago</p>
                      </div>
                    </div>
                    <div className='slider-container-author-btns'>
                      <Check stroke='#5AD07A' width='30px' height='30px' />
                      <XCircle stroke='#E23428' width='30px' height='30px' />
                    </div>
                  </div>
                </AlternativeCard>
              </SwiperSlide>
              <SwiperSlide>
                <AlternativeCard
                  className='slider-container'
                  borderRadius='16px'
                >
                  <p className='slider-container-content'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam
                  </p>
                  <div className='slider-container-author'>
                    <div className='slider-container-author-info'>
                      <ImgHolder width='56px' height='56px'></ImgHolder>
                      <div className='slider-container-author-info--flex'>
                        <p id='author-name'>Manolito Garcia</p>
                        <p id='publish-date'>4m ago</p>
                      </div>
                    </div>
                    <div className='slider-container-author-btns'>
                      <Check stroke='#5AD07A' width='30px' height='30px' />
                      <XCircle stroke='#E23428' width='30px' height='30px' />
                    </div>
                  </div>
                </AlternativeCard>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </SliderSection>
      <MenuContainer
        style={{ margin: '30px', marginTop: '40px', marginBottom: '50px' }}
      >
        <div id='pages-container'>
          <p
            className={internalPage === 'id' ? 'active-page' : ''}
            onClick={() => setInternalPage('id')}
          >
            All Contacts
          </p>
          <p
            className={internalPage === 'Archived' ? 'active-page' : ''}
            onClick={() => setInternalPage('Archived')}
          >
            Archived
          </p>
        </div>
        <div id='buttons-container'>
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
      {statusAPI === 'loading' ? (
        <h1
          style={{ textAlign: 'center', margin: '100px 0', fontSize: '40px' }}
        >
          Loading contacts...
        </h1>
      ) : (
        <>
          <MainCard
            borderRadius='20px'
            style={{ padding: '0', margin: '0 30px' }}
          >
            <Table>
              <thead id='card-header'>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Comment</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: '15px' }}>
                {commentsListSliced.map((contact) => (
                  <tr key={contact.id}>
                    <td
                      style={{ cursor: 'pointer' }}
                      onClick={() => navigate(`/contacts/${contact.id}`)}
                    >
                      #{contact.id}
                    </td>
                    <td>{dateHandler(contact.date)}</td>
                    <td>
                      <p>{contact.user.name}</p>
                    </td>
                    <td>
                      <FlexContainer>
                        {[...Array(starsRateToRender(contact.rate))].map(
                          (_, i) => (
                            <div key={i}>
                              <Star
                                stroke='transparent'
                                fill='#135846'
                                width='22px'
                                height='22px'
                              />
                            </div>
                          )
                        )}
                      </FlexContainer>
                      <p>{contact.message.body}</p>
                    </td>
                    <td>
                      <ArchiveBtn
                        onClick={() => archiveContactHandler(contact.id)}
                      >
                        Archive
                      </ArchiveBtn>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </MainCard>
          <PaginationButtons style={{ margin: '50px 30px' }}>
            <p>
              Showing {commentsListSliced.length} of {contactListRedux.length}{' '}
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

export default Contact;