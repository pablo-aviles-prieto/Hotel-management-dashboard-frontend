import {
  StyledForm,
  StyledLabel,
  InputText,
  TextArea,
  InputSelect,
  ButtonGreen,
} from '../Styles';
import { IContactUser, IContactMessage } from '../../interfaces';

type IContactUserProps = {
  contactUserProp: keyof IContactUser;
  newValue: IContactUser[keyof IContactUser];
};

type IConctactMessageProps = {
  contactMessageProp: keyof IContactMessage;
  newValue: IContactMessage[keyof IContactMessage];
};

interface IProps {
  submitHandler: (e: React.FormEvent) => Promise<void>;
  contactUserHandler: ({
    contactUserProp,
    newValue,
  }: IContactUserProps) => void;
  contactMessageHandler: ({
    contactMessageProp,
    newValue,
  }: IConctactMessageProps) => void;
  setContactArchived: (value: React.SetStateAction<string>) => void;
  contactUser: IContactUser;
  contactMessage: IContactMessage;
  contactArchived: string;
}

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

export const ContactForm: React.FC<IProps> = ({
  submitHandler,
  contactUserHandler,
  contactMessageHandler,
  setContactArchived,
  contactUser,
  contactMessage,
  contactArchived,
}) => {
  return (
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
  );
};
