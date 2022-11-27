import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  MainCard,
  InputSelect,
  InputText,
  ButtonGreen,
  ImgHolder,
} from '../components/Styles';
import { updateUser } from '../store/userSlice';
import styled from 'styled-components';
import usersData from '../assets/data/users.json';

const StyledForm = styled.form`
  div {
    margin-bottom: 10px;
  }
  label {
    display: block;
  }
`;

const StyledLabel = styled.label`
  color: ${({ theme }) => theme.darkGreyToLightGrey};
`;

const userJobPositionOptions = [
  {
    label: 'Manager',
  },
  {
    label: 'Receptionist',
  },
  {
    label: 'Room service',
  },
];

const userStatusOptions = [
  {
    label: 'Active',
  },
  {
    label: 'Inactive',
  },
];

const UserEdit = () => {
  const [userPhotoInput, setUserPhotoInput] = useState([]);
  const [userNameInput, setUserNameInput] = useState('');
  const [userJobSelect, setUserJobSelect] = useState('Manager');
  const [userEmailInput, setUserEmailInput] = useState('');
  const [userPasswordInput, setUserPasswordInput] = useState('');
  const [userPhoneInput, setUserPhoneInput] = useState('');
  const [userStatusSelect, setUserStatusSelect] = useState('Active');
  const usersListRedux = useSelector((state) => state.users.usersList);
  const statusAPI = useSelector((state) => state.users.status);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;

  console.log('usersListRedux', usersListRedux);

  useEffect(() => {
    setUserNameInput(usersListRedux[0].name);
    setUserJobSelect(usersListRedux[0].job.position);
    setUserEmailInput(usersListRedux[0].email);
    // setUserPasswordInput(usersListRedux[0].ratePerNight);
    setUserPhoneInput(usersListRedux[0].contact);
    setUserStatusSelect(usersListRedux[0].status);
  }, [usersListRedux]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      !userNameInput.trim() ||
      !userEmailInput.trim() ||
      !userPhoneInput.trim()
    ) {
      return alert('Please, fill all the required inputs');
    }

    const objToUpdate = {
      id: +id,
      //   photo: userPhotoInput,
      name: userNameInput,
      job: { position: userJobSelect },
      email: userEmailInput,
      // password: userPasswordInput,
      contact: userPhoneInput,
      status: userStatusSelect,
    };

    dispatch(updateUser({ usersList: usersData, objToUpdate }));
    navigate(`/users/${id}`, { replace: true });
  };

  if (statusAPI === 'loading')
    return (
      <h1 style={{ textAlign: 'center', margin: '100px 0', fontSize: '40px' }}>
        Editing user...
      </h1>
    );

  return (
    <MainCard borderRadius='16px'>
      <h1>Editing user {id}</h1>
      <StyledForm onSubmit={submitHandler}>
        <ImgHolder width='200px' height='200px' style={{ margin: '50px 0' }}>
          <img
            src={usersListRedux[0].photo}
            alt={`Pic of ${usersListRedux[0].name}`}
          />
        </ImgHolder>
        <div>
          <StyledLabel htmlFor='user-images'>Upload images</StyledLabel>
          <input
            type='file'
            id='user-images'
            onChange={(e) => setUserPhotoInput(e.target.files)}
            accept='image/jpg,image/png'
          />
        </div>
        <div>
          <StyledLabel htmlFor='user-name'>
            Name<span style={{ color: 'red' }}>*</span>
          </StyledLabel>
          <InputText
            borderRadius='4px'
            padding='5px'
            name='user-name'
            placeholder='name...'
            value={userNameInput}
            id='user-name'
            type='text'
            onChange={(e) => setUserNameInput(e.target.value)}
          />
        </div>
        <div>
          <StyledLabel htmlFor='user-email'>
            Email<span style={{ color: 'red' }}>*</span>
          </StyledLabel>
          <InputText
            borderRadius='4px'
            padding='5px'
            name='user-email'
            placeholder='email...'
            value={userEmailInput}
            id='user-email'
            type='email'
            onChange={(e) => setUserEmailInput(e.target.value)}
          />
        </div>
        <div>
          <StyledLabel htmlFor='user-password'>Password</StyledLabel>
          <InputText
            borderRadius='4px'
            padding='5px'
            name='user-password'
            placeholder='password...'
            value={userPasswordInput}
            id='user-password'
            type='password'
            onChange={(e) => setUserPasswordInput(e.target.value)}
          />
        </div>
        <div>
          <StyledLabel htmlFor='user-phone'>
            Contact number<span style={{ color: 'red' }}>*</span>
          </StyledLabel>
          <InputText
            borderRadius='4px'
            padding='5px'
            name='user-phone'
            placeholder='contact number...'
            value={userPhoneInput}
            id='user-phone'
            type='text'
            onChange={(e) => setUserPhoneInput(e.target.value)}
          />
        </div>
        <div>
          <StyledLabel htmlFor='user-job-position'>
            Job position<span style={{ color: 'red' }}>*</span>
          </StyledLabel>
          <InputSelect
            style={{
              borderRadius: '4px',
              paddingRight: '62px',
              fontWeight: '400',
            }}
            id='user-job-position'
            padding='8px 5px'
            positionArrowY='0'
            value={userJobSelect}
            onChange={(e) => setUserJobSelect(e.target.value)}
          >
            {userJobPositionOptions.map((option) => (
              <option key={option.label} value={option.label}>
                {option.label}
              </option>
            ))}
          </InputSelect>
        </div>
        <div>
          <StyledLabel htmlFor='user-job-position'>
            Status<span style={{ color: 'red' }}>*</span>
          </StyledLabel>
          <InputSelect
            style={{
              borderRadius: '4px',
              paddingRight: '62px',
              fontWeight: '400',
            }}
            id='user-job-position'
            padding='8px 5px'
            positionArrowY='0'
            value={userStatusSelect}
            onChange={(e) => setUserStatusSelect(e.target.value)}
          >
            {userStatusOptions.map((option) => (
              <option key={option.label} value={option.label}>
                {option.label}
              </option>
            ))}
          </InputSelect>
        </div>
        <div>
          <ButtonGreen padding='10px 52px' type='submit'>
            Save user
          </ButtonGreen>
        </div>
      </StyledForm>
    </MainCard>
  );
};

export default UserEdit;
