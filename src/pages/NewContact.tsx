import { MainCard } from '../components/Styles';
import { toast } from 'react-toastify';
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/typedHooks';
import { useNavigate } from 'react-router-dom';
import { ContactForm } from '../components/Forms';
import { PulseSpinner } from '../components';
import { createContact } from '../store/contactSlice';
import { IContactMessage, IContactUser } from '../interfaces';

const NewContact = () => {
  const [contactArchived, setContactArchived] = useState<string>('false');
  const [contactMessage, setContactMessage] = useState<IContactMessage>({
    body: '',
    subject: '',
  });
  const [contactUser, setContactUser] = useState<IContactUser>({
    email: '',
    name: '',
    phone: '',
  });
  const statusAPI = useAppSelector((state) => state.contacts.status);
  const errorMessageAPI = useAppSelector((state) => state.contacts.error);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (errorMessageAPI && statusAPI === 'failed') {
      toast.error(errorMessageAPI);
    }
  }, [errorMessageAPI, statusAPI]);

  const contactUserHandler = ({
    contactUserProp,
    newValue,
  }: {
    contactUserProp: keyof IContactUser;
    newValue: IContactUser[keyof IContactUser];
  }) => {
    setContactUser((prevState) => {
      const newState: IContactUser = { ...prevState };
      newState[contactUserProp] = newValue;
      return newState;
    });
  };

  const contactMessageHandler = ({
    contactMessageProp,
    newValue,
  }: {
    contactMessageProp: keyof IContactMessage;
    newValue: IContactMessage[keyof IContactMessage];
  }) => {
    setContactMessage((prevState) => {
      const newState: IContactMessage = { ...prevState };
      newState[contactMessageProp] = newValue;
      return newState;
    });
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const objToSave = {
      date: new Date().toISOString().substring(0, 10),
      user: {
        name: contactUser.name,
        email: contactUser.email,
        phone: contactUser.phone,
      },
      message: { subject: contactMessage.subject, body: contactMessage.body },
      archived: contactArchived === 'true' ? true : false,
    };

    if (
      !contactUser.name.trim() ||
      !contactUser.email.trim() ||
      !contactMessage.subject.trim() ||
      !contactMessage.body.trim()
    ) {
      toast.warn('Fill all the required inputs', {
        autoClose: 3000,
        hideProgressBar: true,
      });
      return;
    }

    const result = await dispatch(createContact({ objToSave }));

    const hasError = result.meta.requestStatus === 'rejected';
    if (hasError) return;

    toast.success('Contact created successfully');
    navigate('/contacts', { replace: true });
  };

  if (statusAPI === 'loading') return <PulseSpinner isLoading />;

  return (
    <MainCard borderRadius='16px'>
      <h1>Create new contact message</h1>
      <ContactForm
        submitHandler={submitHandler}
        contactUserHandler={contactUserHandler}
        contactMessageHandler={contactMessageHandler}
        setContactArchived={setContactArchived}
        contactUser={contactUser}
        contactMessage={contactMessage}
        contactArchived={contactArchived}
      />
    </MainCard>
  );
};

export default NewContact;
