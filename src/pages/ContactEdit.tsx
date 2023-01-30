import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../store/typedHooks';
import { fetchSingleContact, updateContact } from '../store/contactSlice';
import { PulseSpinner } from '../components';
import { ContactForm } from '../components/Forms';
import { MainCard } from '../components/Styles';
import { IContactMessage, IContactUser } from '../interfaces';

const ContactEdit = () => {
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
  const contactListRedux = useAppSelector(
    (state) => state.contacts.contactList
  );
  const fetchStatusAPI = useAppSelector((state) => state.contacts.statusPost);
  const statusAPI = useAppSelector((state) => state.contacts.status);
  const errorMessageAPI = useAppSelector((state) => state.contacts.error);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchSingleContact({ id }));
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

    const dataChecked = Array.isArray(contactListRedux)
      ? contactListRedux[0]
      : contactListRedux;

    const archivedContact = dataChecked?.archived ? 'true' : 'false';
    const messageContact = {
      body: dataChecked.message.body,
      subject: dataChecked.message.subject,
    };
    const userContact = {
      email: dataChecked.user.email,
      name: dataChecked.user.name,
      phone: dataChecked.user?.phone,
    };

    setContactArchived(archivedContact);
    setContactMessage(messageContact);
    setContactUser(userContact);
  }, [contactListRedux, fetchStatusAPI]);

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

    const objToUpdate = {
      id: +id!,
      user: {
        name: contactUser.name,
        email: contactUser.email,
        phone: contactUser.phone,
      },
      message: {
        subject: contactMessage.subject,
        body: contactMessage.body,
      },
      archived: contactArchived === 'true' ? true : false,
    };

    const result = await dispatch(updateContact({ id, objToUpdate }));

    const hasError = result.meta.requestStatus === 'rejected';
    if (hasError) return;

    toast.success('Contact edited successfully');
    navigate(`/contacts/${id}`, { replace: true });
  };

  if (fetchStatusAPI === 'failed') {
    return (
      <h1 style={{ textAlign: 'center', margin: '100px 0', fontSize: '40px' }}>
        Problem fetching the contact. Check the ID!
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
      <h1>Edit contact message</h1>
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

export default ContactEdit;
