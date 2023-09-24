import { Button, Card as MuiCard, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import Typography from '../../components/typography';

export const Card = styled(MuiCard)`
  max-width: 500px;
  width: 100%;
  margin-top: 50px;
  position: relative;
  z-index: 3;
  height: fit-content;
  padding: 40px;
`;

export const Input = styled(TextField)`
  margin-bottom: 20px;
  border-radius: 4px;

  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: #bcbbbe;
    }
  }

  label,
  input {
    font-size: 14px;
    line-height: 150%;
    color: #78787d;
  }
`;

export const Title = styled(Typography.Heading)`
  font-weight: 600;
  font-size: 32px;
  line-height: 130%;
  color: #35343c;
`;

export const Para = styled(Typography.Paragraph)`
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  color: #57565d;

  a {
    color: #557ecd;
    text-decoration: none;
    font-weight: 600;
  }
`;

export const Form = styled('form')`
  margin-top: 40px;
  margin-bottom: 30px;
`;

export const SubmitButton = styled(Button)`
  font-weight: 600;
  font-size: 16px;
  line-height: 21px;
  height: 57px;
  background-color: #557ecd;
  color: #ffffff;
  text-transform: unset;

  &:hover {
    background-color: #557ecd;
  }
`;
