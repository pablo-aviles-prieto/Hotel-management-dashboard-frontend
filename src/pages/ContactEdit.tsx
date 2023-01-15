import {
  InputText,
  ButtonGreen,
  InputSelect,
  MainCard,
} from '../components/Styles';
import { toast } from 'react-toastify';
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/typedHooks';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchSingleContact, updateContact } from '../store/contactSlice';
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

const MessageTextArea = styled.textarea`
  padding: 5px;
  border-radius: 4px;
  background: transparent;
  color: ${({ theme }) => theme.mainColor};
  border: 1px solid ${({ theme }) => theme.buttonGreenBground};
  min-width: 175px;
`;

const contactArchivedSelect = [
  {
    label: 'Archived',
    value: 'true',
  },
  {
    label: 'Not archived',
    value: 'false',
  },
];

const ContactEdit = () => {
  const [contactUserName, setContactUserName] = useState('');
  const [contactUserEmail, setContactUserEmail] = useState('');
  const [contactUserPhone, setContactUserPhone] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactArchived, setContactArchived] = useState('false');
  const contactListRedux = useAppSelector(
    (state) => state.contacts.contactList
  );
  const fetchStatusAPI = useAppSelector((state) => state.contacts.statusPost);
  const statusAPI = useAppSelector((state) => state.contacts.status);
  const errorMessageAPI = useAppSelector((state) => state.contacts.error);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const params = useParams();
  const { id } = params;

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

    setContactUserName(dataChecked.user.name);
    setContactUserEmail(dataChecked.user.email);
    setContactUserPhone(dataChecked.user?.phone);
    setContactSubject(dataChecked.message.subject);
    setContactMessage(dataChecked.message.body);
    setContactArchived(dataChecked?.archived ? 'true' : 'false');
  }, [contactListRedux, fetchStatusAPI]);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !contactUserName.trim() ||
      !contactUserEmail.trim() ||
      !contactSubject.trim() ||
      !contactMessage.trim()
    ) {
      return toast.warn('Fill all the required inputs', {
        autoClose: 3000,
        hideProgressBar: true,
      });
    }

    const objToUpdate = {
      id: +id!,
      user: {
        name: contactUserName,
        email: contactUserEmail,
        phone: contactUserPhone,
      },
      message: { subject: contactSubject, body: contactMessage },
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
      <h1 style={{ textAlign: 'center', margin: '100px 0', fontSize: '40px' }}>
        Loading...
      </h1>
    );
  }

  return (
    <MainCard borderRadius='16px'>
      <h1>Edit contact message</h1>
      <StyledForm onSubmit={submitHandler}>
        <div>
          <StyledLabel htmlFor='contact-name'>
            Name<span style={{ color: 'red' }}>*</span>
          </StyledLabel>
          <InputText
            borderRadius='4px'
            padding='5px'
            name='contact-name'
            placeholder='name...'
            value={contactUserName}
            id='contact-name'
            type='text'
            onChange={(e) => setContactUserName(e.target.value)}
          />
        </div>
        <div>
          <StyledLabel htmlFor='contact-email'>
            Email<span style={{ color: 'red' }}>*</span>
          </StyledLabel>
          <InputText
            borderRadius='4px'
            padding='5px'
            name='contact-email'
            placeholder='email...'
            value={contactUserEmail}
            id='contact-email'
            type='email'
            onChange={(e) => setContactUserEmail(e.target.value)}
          />
        </div>
        <div>
          <StyledLabel htmlFor='contact-phone'>Contact phone</StyledLabel>
          <InputText
            borderRadius='4px'
            padding='5px'
            name='contact-phone'
            placeholder='contact phone...'
            value={contactUserPhone}
            id='contact-phone'
            type='text'
            onChange={(e) => setContactUserPhone(e.target.value)}
          />
        </div>
        <div>
          <StyledLabel htmlFor='contact-subject'>
            Subject<span style={{ color: 'red' }}>*</span>
          </StyledLabel>
          <InputText
            borderRadius='4px'
            padding='5px'
            name='contact-subject'
            placeholder='subject...'
            value={contactSubject}
            id='contact-subject'
            type='text'
            onChange={(e) => setContactSubject(e.target.value)}
          />
        </div>
        <div>
          <StyledLabel htmlFor='contact-message'>
            Message<span style={{ color: 'red' }}>*</span>
          </StyledLabel>
          <MessageTextArea
            placeholder='message...'
            id='contact-message'
            rows={5}
            value={contactMessage}
            onChange={(e) => setContactMessage(e.target.value)}
          ></MessageTextArea>
        </div>
        <div>
          <StyledLabel htmlFor='user-job-position'>
            Archived<span style={{ color: 'red' }}>*</span>
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
            value={contactArchived}
            onChange={(e) => setContactArchived(e.target.value)}
          >
            {contactArchivedSelect.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </InputSelect>
        </div>
        <div style={{ marginTop: '25px' }}>
          <ButtonGreen padding='10px 52px' type='submit'>
            Save contact
          </ButtonGreen>
        </div>
      </StyledForm>
    </MainCard>
  );
};

export default ContactEdit;
