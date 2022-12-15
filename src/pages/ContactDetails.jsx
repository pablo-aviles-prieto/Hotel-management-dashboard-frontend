import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { fetchSingleContact, deleteContact } from '../store/contactSlice';
import { MainCard, ButtonGreen } from '../components/Styles';
import contactsData from '../assets/data/comments.json';

const RedButton = styled(ButtonGreen)`
  background-color: rgb(226, 52, 40);
  margin-left: 10px;
`;

const ContactDetails = () => {
  const contactRedux = useSelector((state) => state.contacts.contactList);
  const statusAPI = useSelector((state) => state.contacts.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  // console.log('statusAPI', statusAPI);
  console.log('contactRedux', contactRedux);

  useEffect(() => {
    const filteredContacts = contactsData.filter(
      (contact) => contact.id === +id
    );
    dispatch(fetchSingleContact(filteredContacts));
  }, [dispatch, id]);

  const deleteContactHandler = () => {
    if (window.confirm('Are you sure you want to delete this room?') === false)
      return;

    dispatch(deleteContact({ id: +id }));
    navigate('/contacts/', { replace: true });
  };

  if (statusAPI === 'loading')
    return (
      <h1 style={{ textAlign: 'center', margin: '100px 0', fontSize: '40px' }}>
        Loading contact...
      </h1>
    );

  if (contactRedux.length === 0)
    return (
      <h1>
        We couldn't find the contact selected. Please check the ID and if it's
        correct try again later!
      </h1>
    );

  return (
    <MainCard borderRadius='16px'>
      <h1>Room details for {id}</h1>
      <ul>
        <li>ID: {contactRedux[0].id}</li>
        <li>Subject: {contactRedux[0].message.subject}</li>
        <li>Message: {contactRedux[0].message.body}</li>
        <li>Rate: {contactRedux[0].rate}/100</li>
        <li>Posted date: {contactRedux[0].date}</li>
        <li>Posted by: {contactRedux[0].user.name}</li>
      </ul>
      <div style={{ marginTop: '50px' }}>
        <ButtonGreen
          padding='10px 52px'
          onClick={() => navigate(`/contacts/${id}/edit`)}
        >
          Edit contact
        </ButtonGreen>
        <RedButton padding='10px 52px' onClick={deleteContactHandler}>
          Delete contact
        </RedButton>
      </div>
    </MainCard>
  );
};

export default ContactDetails;
