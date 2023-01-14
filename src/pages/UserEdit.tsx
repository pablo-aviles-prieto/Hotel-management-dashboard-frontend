import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/typedHooks';
import { useNavigate, useParams } from 'react-router-dom';
import {
  MainCard,
  InputSelect,
  InputText,
  ButtonGreen,
  ImgHolder,
} from '../components/Styles';
import { updateUser, fetchSingleUser } from '../store/userSlice';
import styled from 'styled-components';

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
  const [userPhotoInput, setUserPhotoInput] = useState<
    FileList | FileList[] | null
  >([]);
  const [userNameInput, setUserNameInput] = useState('');
  const [jobPosition, setJobPosition] = useState('Manager');
  const [jobDescription, setJobDescription] = useState('');
  const [jobSchedule, setJobSchedule] = useState('');
  const [userEmailInput, setUserEmailInput] = useState('');
  const [userPasswordInput, setUserPasswordInput] = useState('');
  const [userPhoneInput, setUserPhoneInput] = useState('');
  const [userStatusSelect, setUserStatusSelect] = useState('Active');
  const usersListRedux = useAppSelector((state) => state.users.usersList);
  const fetchStatusAPI = useAppSelector((state) => state.users.fetchStatus);
  const errorMessageAPI = useAppSelector((state) => state.users.error);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    dispatch(fetchSingleUser({ id }));
  }, [dispatch, id]);

  useEffect(() => {
    if (errorMessageAPI && fetchStatusAPI === 'failed') {
      alert(errorMessageAPI);
    }
  }, [errorMessageAPI, fetchStatusAPI]);

  useEffect(() => {
    if (fetchStatusAPI !== 'idle') return;

    const parsedUsers = Array.isArray(usersListRedux)
      ? usersListRedux[0]
      : usersListRedux;

    if (parsedUsers.email === 'hotel@miranda.com') {
      alert(
        `This user is only editable by the CREATOR. Returning back to the user list!`
      );
      return navigate(`/users/`, { replace: true });
    }

    setUserNameInput(parsedUsers.name);
    setJobPosition(parsedUsers.job.position ? parsedUsers.job.position : '');
    setJobDescription(
      parsedUsers.job.description ? parsedUsers.job.description : ''
    );
    setJobSchedule(parsedUsers.job.schedule ? parsedUsers.job.schedule : '');
    setUserEmailInput(parsedUsers.email);
    setUserPhoneInput(parsedUsers.contact);
    setUserStatusSelect(parsedUsers.status);
  }, [usersListRedux, fetchStatusAPI]);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !userNameInput.trim() ||
      !userEmailInput.trim() ||
      !userPhoneInput.trim()
    ) {
      return alert('Please, fill all the required inputs');
    }

    const objToUpdate = {
      //   photo: userPhotoInput,
      name: userNameInput,
      job: {
        position: jobPosition,
        description: jobDescription,
        schedule: jobSchedule,
      },
      email: userEmailInput,
      password: userPasswordInput ? userPasswordInput : null,
      contact: userPhoneInput,
      status: userStatusSelect,
    };

    const result = await dispatch(updateUser({ id, objToUpdate }));

    const hasError = result.meta.requestStatus === 'rejected';
    if (hasError) return;

    navigate(`/users/${id}`, { replace: true });
  };

  if (
    fetchStatusAPI === 'failed' &&
    errorMessageAPI?.includes('Error getting the user')
  ) {
    return (
      <h1 style={{ textAlign: 'center', margin: '100px 0', fontSize: '40px' }}>
        Problem fetching the user. Check the ID!
      </h1>
    );
  }

  if (fetchStatusAPI === 'loading') {
    return (
      <h1 style={{ textAlign: 'center', margin: '100px 0', fontSize: '40px' }}>
        Editing user...
      </h1>
    );
  }

  return (
    <MainCard borderRadius='16px'>
      <h1>Editing user {id}</h1>
      <StyledForm onSubmit={submitHandler}>
        <ImgHolder width='200px' height='200px' style={{ margin: '50px 0' }}>
          <img
            src={
              !Array.isArray(usersListRedux)
                ? usersListRedux.photo
                : usersListRedux[0].photo
            }
            alt={`Pic of ${
              !Array.isArray(usersListRedux)
                ? usersListRedux.name
                : usersListRedux[0].name
            }`}
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
          <StyledLabel htmlFor='user-name'>Name</StyledLabel>
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
          <StyledLabel htmlFor='user-email'>Email</StyledLabel>
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
          <StyledLabel htmlFor='user-phone'>Contact number</StyledLabel>
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
          <StyledLabel htmlFor='user-job-position'>Job position</StyledLabel>
          <InputSelect
            style={{
              borderRadius: '4px',
              paddingRight: '62px',
              fontWeight: '400',
            }}
            id='user-job-position'
            padding='8px 5px'
            positionArrowY='0'
            value={jobPosition}
            onChange={(e) => setJobPosition(e.target.value)}
          >
            {userJobPositionOptions.map((option) => (
              <option key={option.label} value={option.label}>
                {option.label}
              </option>
            ))}
          </InputSelect>
        </div>
        <div>
          <StyledLabel htmlFor='user-job-description'>
            Job Description
          </StyledLabel>
          <InputText
            borderRadius='4px'
            padding='5px'
            name='user-job-description'
            placeholder='job description...'
            value={jobDescription}
            id='user-job-description'
            type='text'
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>
        <div>
          <StyledLabel htmlFor='user-job-schedule'>Job Schedule</StyledLabel>
          <InputText
            borderRadius='4px'
            padding='5px'
            name='user-job-schedule'
            placeholder='job schedule...'
            value={jobSchedule}
            id='user-job-schedule'
            type='text'
            onChange={(e) => setJobSchedule(e.target.value)}
          />
        </div>
        <div>
          <StyledLabel htmlFor='user-job-position'>Status</StyledLabel>
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
