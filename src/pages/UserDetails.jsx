import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleUser, deleteUser } from '../store/userSlice';
import styled from 'styled-components';
import { MainCard, ButtonGreen, ImgHolder } from '../components/Styles';
import usersData from '../assets/data/users.json';

const RedButton = styled(ButtonGreen)`
  background-color: rgb(226, 52, 40);
  margin-left: 10px;
`;

const UserDetails = () => {
  const userRedux = useSelector((state) => state.users.usersList);
  const statusAPI = useSelector((state) => state.users.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  // console.log('statusAPI', statusAPI);
  console.log('userRedux', userRedux);

  useEffect(() => {
    const filteredUser = usersData.filter((user) => user.id === +id);
    dispatch(fetchSingleUser(filteredUser));
  }, [dispatch, id]);

  const deleteRoomHandler = () => {
    if (window.confirm('Are you sure you want to delete this room?') === false)
      return;

    dispatch(deleteUser({ usersList: usersData, id: +id }));
    navigate('/users/', { replace: true });
  };

  if (statusAPI === 'loading')
    return (
      <h1 style={{ textAlign: 'center', margin: '100px 0', fontSize: '40px' }}>
        Loading user...
      </h1>
    );

  if (userRedux.length === 0)
    return (
      <h1>
        We couldn't find the room selected. Please check the ID and if it's
        correct try again later!
      </h1>
    );

  return (
    <MainCard borderRadius='16px'>
      <h1>Room details for {id}</h1>
      <ImgHolder width='200px' height='200px' style={{ margin: '50px 0' }}>
        <img src={userRedux[0].photo} alt={`Pic of ${userRedux[0].name}`} />
      </ImgHolder>
      <ul>
        <li>Full name: {userRedux[0].name}</li>
        <li>Job position: {userRedux[0].job.position}</li>
        <li>Job description: {userRedux[0].job.description}</li>
        <li>Email: {userRedux[0].email}</li>
        <li>Phone: {userRedux[0].contact}</li>
        <li>Start date: {userRedux[0].startDate}</li>
        <li>Status: {userRedux[0].status}</li>
      </ul>
      <div style={{ marginTop: '50px' }}>
        <ButtonGreen
          padding='10px 52px'
          onClick={() => navigate(`/users/${id}/edit`)}
        >
          Edit user
        </ButtonGreen>
        <RedButton padding='10px 52px' onClick={deleteRoomHandler}>
          Delete user
        </RedButton>
      </div>
    </MainCard>
  );
};

export default UserDetails;
