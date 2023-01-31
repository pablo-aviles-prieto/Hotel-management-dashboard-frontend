import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/typedHooks';
import { useNavigate, useParams } from 'react-router-dom';
import { MainCard } from '../components/Styles';
import { toast } from 'react-toastify';
import { PulseSpinner } from '../components';
import { UserForm } from '../components/Forms/UserForm';
import { IUserData } from '../interfaces';
import { updateUser, fetchSingleUser } from '../store/userSlice';

interface IUserJobData {
  position?: string;
  description?: string;
  schedule?: string;
}

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
  }, [usersListRedux, fetchStatusAPI, navigate]);

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
      <UserForm
        submitHandler={submitHandler}
        userDataHandler={userDataHandler}
        userJobHandler={userJobHandler}
        userData={userData}
        userJobData={userJobData}
      />
    </MainCard>
  );
};

export default UserEdit;
