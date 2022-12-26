import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useContext, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../store/typedHooks';
import { fetchSingleContact, deleteContact } from '../store/contactSlice';
import { MainCard, ButtonGreen } from '../components/Styles';
import { AuthContext } from '../store/authContext';
import styled from 'styled-components';

const RedButton = styled(ButtonGreen)`
  background-color: rgb(226, 52, 40);
  margin-left: 10px;
`;

const API_URI = process.env.REACT_APP_API_URI;

const ContactDetails = () => {
  const contactRedux = useAppSelector((state) => state.contacts.contactList);
  const fetchStatusAPI = useAppSelector((state) => state.contacts.statusPost);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { authStatus } = useContext(AuthContext);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    dispatch(
      fetchSingleContact({
        url: new URL(`${API_URI}/contacts/${id}`),
        fetchObjProps: {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authStatus.token}`,
          },
        },
      })
    );
  }, [dispatch, id]);

  const deleteContactHandler = async () => {
    if (
      window.confirm('Are you sure you want to delete this contact?') === false
    )
      return;

    const result = await dispatch(deleteContact({
      url: new URL(`${API_URI}/contacts/${id}`),
      fetchObjProps: {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authStatus.token}`,
        },
      },
    }));

    const hasError = result.meta.requestStatus === 'rejected';
    if (hasError) {
      alert('ID provided is not valid!');
      return;
    }
    navigate('/contacts/', { replace: true });
  };

  const dataChecked = useMemo(
    () => (Array.isArray(contactRedux) ? contactRedux[0] : contactRedux),
    [contactRedux]
  );

  if (fetchStatusAPI === 'failed')
    return (
      <h1>
        We couldn't find the contact selected. Please check the ID and if it's
        correct try again later!
      </h1>
    );

  return (
    <MainCard borderRadius='16px'>
      {fetchStatusAPI === 'loading' ? (
        <h1
          style={{ textAlign: 'center', margin: '100px 0', fontSize: '40px' }}
        >
          Loading contact...
        </h1>
      ) : (
        <>
          <h1>Contacts details for {id}</h1>
          <ul>
            <li>ID: {dataChecked.id}</li>
            <li>Subject: {dataChecked.message.subject}</li>
            <li>Message: {dataChecked.message.body}</li>
            <li>Rate: {dataChecked.rate}/100</li>
            <li>Posted date: {dataChecked.date}</li>
            <li>Posted by: {dataChecked.user.name}</li>
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
        </>
      )}
    </MainCard>
  );
};

export default ContactDetails;
