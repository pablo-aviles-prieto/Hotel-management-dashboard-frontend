import {
  InputText,
  ButtonGreen,
  InputSelect,
  MainCard,
} from '../components/Styles';
import React, { useState, useContext } from 'react';
import { useAppDispatch, useAppSelector } from '../store/typedHooks';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../store/userSlice';
import styled from 'styled-components';
import { AuthContext } from '../store/authContext';

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

const API_URI = process.env.REACT_APP_API_URI;

const NewUser = () => {
  const [userPhotoInput, setUserPhotoInput] = useState<
    FileList | FileList[] | null
  >([]);
  const [userNameInput, setUserNameInput] = useState('');
  const [userJobSelect, setUserJobSelect] = useState('Manager');
  const [userEmailInput, setUserEmailInput] = useState('');
  const [userPasswordInput, setUserPasswordInput] = useState('');
  const [userPhoneInput, setUserPhoneInput] = useState('');
  const [userStatusSelect, setUserStatusSelect] = useState('Active');
  const usersListRedux = useAppSelector((state) => state.users.usersList);
  const statusAPI = useAppSelector((state) => state.users.status);
  const { authStatus } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const objToSave = {
      photo:
        'https://www.pngkey.com/png/detail/308-3081138_contact-avatar-generic.png',
      //   photo: userPhotoInput,
      name: userNameInput,
      job: { position: userJobSelect },
      email: userEmailInput,
      password: userPasswordInput,
      contact: userPhoneInput,
      startDate: new Date().toLocaleDateString(),
      status: userStatusSelect,
    };

    if (
      !userNameInput.trim() ||
      !userEmailInput.trim() ||
      !userPasswordInput.trim() ||
      !userPhoneInput.trim()
    ) {
      return alert('Please, fill all the required inputs');
    }

    const result = await dispatch(
      createUser({
        url: new URL(`${API_URI}/users`),
        fetchObjProps: {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${authStatus.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(objToSave),
        },
      })
    );

    const hasError = result.meta.requestStatus === 'rejected';
    if (hasError) {
      alert('Error creating the user');
      return;
    }
    navigate('/users', { replace: true });
  };

  if (statusAPI === 'loading') return <h1>Saving user data...</h1>;

  return (
    <MainCard borderRadius='16px'>
      <h1>Create new user</h1>
      <StyledForm onSubmit={submitHandler}>
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
          <StyledLabel htmlFor='user-images'>
            Upload image<span style={{ color: 'red' }}>*</span>{' '}
          </StyledLabel>
          <input
            type='file'
            id='user-images'
            onChange={(e) => setUserPhotoInput(e.target.files)}
            accept='image/jpg,image/png'
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
          <StyledLabel htmlFor='user-password'>
            Password<span style={{ color: 'red' }}>*</span>
          </StyledLabel>
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
          <StyledLabel htmlFor='user-contact'>
            Contact number<span style={{ color: 'red' }}>*</span>
          </StyledLabel>
          <InputText
            borderRadius='4px'
            padding='5px'
            name='user-contact'
            placeholder='contact number...'
            value={userPhoneInput}
            id='user-contact'
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
              minWidth: '175px',
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
          <StyledLabel htmlFor='user-status'>
            Status<span style={{ color: 'red' }}>*</span>
          </StyledLabel>
          <InputSelect
            style={{
              borderRadius: '4px',
              paddingRight: '62px',
              fontWeight: '400',
              minWidth: '175px',
            }}
            id='user-status'
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
        <div style={{ marginTop: '25px' }}>
          <ButtonGreen padding='10px 52px' type='submit'>
            Save user
          </ButtonGreen>
        </div>
      </StyledForm>
    </MainCard>
  );
};

export default NewUser;
