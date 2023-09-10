import { styled, Box, Button, Card as MuiCard } from '@mui/material';
import Typography from '@component/typography';

export const CollectionHeading = styled(Typography.Paragraph)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: '500',
  color: theme.palette.content.tetiary,
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

export const CollectionItem = styled(Button)({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  textDecoration: 'none',
  paddingLeft: '12px',
  height: '40px',

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
}));

export const Loading = styled(Box)({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
