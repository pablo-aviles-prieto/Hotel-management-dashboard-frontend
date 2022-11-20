import {
  AlternativeCard,
  ImgHolder,
  InputSelect,
  InputText,
  MenuContainer,
  Table,
  MainCard,
  FlexContainer,
  PaginationButtons,
} from '../components/Styles';
import { Navigation } from 'swiper';
import { useState, useEffect, useMemo } from 'react';
import { Phone } from '../assets/icons';
import {
  paginationDataHandler,
  numberOfPages,
  paginationButtonsHandler,
  reorderByOldestDate,
} from '../utils';
import styled from 'styled-components';
import RightArrowIcon from '../assets/icons/RightArrowLong.svg';
import LeftArrowIcon from '../assets/icons/LeftArrowLong.svg';
import usersData from '../assets/data/users.json';

const PAGINATION_OFFSET = 10;

const StyledParagraph = styled.p`
  font-size: 14px;
  line-height: 22px;
  color: ${({ theme }) => theme.darkGreyToLightGrey};
`;

const optionsSelect = [
  {
    label: 'Oldest',
    value: 'oldest',
  },
  {
    label: 'Newest',
    value: 'newest',
  },
  {
    label: 'From A-Z',
    value: 'alphabet a-z',
  },
  {
    label: 'From Z-A',
    value: 'alphabet z-a',
  },
];

const Users = () => {
  const [searchInput, setSearchInput] = useState('');
  const [page, setPage] = useState(1);
  const [usersList, setUsersList] = useState(usersData);
  const [usersListSliced, setUsersListSliced] = useState([]);

  useEffect(() => {
    const newArr = reorderByOldestDate(usersList);
    const arrayToRender = paginationDataHandler(
      newArr,
      PAGINATION_OFFSET,
      page
    );
    setUsersListSliced(arrayToRender);
  }, [usersList, page]);

  const totalPages = useMemo(() => {
    return numberOfPages(usersList.length, PAGINATION_OFFSET);
  }, [usersList.length]);

  const inputSelectHandler = (e) => {
    console.log('option selected =>', e.target.value);
  };

  const dateHandler = (date) => {
    return new Date(date).toUTCString().replace(/(?<=2022).*$/, '');
  };

  return (
    <>
      <MenuContainer style={{ marginBottom: '50px' }}>
        <div id='links-container'>
          <a href='#' className='link-active'>
            All Employee
          </a>
          <a href='#'>Active Employee</a>
          <a href='#'>Inactive Employee</a>
        </div>
        <div id='buttons-container'>
          <InputText
            style={{ marginRight: '20px' }}
            padding='10px 10px'
            type='text'
            id='search-user'
            placeholder='Search user...'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
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
      <MainCard borderRadius='20px' style={{ padding: '0' }}>
        <Table>
          <thead id='card-header'>
            <tr>
              <th style={{ width: '320px' }}>Name</th>
              <th>Job Desk</th>
              <th style={{ width: '200px' }}>Schedule</th>
              <th style={{ width: '200px' }}>Contact</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody style={{ fontSize: '15px' }}>
            {usersListSliced.map((user) => (
              <tr key={user.id}>
                <td>
                  <FlexContainer>
                    <ImgHolder width=' 80px' height='80px'>
                      <img src={user.photo} alt={user.name} />
                    </ImgHolder>
                    <div>
                      <p style={{ fontWeight: '700' }}>{user.name}</p>
                      <StyledParagraph>#{user.id}</StyledParagraph>
                      <StyledParagraph>
                        Joined on {dateHandler(user.startDate)}
                      </StyledParagraph>
                    </div>
                  </FlexContainer>
                </td>
                <td>{user.job.description}</td>
                <td>
                  <p style={{ fontWeight: '700' }}>{user.job.schedule}</p>
                  <p style={{ color: '#135846' }}>Check schedule</p>
                </td>
                <td>
                  <FlexContainer>
                    <Phone width='20px' height='20px' />
                    <p style={{ fontWeight: '700' }}>{user.contact}</p>
                  </FlexContainer>
                </td>
                <td>
                  <p style={{ fontWeight: '700' }}>
                    {user.status ? (
                      <span style={{ color: '#5AD07A' }}>Active</span>
                    ) : (
                      <span style={{ color: '#E23428' }}>Inactive</span>
                    )}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </MainCard>
      <PaginationButtons style={{ margin: '50px 0' }}>
        <p>
          Showing {usersListSliced.length} of {usersList.length} Data
        </p>
        <div id='pagination-container'>
          {paginationButtonsHandler(page, totalPages, setPage)}
        </div>
      </PaginationButtons>
    </>
  );
};

export default Users;
