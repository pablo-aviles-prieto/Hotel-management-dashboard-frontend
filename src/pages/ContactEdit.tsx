import {
  InputText,
  ButtonGreen,
  InputSelect,
  MainCard,
} from '../components/Styles';
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/typedHooks';
import { useNavigate, useParams } from 'react-router-dom';
import { updateContact } from '../store/contactSlice';
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
  const [contactRate, setContactRate] = useState<number | null>(null);
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactArchived, setContactArchived] = useState('false');
  const contactListRedux = useAppSelector((state) => state.contacts.contactList);
  const statusPost = useAppSelector((state) => state.contacts.statusPost);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const params = useParams();
  const { id } = params;

  console.log('contactListRedux', contactListRedux);
  console.log('statusPost', statusPost);

  useEffect(() => {
    setContactUserName(contactListRedux[0].user.name);
    setContactUserEmail(contactListRedux[0].user.email);
    setContactUserPhone(contactListRedux[0].user?.phone);
    setContactRate(contactListRedux[0].rate);
    setContactSubject(contactListRedux[0].message.subject);
    setContactMessage(contactListRedux[0].message.body);
    setContactArchived(
      contactListRedux[0]?.archived ? 'true' : 'false'
    );
  }, [contactListRedux]);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !contactUserName.trim() ||
      !contactUserEmail.trim() ||
      !contactSubject.trim() ||
      !contactMessage.trim() ||
      contactRate === null ||
      contactRate === undefined
    ) {
      return alert('Please, fill all the required inputs');
    }

    const objToUpdate = {
      id: +id!,
      user: {
        name: contactUserName,
        email: contactUserEmail,
        phone: contactUserPhone,
      },
      message: { subject: contactSubject, body: contactMessage },
      rate: contactRate,
      archived: contactArchived === 'true' ? true : false,
    };

    console.log('objToUpdate', objToUpdate);
    dispatch(updateContact({ objToUpdate }));
    navigate(`/contacts/${id}`, { replace: true });
  };

  if (statusPost === 'loading') return <h1>Editing contact message...</h1>;

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
          <StyledLabel htmlFor='contact-rate'>
            Rate<span style={{ color: 'red' }}>*</span>
          </StyledLabel>
          <InputText
            style={{ minWidth: '175px' }}
            borderRadius='4px'
            padding='5px'
            name='contact-rate'
            placeholder='rate...'
            value={contactRate!}
            id='contact-rate'
            min={0}
            max={100}
            type='number'
            onChange={(e) => setContactRate(+e.target.value)}
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
