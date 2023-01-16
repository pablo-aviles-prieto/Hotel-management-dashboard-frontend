import {
  AlternativeCard,
  ImgHolder,
  InputSelect,
  MenuContainer,
  Table,
  MainCard,
  PaginationButtons,
  ButtonGreen,
} from '../components/Styles';
import { AuthContext } from '../store/authContext';
import { Check, XCircle } from '../assets/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/typedHooks';
import { fetchContacts, IContactObj } from '../store/contactSlice';
import React, { useState, useEffect, useMemo, useContext } from 'react';
import { PulseSpinner } from '../components';
import {
  paginationDataHandler,
  numberOfPages,
  paginationButtonsHandler,
  dateHandler,
} from '../utils';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { reorderHandler } from '../utils';

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
      background-image: url("data:image/svg+xml;utf8,<svg class='w-6 h-6' fill='none' stroke='white' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M14 5l7 7m0 0l-7 7m7-7H3'></path></svg>");
      right: -10px;
    }
    .swiper-button-prev {
      background-image: url("data:image/svg+xml;utf8,<svg class='w-6 h-6' fill='none' stroke='white' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M10 19l-7-7m0 0l7-7m-7 7h18'></path></svg>");
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
  // {
  //   label: 'Top rated',
  //   value: 'rate1',
  // },
  // {
  //   label: 'Low rated',
  //   value: 'rate0',
  // },
];

const API_URI = process.env.REACT_APP_API_URI;

const Contact = () => {
  const [page, setPage] = useState(1);
  const [orderBy, setOderBy] = useState('date1');
  const [pageFilteredBy, setPageFilteredBy] = useState('id');
  const [commentsListSliced, setCommentsListSliced] = useState<IContactObj[]>(
    []
  );
  const [filteredContactsList, setFilteredContactsList] = useState<
    IContactObj[]
  >([]);
  const contactListRedux = useAppSelector(
    (state) => state.contacts.contactList
  );
  const fetchStatusAPI = useAppSelector((state) => state.contacts.statusPost);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { authStatus } = useContext(AuthContext);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  useEffect(() => {
    if (fetchStatusAPI !== 'idle') return;

    const contactList = Array.isArray(contactListRedux)
      ? [...contactListRedux]
      : [contactListRedux];
    const orderValue = orderBy.replace(/\d+/g, '');
    const orderDirection = orderBy.replace(/\D+/g, '');

    const filteredContactsPage =
      pageFilteredBy === 'id'
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
  }, [contactListRedux, orderBy, page, pageFilteredBy, fetchStatusAPI]);

  const totalPages = useMemo(() => {
    return numberOfPages(filteredContactsList.length, PAGINATION_OFFSET);
  }, [filteredContactsList.length]);

  const archiveContactHandler = async (id: string) => {
    const res = await fetch(`${API_URI}/contacts/${id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${authStatus.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ archived: true }),
    });
    if (res.ok) {
      toast.success('Contact archived correctly', {
        hideProgressBar: true,
      });
    } else {
      toast.error('There was an error archiving the contact, try again later!');
    }
  };

  const inputSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOderBy(e.target.value);
    setPage(1);
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
            className={pageFilteredBy === 'id' ? 'active-page' : ''}
            onClick={() => {
              setPageFilteredBy('id');
              setPage(1);
            }}
          >
            All Contacts
          </p>
          <p
            className={pageFilteredBy === 'Archived' ? 'active-page' : ''}
            onClick={() => {
              setPageFilteredBy('Archived');
              setPage(1);
            }}
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
      {fetchStatusAPI === 'loading' ? (
        <PulseSpinner isLoading={true} />
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
                      #
                      {contact.id.substring(
                        contact.id.length - 7,
                        contact.id.length
                      )}
                    </td>
                    <td>{dateHandler(contact.date)}</td>
                    <td>
                      <p>{contact.user.name}</p>
                    </td>
                    <td>
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
              Showing {commentsListSliced.length} of{' '}
              {filteredContactsList.length} Contacts
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
