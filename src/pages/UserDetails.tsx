import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../store/typedHooks';
import { fetchSingleUser, deleteUser } from '../store/userSlice';
import { Phone } from '../assets/icons';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { PulseSpinner } from '../components';
import {
  MainCard,
  ButtonGreen,
  ImgHolder,
  FlexContainer,
} from '../components/Styles';

const RedButton = styled(ButtonGreen)`
  background-color: #e23428;
  margin-left: 10px;
`;

const ColorContainer = styled.div`
  strong {
    color: #135846;
  }
`;

const UserDetails = () => {
  const userRedux = useAppSelector((state) => state.users.usersList);
  const fetchStatusAPI = useAppSelector((state) => state.users.fetchStatus);
  const statusAPI = useAppSelector((state) => state.users.status);
  const errorMessageAPI = useAppSelector((state) => state.users.error);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchSingleUser({ id }));
  }, [dispatch, id]);

  useEffect(() => {
    if (
      errorMessageAPI &&
      (fetchStatusAPI === 'failed' || statusAPI === 'failed')
    ) {
      toast.error(errorMessageAPI);
    }
  }, [errorMessageAPI, fetchStatusAPI, statusAPI]);

  const deleteUserHandler = async () => {
    if (window.confirm('Are you sure you want to delete this user?') === false)
      return;

    if (
      Array.isArray(userRedux)
        ? userRedux[0].email === 'hotel@miranda.com'
        : userRedux.email === 'hotel@miranda.com'
    ) {
      toast.warn(`Can't delete this user. Returning to the users list!`, {
        autoClose: 3000,
        hideProgressBar: true,
      });
      navigate(`/users/`, { replace: true });
      return;
    }

    const result = await dispatch(deleteUser({ id }));

    const hasError = result.meta.requestStatus === 'rejected';
    if (hasError) return;

    toast.success('User deleted successfully');
    navigate('/users/', { replace: true });
  };

  const parsedUsers = useMemo(
    () => (Array.isArray(userRedux) ? userRedux[0] : userRedux),
    [userRedux]
  );

  if (fetchStatusAPI === 'failed') {
    return (
      <h1 style={{ textAlign: 'center', margin: '100px 0', fontSize: '40px' }}>
        We couldn't find the user selected. Please check the ID and if it's
        correct try again later!
      </h1>
    );
  }

  return (
    <MainCard borderRadius='16px'>
      {fetchStatusAPI === 'loading' || statusAPI === 'loading' ? (
        <PulseSpinner isLoading />
      ) : (
        <>
          <h1>User details of {parsedUsers.name}</h1>
          <FlexContainer gap='40px'>
            <ImgHolder
              width='200px'
              height='200px'
              style={{ margin: '50px 0' }}
            >
              <img src={parsedUsers.photo} alt={`Pic of ${parsedUsers.name}`} />
            </ImgHolder>
            <ColorContainer>
              <ul>
                <li>
                  <strong>Full name:</strong> {parsedUsers.name}
                </li>
                <li>
                  <strong>Job position:</strong> {parsedUsers.job.position}
                </li>
                <li>
                  <strong>Job description:</strong>{' '}
                  {parsedUsers.job.description}
                </li>
                <li>
                  <strong>Email:</strong> {parsedUsers.email}
                </li>
                <li style={{ display: 'flex', gap: '10px' }}>
                  <strong>Phone:</strong>{' '}
                  <span
                    style={{
                      display: 'flex',
                      gap: '5px',
                      alignItems: 'center',
                    }}
                  >
                    <Phone width='20px' height='20px' />
                    {parsedUsers.contact}
                  </span>
                </li>
                <li>
                  <strong>Start date:</strong> {parsedUsers.startDate}
                </li>
                <li>
                  <strong>Status:</strong> {parsedUsers.status}
                </li>
              </ul>
            </ColorContainer>
          </FlexContainer>
          <div style={{ marginTop: '50px' }}>
            <ButtonGreen
              padding='10px 52px'
              onClick={() => navigate(`/users/${id}/edit`)}
            >
              Edit user
            </ButtonGreen>
            <RedButton padding='10px 52px' onClick={deleteUserHandler}>
              Delete user
            </RedButton>
          </div>
        </>
      )}
    </MainCard>
  );
};

export default UserDetails;
