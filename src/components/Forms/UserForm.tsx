import {
  StyledForm,
  StyledLabel,
  InputText,
  InputSelect,
  ButtonGreen,
  FlexContainer,
  InputContainer,
  InputFileContainer,
} from '../Styles';
import { IUserData } from '../../interfaces/IUserData';

type IUserDataProps = {
  userDataProp: keyof IUserData;
  newValue: IUserData[keyof IUserData];
};

type IUserJobProps = {
  userJobProp: keyof IUserJobData;
  newValue: IUserJobData[keyof IUserJobData];
};

interface IUserJobData {
  position?: string;
  description?: string;
  schedule?: string;
}

interface IProps {
  submitHandler: (e: React.FormEvent) => Promise<void>;
  userDataHandler: ({ userDataProp, newValue }: IUserDataProps) => void;
  userJobHandler: ({ userJobProp, newValue }: IUserJobProps) => void;
  userData: IUserData;
  userJobData: IUserJobData;
}

const userJobPositionOptions = [
  {
    label: 'Manager',
  },
  {
    label: 'Receptionist',
  },
  {
    label: 'Room service',
  },
];

const userStatusOptions = [
  {
    label: 'Active',
  },
  {
    label: 'Inactive',
  },
];

export const UserForm: React.FC<IProps> = ({
  submitHandler,
  userDataHandler,
  userJobHandler,
  userData,
  userJobData,
}) => {
  return (
    <StyledForm onSubmit={submitHandler}>
      <FlexContainer>
        <InputContainer>
          <StyledLabel htmlFor='user-name'>
            Name<span style={{ color: 'red' }}>*</span>
          </StyledLabel>
          <InputText
            borderRadius='4px'
            padding='5px'
            name='user-name'
            placeholder='name...'
            value={userData.name}
            id='user-name'
            type='text'
            width='100%'
            onChange={(e) =>
              userDataHandler({
                userDataProp: 'name',
                newValue: e.target.value,
              })
            }
          />
        </InputContainer>
        <InputContainer>
          <StyledLabel htmlFor='user-contact'>
            Contact number<span style={{ color: 'red' }}>*</span>
          </StyledLabel>
          <InputText
            borderRadius='4px'
            padding='5px'
            name='user-contact'
            placeholder='contact number...'
            value={userData.contact}
            id='user-contact'
            type='text'
            width='100%'
            onChange={(e) =>
              userDataHandler({
                userDataProp: 'contact',
                newValue: e.target.value,
              })
            }
          />
        </InputContainer>
      </FlexContainer>
      <FlexContainer>
        <InputContainer>
          <StyledLabel htmlFor='user-email'>
            Email<span style={{ color: 'red' }}>*</span>
          </StyledLabel>
          <InputText
            borderRadius='4px'
            padding='5px'
            name='user-email'
            placeholder='email...'
            value={userData.email}
            id='user-email'
            type='email'
            width='100%'
            onChange={(e) =>
              userDataHandler({
                userDataProp: 'email',
                newValue: e.target.value,
              })
            }
          />
        </InputContainer>
        <InputContainer>
          <StyledLabel htmlFor='user-password'>
            Password<span style={{ color: 'red' }}>*</span>
          </StyledLabel>
          <InputText
            borderRadius='4px'
            padding='5px'
            name='user-password'
            placeholder='password...'
            value={userData.password}
            id='user-password'
            type='password'
            width='100%'
            onChange={(e) =>
              userDataHandler({
                userDataProp: 'password',
                newValue: e.target.value,
              })
            }
          />
        </InputContainer>
      </FlexContainer>
      <FlexContainer>
        <InputContainer>
          <StyledLabel htmlFor='user-job-position'>
            Job position<span style={{ color: 'red' }}>*</span>
          </StyledLabel>
          <InputSelect
            style={{
              borderRadius: '4px',
              fontWeight: '400',
              minWidth: '175px',
            }}
            id='user-job-position'
            padding='6px 5px'
            positionArrowY='0'
            width='100%'
            value={userJobData.position}
            onChange={(e) =>
              userJobHandler({
                userJobProp: 'position',
                newValue: e.target.value,
              })
            }
          >
            {userJobPositionOptions.map((option) => (
              <option key={option.label} value={option.label}>
                {option.label}
              </option>
            ))}
          </InputSelect>
        </InputContainer>
        <InputContainer>
          <StyledLabel htmlFor='user-job-description'>
            Job Description
          </StyledLabel>
          <InputText
            borderRadius='4px'
            padding='5px'
            name='user-job-description'
            placeholder='job description...'
            value={userJobData.description}
            id='user-job-description'
            type='text'
            width='100%'
            onChange={(e) =>
              userJobHandler({
                userJobProp: 'description',
                newValue: e.target.value,
              })
            }
          />
        </InputContainer>
      </FlexContainer>
      <FlexContainer>
        <InputContainer>
          <StyledLabel htmlFor='user-job-schedule'>Job Schedule</StyledLabel>
          <InputText
            borderRadius='4px'
            padding='5px'
            name='user-job-schedule'
            placeholder='job schedule...'
            value={userJobData.schedule}
            id='user-job-schedule'
            type='text'
            width='100%'
            onChange={(e) =>
              userJobHandler({
                userJobProp: 'schedule',
                newValue: e.target.value,
              })
            }
          />
        </InputContainer>
        <InputContainer>
          <StyledLabel htmlFor='user-status'>
            Status<span style={{ color: 'red' }}>*</span>
          </StyledLabel>
          <InputSelect
            style={{
              borderRadius: '4px',
              fontWeight: '400',
              minWidth: '175px',
            }}
            id='user-status'
            padding='6px 5px'
            positionArrowY='0'
            width='100%'
            value={userData.status}
            onChange={(e) =>
              userDataHandler({
                userDataProp: 'status',
                newValue: e.target.value,
              })
            }
          >
            {userStatusOptions.map((option) => (
              <option key={option.label} value={option.label}>
                {option.label}
              </option>
            ))}
          </InputSelect>
        </InputContainer>
      </FlexContainer>
      <InputFileContainer style={{ marginBottom: '25px', maxWidth: '450px' }}>
        <StyledLabel htmlFor='user-images'>
          Upload image<span style={{ color: 'red' }}>*</span>{' '}
        </StyledLabel>
        <input
          type='file'
          id='user-images'
          onChange={(e) =>
            userDataHandler({
              userDataProp: 'photo',
              newValue: e.target.files,
            })
          }
          accept='image/*'
        />
      </InputFileContainer>
      <div style={{ margin: '0 auto', maxWidth: '450px' }}>
        <ButtonGreen
          style={{ width: '100%' }}
          padding='10px 52px'
          type='submit'
        >
          Save user
        </ButtonGreen>
      </div>
    </StyledForm>
  );
};
