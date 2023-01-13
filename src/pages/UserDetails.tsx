import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../store/typedHooks';
import { fetchSingleUser, deleteUser } from '../store/userSlice';
import styled from 'styled-components';
import { MainCard, ButtonGreen, ImgHolder } from '../components/Styles';

const RedButton = styled(ButtonGreen)`
  background-color: rgb(226, 52, 40);
  margin-left: 10px;
`;

const UserDetails = () => {
  const userRedux = useAppSelector((state) => state.users.usersList);
  const fetchStatusAPI = useAppSelector((state) => state.users.fetchStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    dispatch(fetchSingleUser({ id }));
  }, [dispatch, id]);

  const deleteUserHandler = async () => {
    if (window.confirm('Are you sure you want to delete this user?') === false)
      return;

    if (
      Array.isArray(userRedux)
        ? userRedux[0].email === 'hotel@miranda.com'
        : userRedux.email === 'hotel@miranda.com'
    ) {
      alert(
        `Can't delete this user (sometimes life give you lemons). Returning to the users list!`
      );
      return navigate(`/users/`, { replace: true });
    }

    const result = await dispatch(deleteUser({ id }));

    const hasError = result.meta.requestStatus === 'rejected';
    if (hasError) {
      alert('ID provided is not valid!');
      return;
    }
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
      {fetchStatusAPI === 'loading' ? (
        <h1
          style={{ textAlign: 'center', margin: '100px 0', fontSize: '40px' }}
        >
          Loading user {id}...
        </h1>
      ) : (
        <>
          <h1>User details for {id}</h1>
          <ImgHolder width='200px' height='200px' style={{ margin: '50px 0' }}>
            <img src={parsedUsers.photo} alt={`Pic of ${parsedUsers.name}`} />
          </ImgHolder>
          <ul>
            <li>Full name: {parsedUsers.name}</li>
            <li>Job position: {parsedUsers.job.position}</li>
            <li>Job description: {parsedUsers.job.description}</li>
            <li>Email: {parsedUsers.email}</li>
            <li>Phone: {parsedUsers.contact}</li>
            <li>Start date: {parsedUsers.startDate}</li>
            <li>Status: {parsedUsers.status}</li>
          </ul>
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
