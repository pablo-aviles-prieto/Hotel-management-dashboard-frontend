import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/typedHooks';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PulseSpinner } from '../components';
import {
  InputText,
  ButtonGreen,
  InputSelect,
  MainCard,
  StyledForm,
  StyledLabel,
} from '../components/Styles';
import { IUserData } from '../interfaces/IUserData';
import { createUser } from '../store/userSlice';

interface IUserJobData {
  position?: string;
  description?: string;
  schedule?: string;
}

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

const userDataSkeleton = {
  contact: '',
  email: '',
  name: '',
  password: '',
  photo: '',
  status: 'Active',
};

const userJobDataSkeleton = {
  position: 'Manager',
  description: '',
  schedule: '',
};

const NewUser = () => {
  const [userData, setUserData] = useState<IUserData>(userDataSkeleton);
  const [userJobData, setUserJobData] =
    useState<IUserJobData>(userJobDataSkeleton);
  const statusAPI = useAppSelector((state) => state.users.status);
  const errorMessageAPI = useAppSelector((state) => state.users.error);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (errorMessageAPI && statusAPI === 'failed') {
      toast.error(errorMessageAPI);
    }
  }, [errorMessageAPI, statusAPI]);

  const userDataHandler = ({
    userDataProp,
    newValue,
  }: {
    userDataProp: keyof IUserData;
    newValue: IUserData[keyof IUserData];
  }) => {
    setUserData((prevState) => {
      const newState: IUserData = { ...prevState };
      newState[userDataProp] = newValue;
      return newState;
    });
  };

  const userJobHandler = ({
    userJobProp,
    newValue,
  }: {
    userJobProp: keyof IUserJobData;
    newValue: IUserJobData[keyof IUserJobData];
  }) => {
    setUserJobData((prevState) => {
      const newState: IUserJobData = { ...prevState };
      newState[userJobProp] = newValue;
      return newState;
    });
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const objToSave = {
      photo:
        'https://www.pngkey.com/png/detail/308-3081138_contact-avatar-generic.png',
      //   photo: userPhotoInput,
      name: userData.name,
      job: {
        position: userJobData.position,
        description: userJobData.description,
        schedule: userJobData.schedule,
      },
      email: userData.email,
      password: userData.password,
      contact: userData.contact,
      startDate: new Date().toISOString().substring(0, 10),
      status: userData.status,
    };

    if (
      !userData.name.trim() ||
      !userData.email.trim() ||
      (userData.password && !userData.password.trim()) ||
      !userData.contact.trim()
    ) {
      toast.warn('Fill all the required inputs', {
        autoClose: 3000,
        hideProgressBar: true,
      });
      return;
    }
    const result = await dispatch(createUser({ objToSave }));

    const hasError = result.meta.requestStatus === 'rejected';
    if (hasError) return;

    toast.success('User created successfully');
    navigate('/users', { replace: true });
  };

  if (statusAPI === 'loading') return <PulseSpinner isLoading={true} />;

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
            value={userData.name}
            id='user-name'
            type='text'
            onChange={(e) =>
              userDataHandler({
                userDataProp: 'name',
                newValue: e.target.value,
              })
            }
          />
        </div>
        <div>
          <StyledLabel htmlFor='user-images'>
            Upload image<span style={{ color: 'red' }}>*</span>{' '}
          </StyledLabel>
          <input
            type='file'
            id='user-images'
            onChange={(e) =>
              userDataHandler({
                userDataProp: 'photo',
                newValue: e.target.files,
              })
            }
            accept='image/*'
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
            value={userData.email}
            id='user-email'
            type='email'
            onChange={(e) =>
              userDataHandler({
                userDataProp: 'email',
                newValue: e.target.value,
              })
            }
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
            value={userData.password}
            id='user-password'
            type='password'
            onChange={(e) =>
              userDataHandler({
                userDataProp: 'password',
                newValue: e.target.value,
              })
            }
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
            value={userData.contact}
            id='user-contact'
            type='text'
            onChange={(e) =>
              userDataHandler({
                userDataProp: 'contact',
                newValue: e.target.value,
              })
            }
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
            value={userJobData.position}
            onChange={(e) =>
              userJobHandler({
                userJobProp: 'position',
                newValue: e.target.value,
              })
            }
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
            value={userJobData.description}
            id='user-job-description'
            type='text'
            onChange={(e) =>
              userJobHandler({
                userJobProp: 'description',
                newValue: e.target.value,
              })
            }
          />
        </div>
        <div>
          <StyledLabel htmlFor='user-job-schedule'>Job Schedule</StyledLabel>
          <InputText
            borderRadius='4px'
            padding='5px'
            name='user-job-schedule'
            placeholder='job schedule...'
            value={userJobData.schedule}
            id='user-job-schedule'
            type='text'
            onChange={(e) =>
              userJobHandler({
                userJobProp: 'schedule',
                newValue: e.target.value,
              })
            }
          />
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
            value={userData.status}
            onChange={(e) =>
              userDataHandler({
                userDataProp: 'status',
                newValue: e.target.value,
              })
            }
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
