import { useState } from 'react';
import { Box, CircularProgress, Dialog, IconButton, LinearProgress, SxProps, styled, useTheme } from '@mui/material';
import { Plus, Trash2, X } from 'lucide-react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Card,
  CardHeading,
  CollectionHeading,
  AddButton,
  ItemsWrapper,
  Loading,
  CollectionItem,
  Paragraph,
} from './styles';
import typography from '@component/typography';
import { useParams } from 'react-router-dom';
import AddCollection from './modals/addCollection';
import AddField from './addFields';

type CollectionCardProps = {
  style?: SxProps;
  isLoading: boolean;
  collections: string[];
  selected: string;
  handleSelected: (collection: string) => void;
};

type AddCollectionModalProps = {
  open: boolean;
  handleClose: () => void;
};

const steps = ['Step 1: Create a collection', 'Step 2: Add a document'];
const AddCollectionModal = ({ open, handleClose }: AddCollectionModalProps) => {
  const { project } = useParams() as { project: string };
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <ModalHeading>
        <span />
        <Title>Add a Collection</Title>
        <IconButton aria-label="close" onClick={handleClose}>
          <X color={theme.palette.content.tetiary} size={24} />
        </IconButton>
      </ModalHeading>

      <Stepper>
        {steps.map((label, i) => (
          <Step key={`step-${i}`}>
            <StepTitle className={activeStep === i ? 'active' : ''}>{label}</StepTitle>
            <LinearProgress variant="determinate" value={activeStep === i ? 100 : 0} />
          </Step>
        ))}
      </Stepper>
      <StepContent>
        {activeStep === 0 ? (
          <AddCollection project={project} handleNext={handleNext} />
        ) : (
          <>
            <AddField />
          </>
        )}
      </StepContent>
    </Modal>
  );
};

const CollectionsCard = ({ style, isLoading, collections, selected, handleSelected }: CollectionCardProps) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Card elevation={0} sx={style}>
      <AddCollectionModal open={open} handleClose={handleClose} />
      <CardHeading>
        <CollectionHeading>Collections</CollectionHeading>
        <AddButton onClick={handleOpen} startIcon={<Plus color={theme.palette.primary.main} size={20} />}>
          Add
        </AddButton>
      </CardHeading>
      <ItemsWrapper>
        {isLoading ? (
          <Loading>
            <CircularProgress />
          </Loading>
        ) : (
          <PerfectScrollbar>
            {collections.map((collection) => (
              <CollectionItem
                onClick={() => handleSelected(collection)}
                key={collection}
                className={selected === collection ? 'selected' : ''}
              >
                <Paragraph>{collection}</Paragraph>
                <IconButton aria-label="delete" className="delete-btn">
                  <Trash2 />
                </IconButton>
              </CollectionItem>
            ))}
          </PerfectScrollbar>
        )}
      </ItemsWrapper>
    </Card>
  );
};

const Modal = styled(Dialog)({
  '&.MuiDialog-root .MuiPaper-root': {
    minWidth: '532px',
    width: '532px',
    minHeight: '317px',
    padding: '20px',
  },
});

const ModalHeading = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '20px',
});

const Stepper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
});

const Step = styled(Box)({
  width: '50%',
});

const StepContent = styled(Box)({
  marginTop: '20px',
});

const Title = styled(typography.Heading)(({ theme }) => ({
  color: theme.palette.content.secondary,
  fontSize: '20px',
  fontWeight: '500',
}));

const StepTitle = styled(typography.Paragraph)(({ theme }) => ({
  color: '#9A999D',
  fontSize: '14px',
  fontWeight: '500',
  marginBottom: '8px',

  '&.MuiTypography-root.active': {
    color: theme.palette.primary.main,
  },
}));

export default CollectionsCard;
