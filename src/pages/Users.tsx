import React, { useEffect, useMemo, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Phone } from '../assets/icons';
import {
  FlexContainer,
  ImgHolder,
  InputSelect,
  InputText,
  MainCard,
  MenuContainer,
  PaginationButtons,
  Table,
} from '../components/Styles';
import { useAppDispatch, useAppSelector } from '../store/typedHooks';
import { fetchUsers, IUserObj } from '../store/userSlice';
import {
  numberOfPages,
  paginationButtonsHandler,
  paginationDataHandler,
  reorderHandler,
  dateHandler,
} from '../utils';
import { AuthContext } from '../store/authContext';

const PAGINATION_OFFSET = 10;

const StyledParagraph = styled.p`
  font-size: 14px;
  line-height: 22px;
  color: ${({ theme }) => theme.darkGreyToLightGrey};
`;

const optionsSelect = [
  {
    label: 'Newest',
    value: 'startDate1',
  },
  {
    label: 'Oldest',
    value: 'startDate0',
  },
  {
    label: 'From A-Z',
    value: 'name0',
  },
  {
    label: 'From Z-A',
    value: 'name1',
  },
];

const API_URI = process.env.REACT_APP_API_URI;

const Users = () => {
  const [searchInput, setSearchInput] = useState('');
  const [page, setPage] = useState(1);
  const [orderBy, setOderBy] = useState('startDate1');
  const [internalPage, setInternalPage] = useState('id');
  const [usersListSliced, setUsersListSliced] = useState<IUserObj[]>([]);
  const [filteredUsersList, setFilteredUsersList] = useState<IUserObj[]>([]);
  const usersListRedux = useAppSelector((state) => state.users.usersList);
  const fetchStatusAPI = useAppSelector((state) => state.users.fetchStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { authStatus } = useContext(AuthContext);

  useEffect(() => {
    dispatch(
      fetchUsers({
        url: new URL(`${API_URI}/users`),
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

    const usersList = Array.isArray(usersListRedux)
      ? [...usersListRedux]
      : [usersListRedux];
    const orderValue = orderBy.replace(/\d+/g, '');
    const orderDirection = orderBy.replace(/\D+/g, '');

    const filteredUsers = usersList.filter((user) =>
      user.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    const filteredUsersPage =
      internalPage === 'id'
        ? filteredUsers
        : filteredUsers.filter((user) => user.status === internalPage);

    const filteredReorderedUsers = reorderHandler({
      array: filteredUsersPage,
      orderValue,
      orderDirection,
    });

    const arrayToRender = paginationDataHandler(
      filteredReorderedUsers,
      PAGINATION_OFFSET,
      page
    );
    setUsersListSliced(arrayToRender);
    setFilteredUsersList(filteredReorderedUsers);
  }, [usersListRedux, orderBy, page, searchInput, internalPage]);

  const totalPages = useMemo(() => {
    return numberOfPages(filteredUsersList.length, PAGINATION_OFFSET);
  }, [filteredUsersList.length]);

  const inputSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOderBy(e.target.value);
    setPage(1);
  };

  return (
    <>
      <MenuContainer style={{ marginBottom: '50px' }}>
        <div id='pages-container'>
          <p
            className={internalPage === 'id' ? 'active-page' : ''}
            onClick={() => setInternalPage('id')}
          >
            All Employee
          </p>
          <p
            className={internalPage === 'Active' ? 'active-page' : ''}
            onClick={() => setInternalPage('Active')}
          >
            Active Employee
          </p>
          <p
            className={internalPage === 'Inactive' ? 'active-page' : ''}
            onClick={() => setInternalPage('Inactive')}
          >
            Inactive Employee
          </p>
        </div>
        <div id='buttons-container'>
          <InputText
            style={{ marginRight: '20px' }}
            borderRadius='8px'
            padding='10px'
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
      {fetchStatusAPI === 'loading' ? (
        <h1
          style={{ textAlign: 'center', margin: '100px 0', fontSize: '40px' }}
        >
          Loading users...
        </h1>
      ) : (
        <>
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
                      <p
                        onClick={() => navigate(`/users/${user.id}`)}
                        style={{ fontWeight: '700', cursor: 'pointer' }}
                      >
                        <span
                          style={{
                            color:
                              user.status === 'Active' ? '#5AD07A' : '#E23428',
                          }}
                        >
                          {user.status}
                        </span>
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </MainCard>
          <PaginationButtons style={{ margin: '50px 0' }}>
            <p>
              Showing {usersListSliced.length} of {filteredUsersList.length}{' '}
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

export default Users;
