import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../store/typedHooks';
import { PulseSpinner } from '../components';
import { fetchSingleContact, updateContact } from '../store/contactSlice';
import { IContactMessage, IContactUser } from '../interfaces';
import {
  InputText,
  ButtonGreen,
  InputSelect,
  MainCard,
  StyledForm,
  StyledLabel,
  TextArea,
} from '../components/Styles';

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
            value={contactUser.name}
            id='contact-name'
            type='text'
            onChange={(e) =>
              contactUserHandler({
                contactUserProp: 'name',
                newValue: e.target.value,
              })
            }
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
            value={contactUser.email}
            id='contact-email'
            type='email'
            onChange={(e) =>
              contactUserHandler({
                contactUserProp: 'email',
                newValue: e.target.value,
              })
            }
          />
        </div>
        <div>
          <StyledLabel htmlFor='contact-phone'>Contact phone</StyledLabel>
          <InputText
            borderRadius='4px'
            padding='5px'
            name='contact-phone'
            placeholder='contact phone...'
            value={contactUser.phone}
            id='contact-phone'
            type='text'
            onChange={(e) =>
              contactUserHandler({
                contactUserProp: 'phone',
                newValue: e.target.value,
              })
            }
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
            value={contactMessage.subject}
            id='contact-subject'
            type='text'
            onChange={(e) =>
              contactMessageHandler({
                contactMessageProp: 'subject',
                newValue: e.target.value,
              })
            }
          />
        </div>
        <div>
          <StyledLabel htmlFor='contact-message'>
            Message<span style={{ color: 'red' }}>*</span>
          </StyledLabel>
          <TextArea
            placeholder='message...'
            id='contact-message'
            rows={5}
            value={contactMessage.body}
            onChange={(e) =>
              contactMessageHandler({
                contactMessageProp: 'body',
                newValue: e.target.value,
              })
            }
          ></TextArea>
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
            Update contact
          </ButtonGreen>
        </div>
      </StyledForm>
    </MainCard>
  );
};

export default ContactEdit;
