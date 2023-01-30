import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/typedHooks';
import { useNavigate, useParams } from 'react-router-dom';
import {
  MainCard,
  InputSelect,
  InputText,
  ButtonGreen,
  ImgHolder,
  StyledForm,
  StyledLabel,
} from '../components/Styles';
import { toast } from 'react-toastify';
import { PulseSpinner } from '../components';
import { IUserData } from '../interfaces/IUserData';
import { updateUser, fetchSingleUser } from '../store/userSlice';

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
  status: '',
};

const userJobDataSkeleton = {
  position: '',
  description: '',
  schedule: '',
};

const UserEdit = () => {
  const [userData, setUserData] = useState<IUserData>(userDataSkeleton);
  const [userJobData, setUserJobData] =
    useState<IUserJobData>(userJobDataSkeleton);
  const usersListRedux = useAppSelector((state) => state.users.usersList);
  const fetchStatusAPI = useAppSelector((state) => state.users.fetchStatus);
  const statusAPI = useAppSelector((state) => state.users.status);
  const errorMessageAPI = useAppSelector((state) => state.users.error);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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

  useEffect(() => {
    if (fetchStatusAPI !== 'idle') return;

    const parsedUsers = Array.isArray(usersListRedux)
      ? usersListRedux[0]
      : usersListRedux;

    if (parsedUsers.email === 'hotel@miranda.com') {
      toast.warn(
        `This user is only editable by the CREATOR. Returning back to the user list!`,
        {
          autoClose: 3000,
          hideProgressBar: true,
        }
      );
      return navigate(`/users/`, { replace: true });
    }

    const userDataObj = {
      contact: parsedUsers.contact,
      email: parsedUsers.email,
      name: parsedUsers.name,
      password: '',
      photo: parsedUsers.photo,
      status: parsedUsers.status,
    };
    const userJobObj = {
      position: parsedUsers.job.position,
      description: parsedUsers.job.description,
      schedule: parsedUsers.job.schedule,
    };

    setUserData(userDataObj);
    setUserJobData(userJobObj);
  }, [usersListRedux, fetchStatusAPI]);

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

    if (
      !userData.name.trim() ||
      !userData.email.trim() ||
      !userData.contact.trim()
    ) {
      toast.warn('Fill all the required inputs', {
        autoClose: 3000,
        hideProgressBar: true,
      });
      return;
    }

    const objToUpdate = {
      //   photo: userPhotoInput,
      name: userData.name,
      job: {
        position: userJobData.position,
        description: userJobData.description,
        schedule: userJobData.schedule,
      },
      email: userData.email,
      password: userData.password ? userData.password : null,
      contact: userData.contact,
      status: userData.status,
    };

    const result = await dispatch(updateUser({ id, objToUpdate }));

    const hasError = result.meta.requestStatus === 'rejected';
    if (hasError) return;

    toast.success('User edited successfully');
    navigate(`/users/${id}`, { replace: true });
  };

  if (fetchStatusAPI === 'failed') {
    return (
      <h1 style={{ textAlign: 'center', margin: '100px 0', fontSize: '40px' }}>
        Problem fetching the user. Check the ID!
      </h1>
    );
  }

  if (fetchStatusAPI === 'loading' || statusAPI === 'loading') {
    return (
      <MainCard borderRadius='16px'>
        <PulseSpinner isLoading={true} />
      </MainCard>
    );
  }

  return (
    <MainCard borderRadius='16px'>
      <h1>Editing user {userData.name}</h1>
      <StyledForm onSubmit={submitHandler}>
        <div>
          <StyledLabel htmlFor='user-images'>Upload images</StyledLabel>
          <input
            type='file'
            id='user-images'
            accept='image/*'
            onChange={(e) =>
              userDataHandler({
                userDataProp: 'photo',
                newValue: e.target.files,
              })
            }
          />
        </div>
        <div>
          <StyledLabel htmlFor='user-name'>Name</StyledLabel>
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
          <StyledLabel htmlFor='user-email'>Email</StyledLabel>
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
          <StyledLabel htmlFor='user-password'>Password</StyledLabel>
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
          <StyledLabel htmlFor='user-phone'>Contact number</StyledLabel>
          <InputText
            borderRadius='4px'
            padding='5px'
            name='user-phone'
            placeholder='contact number...'
            value={userData.contact}
            id='user-phone'
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
          <StyledLabel htmlFor='user-job-position'>Status</StyledLabel>
          <InputSelect
            style={{
              borderRadius: '4px',
              paddingRight: '62px',
              fontWeight: '400',
            }}
            id='user-job-status'
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
