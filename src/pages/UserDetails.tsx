import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../store/typedHooks';
import { fetchSingleUser, deleteUser } from '../store/userSlice';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { PulseSpinner } from '../components';
import { MainCard, ButtonGreen, ImgHolder } from '../components/Styles';

const RedButton = styled(ButtonGreen)`
  background-color: rgb(226, 52, 40);
  margin-left: 10px;
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
      return navigate(`/users/`, { replace: true });
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
        <PulseSpinner isLoading={true} />
      ) : (
        <>
          <h1>User details of {parsedUsers.name}</h1>
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
