import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { CircularProgress, IconButton, SxProps, useTheme } from '@mui/material';
import documentServices from '@service/documentServices';
import Toaster from '@component/toaster';
import { MoreVertical, Plus, X } from 'lucide-react';
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
import AddField from './addFields';
import { RequestError } from '@service/index';

type DocumentCardProps = {
  style?: SxProps;
  collection: string;
  project: string;
  selectedDocument: string;
  handleDocument: (doc: string) => void;
};

type AddDocumentModalProps = {
  open: boolean;
  handleClose: () => void;
  project: string;
  collection: string;
  refetch: () => void;
};

const AddDocumentModal = ({ open, handleClose, project, collection, refetch }: AddDocumentModalProps) => {
  const theme = useTheme();
  const [fieldEditor, setFieldEditor] = useState('');

  const handleEditorChange = (value: string) => setFieldEditor(value);

  const resetModal = () => {
    handleClose();
    setFieldEditor('');
  };

  const { mutate, isLoading } = useMutation<unknown, RequestError, { name: string; field: unknown }>({
    mutationKey: ['create_document', project],
    mutationFn: (data) => documentServices.createDocument(project, data),
    onSuccess: () => {
      refetch();
      resetModal();
    },
  });

  const handleSubmit = () => mutate({ name: collection, field: JSON.parse(fieldEditor) });

  return (
    <Modal open={open} onClose={resetModal}>
      <ModalHeading>
        <span />
        <Title>Add a Document</Title>
        <IconButton aria-label="close" onClick={resetModal}>
          <X color={theme.palette.content.tetiary} size={24} />
        </IconButton>
      </ModalHeading>

      <AddField handleEditorChange={handleEditorChange} />
      <ButtonWrapper>
        <BTN onClick={resetModal}>Cancel</BTN>
        <BTN onClick={handleSubmit} variant="contained" disabled={isLoading} size="large">
          Add
        </BTN>
      </ButtonWrapper>
    </Modal>
  );
};

const DocumentsCard = ({ style, collection, project, selectedDocument, handleDocument }: DocumentCardProps) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { isError, isLoading, data, refetch } = useQuery({
    queryKey: ['documents', project, collection],
    queryFn: () => documentServices.getDocuments(project, collection),
    retry: 0,
    enabled: false,
  });

  useEffect(() => {
    if (collection) {
      refetch();
    }
  }, [collection]);

  return (
    <Card elevation={0} sx={style}>
      <Toaster show={isError} message={'unable to get documents'} type="error" />
      <AddDocumentModal
        open={open}
        handleClose={handleClose}
        project={project}
        collection={collection}
        refetch={refetch}
      />
      <CardHeading>
        <CollectionHeading>{collection}</CollectionHeading>
        <AddButton
          onClick={handleOpen}
          disabled={!collection}
          sx={{ ml: 'auto' }}
          startIcon={<Plus color={collection ? theme.palette.primary.main : 'rgba(0, 0, 0, 0.26)'} size={20} />}
        >
          Add
        </AddButton>
        <IconButton aria-label="more">
          <MoreVertical color={theme.palette.content.tetiary} size={20} />
        </IconButton>
      </CardHeading>
      <ItemsWrapper>
        {isLoading ? (
          <Loading>
            <CircularProgress />
          </Loading>
        ) : (
          <PerfectScrollbar>
            {data?.data.map((doc) => (
              <CollectionItem
                key={doc}
                onClick={() => handleDocument(doc)}
                className={selectedDocument === doc ? 'selected' : ''}
              >
                <Paragraph>{doc}</Paragraph>
              </CollectionItem>
            ))}
          </PerfectScrollbar>
        )}
      </ItemsWrapper>
    </Card>
  );
};

export default DocumentsCard;
