import { useState } from 'react';
import { Box, CircularProgress, IconButton, LinearProgress, SxProps, styled, useTheme } from '@mui/material';
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
  Modal,
  BTN,
  ButtonWrapper,
  ModalHeading,
  Title,
} from './styles';
import typography from '@component/typography';
import { useParams } from 'react-router-dom';
import AddCollection from './modals/addCollection';
import AddField from './addFields';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RequestError } from '@service/index';
import collectionServices from '@service/collectionServices';
import { Can } from '@context/permissionContext';
import NotificationMessage from './notificationMessage';

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
  const queryClient = useQueryClient();
  const { project } = useParams() as { project: string };
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [collection, setCollection] = useState('');
  const [fieldEditor, setFieldEditor] = useState('');

  const handleNext = (collectionName: string) => {
    setCollection(collectionName);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleEditorChange = (value: string) => setFieldEditor(value);

  const resetModal = () => {
    handleClose();
    setCollection('');
    setFieldEditor('');
    setActiveStep(0);
  };

  const { mutate, isLoading } = useMutation<unknown, RequestError, { name: string; field: unknown }>({
    mutationKey: ['create_collection', project],
    mutationFn: (data) => collectionServices.createCollection(project, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['collections']);
      resetModal();
    },
  });

  const handleSubmit = () => mutate({ name: collection, field: JSON.parse(fieldEditor) });

  return (
    <Modal open={open} onClose={resetModal}>
      <ModalHeading>
        <span />
        <Title>Add a Collection</Title>
        <IconButton aria-label="close" onClick={resetModal}>
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
            <AddField handleEditorChange={handleEditorChange} />
            <ButtonWrapper>
              <BTN onClick={resetModal}>Cancel</BTN>
              <BTN onClick={handleSubmit} variant="contained" disabled={isLoading} size="large">
                Add
              </BTN>
            </ButtonWrapper>
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
      <Can I="create" a="database">
        <AddCollectionModal open={open} handleClose={handleClose} />
      </Can>
      <CardHeading>
        <CollectionHeading>Collections</CollectionHeading>
        <Can I="create" a="database">
          <AddButton onClick={handleOpen} startIcon={<Plus color={theme.palette.primary.main} size={20} />}>
            Add
          </AddButton>
        </Can>
      </CardHeading>
      <ItemsWrapper>
        {isLoading ? (
          <Loading>
            <CircularProgress />
          </Loading>
        ) : (
          <>
            {!collections.length ? (
              <NotificationMessage isEmpty={!collections.length} />
            ) : (
              <PerfectScrollbar>
                {collections.map((collection) => (
                  <CollectionItem
                    onClick={() => handleSelected(collection)}
                    key={collection}
                    className={selected === collection ? 'selected' : ''}
                  >
                    <Paragraph>{collection}</Paragraph>
                    <Can I="delete" a="database">
                      <IconButton aria-label="delete" className="delete-btn">
                        <Trash2 />
                      </IconButton>
                    </Can>
                  </CollectionItem>
                ))}
              </PerfectScrollbar>
            )}
          </>
        )}
      </ItemsWrapper>
    </Card>
  );
};

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
