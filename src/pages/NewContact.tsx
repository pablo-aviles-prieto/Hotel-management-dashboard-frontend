import {
  InputText,
  ButtonGreen,
  InputSelect,
  MainCard,
} from '../components/Styles';
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/typedHooks';
import { useNavigate } from 'react-router-dom';
import { createContact } from '../store/contactSlice';
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

const NewContact = () => {
  const [contactUserName, setContactUserName] = useState('');
  const [contactUserEmail, setContactUserEmail] = useState('');
  const [contactUserPhone, setContactUserPhone] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactArchived, setContactArchived] = useState('false');
  const statusAPI = useAppSelector((state) => state.contacts.status);
  const errorMessageAPI = useAppSelector((state) => state.contacts.error);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (errorMessageAPI && statusAPI === 'failed') {
      alert(errorMessageAPI);
    }
  }, [errorMessageAPI, statusAPI]);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const objToSave = {
      date: new Date().toISOString().substring(0, 10),
      user: {
        name: contactUserName,
        email: contactUserEmail,
        phone: contactUserPhone,
      },
      message: { subject: contactSubject, body: contactMessage },
      archived: contactArchived === 'true' ? true : false,
    };

    if (
      !contactUserName.trim() ||
      !contactUserEmail.trim() ||
      !contactSubject.trim() ||
      !contactMessage.trim()
    ) {
      return alert('Please, fill all the required inputs');
    }

    const result = await dispatch(createContact({ objToSave }));

    const hasError = result.meta.requestStatus === 'rejected';
    if (hasError) return;
    
    navigate('/contacts', { replace: true });
  };

  if (statusAPI === 'loading') return <h1>Saving contact message...</h1>;

  return (
    <MainCard borderRadius='16px'>
      <h1>Create new contact message</h1>
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

export default NewContact;
