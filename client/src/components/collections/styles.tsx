import { styled, Box, Button, Card as MuiCard, Dialog } from '@mui/material';
import Typography from '@component/typography';
import typography from '@component/typography';

export const CollectionHeading = styled(Typography.Paragraph)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: '500',
  color: theme.palette.content.tetiary,
  textTransform: 'capitalize',
}));

export const Paragraph = styled(Typography.Paragraph)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: '400',
  color: theme.palette.content.tetiary,
  textTransform: 'lowercase',
}));

export const Card = styled(MuiCard)({
  padding: '16px',
  height: '70%',
  marginRight: '20px',
  width: '20%',
  minWidth: '300px',
});

export const CardHeading = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '20px',
});

export const AddButton = styled(Button)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: '400',
  color: theme.palette.primary.main,
  textTransform: 'capitalize',
}));

export const CollectionItem = styled(Box)({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  textDecoration: 'none',
  paddingLeft: '12px',
  height: '40px',
  cursor: 'pointer',

  '&.selected': {
    backgroundColor: '#E2E9F6',
  },

  '& .delete-btn': {
    display: 'none',
  },

  '&:hover': {
    backgroundColor: '#E2E9F6',

    '& .delete-btn': {
      display: 'flex',
    },
  },
});

export const ItemsWrapper = styled(Box)({
  height: '90%',

  '.ps__rail-x ps--clicking': {
    visibility: 'hidden',
  },
});

export const FieldItem = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  // justifyContent: 'space-between',
  textDecoration: 'none',
  height: '40px',
  color: theme.palette.content.tetiary,
  cursor: 'pointer',
}));

export const Loading = styled(Box)({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const Modal = styled(Dialog)({
  '&.MuiDialog-root .MuiDialog-paper': {
    minWidth: '532px',
    width: '532px',
    minHeight: '317px',
    padding: '20px',
  },
});

export const ModalHeading = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '20px',
});

export const Title = styled(typography.Heading)(({ theme }) => ({
  color: theme.palette.content.secondary,
  fontSize: '20px',
  fontWeight: '500',
}));

export const BTN = styled(Button)({
  textTransform: 'capitalize',
  marginTop: '20px',
  minWidth: '100px',
  ml: '6px',
});

export const ButtonWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
});
