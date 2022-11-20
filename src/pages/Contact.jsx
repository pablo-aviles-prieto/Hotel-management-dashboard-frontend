import {
  AlternativeCard,
  ImgHolder,
  InputSelect,
  MenuContainer,
  Table,
  MainCard,
  FlexContainer,
  PaginationButtons,
} from '../components/Styles';
import { Check, XCircle, Star } from '../assets/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { useState, useEffect, useMemo } from 'react';
import {
  paginationDataHandler,
  numberOfPages,
  paginationButtonsHandler,
} from '../utils';
import styled from 'styled-components';
import RightArrowIcon from '../assets/icons/RightArrowLong.svg';
import LeftArrowIcon from '../assets/icons/LeftArrowLong.svg';
import commentsData from '../assets/data/comments.json';

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
        svg {
          margin-left: 10px;
        }
      }
    }
  }
`;

const ArchiveAnchor = styled.a`
  color: #e23428;
  text-decoration: none;
  font-weight: 700;
  &:hover {
    text-decoration: underline;
  }
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
    label: 'Top rated',
    value: 'top rated',
  },
  {
    label: 'Low rated',
    value: 'low rated',
  },
];

const Contact = () => {
  const [page, setPage] = useState(1);
  const [commentsList, setCommentsList] = useState(commentsData);
  const [commentsListSliced, setCommentsListSliced] = useState([]);

  useEffect(() => {
    const arrayToRender = paginationDataHandler(
      commentsList,
      PAGINATION_OFFSET,
      page
    );
    setCommentsListSliced(arrayToRender);
  }, [commentsList, page]);

  const totalPages = useMemo(() => {
    return numberOfPages(commentsList.length, PAGINATION_OFFSET);
  }, [commentsList.length]);

  const inputSelectHandler = (e) => {
    console.log('option selected =>', e.target.value);
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
        <div id='links-container'>
          <a href='#' className='link-active'>
            All Contacts
          </a>
          <a href='#'>Archived</a>
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
      <MainCard borderRadius='20px' style={{ padding: '0', margin: '0 30px' }}>
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
            {commentsListSliced.map((comment) => (
              <tr key={comment.id}>
                <td>#{comment.id}</td>
                <td>{dateHandler(comment.date)}</td>
                <td>
                  <p>{comment.user.name}</p>
                </td>
                <td>
                  <FlexContainer>
                    {[...Array(starsRateToRender(comment.rate))].map((_, i) => (
                      <div key={i}>
                        <Star
                          stroke='transparent'
                          fill='#135846'
                          width='22px'
                          height='22px'
                        />
                      </div>
                    ))}
                  </FlexContainer>
                  <p>{comment.message.body}</p>
                </td>
                <td>
                  <ArchiveAnchor href='#'>Archive</ArchiveAnchor>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </MainCard>
      <PaginationButtons style={{ margin: '50px 30px' }}>
        <p>
          Showing {commentsListSliced.length} of {commentsList.length} Data
        </p>
        <div id='pagination-container'>
          {paginationButtonsHandler(page, totalPages, setPage)}
        </div>
      </PaginationButtons>
    </>
  );
};

export default Contact;
