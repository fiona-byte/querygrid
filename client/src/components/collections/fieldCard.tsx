import { Fragment, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { CircularProgress, IconButton, SxProps, useTheme } from '@mui/material';
import documentServices, { UpdateDocument } from '@service/documentServices';
import Toaster from '@component/toaster';
import { Plus, X } from 'lucide-react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Card,
  CardHeading,
  CollectionHeading,
  AddButton,
  ItemsWrapper,
  Loading,
  FieldItem,
  Modal,
  BTN,
  ButtonWrapper,
  ModalHeading,
  Title,
} from './styles';
import AddField from './addFields';
import { RequestError } from '@service/index';
import FieldCollapse from './fieldCollapse';
import { utils } from '@utils/index';
import { Can } from '@context/permissionContext';

type FieldCardProps = {
  style?: SxProps;
  collection: string;
  project: string;
  document: string;
};

type RenderFieldProps = {
  key: string;
  value: unknown;
  sx?: SxProps;
};

type AddFieldModalProps = {
  open: boolean;
  handleClose: () => void;
  project: string;
  collection: string;
  document: string;
  fieldData: unknown;
  refetch: () => void;
};

const AddFieldModal = ({
  open,
  handleClose,
  project,
  collection,
  document,
  refetch,
  fieldData,
}: AddFieldModalProps) => {
  const theme = useTheme();
  const [fieldEditor, setFieldEditor] = useState('');

  const handleEditorChange = (value: string) => setFieldEditor(value);

  const resetModal = () => {
    handleClose();
    setFieldEditor('');
  };

  const { mutate, isLoading } = useMutation<unknown, RequestError, UpdateDocument>({
    mutationKey: ['update_document', project],
    mutationFn: (data) => documentServices.updateDocument(project, data),
    onSuccess: () => {
      refetch();
      resetModal();
    },
  });

  const handleSubmit = () => mutate({ name: collection, document, field: JSON.parse(fieldEditor) });

  return (
    <Modal open={open} onClose={resetModal}>
      <ModalHeading>
        <span />
        <Title>Add a Field</Title>
        <IconButton aria-label="close" onClick={resetModal}>
          <X color={theme.palette.content.tetiary} size={24} />
        </IconButton>
      </ModalHeading>

      <AddField editorValue={fieldData} handleEditorChange={handleEditorChange} />
      <ButtonWrapper>
        <BTN onClick={resetModal}>Cancel</BTN>
        <BTN onClick={handleSubmit} variant="contained" disabled={isLoading} size="large">
          Add
        </BTN>
      </ButtonWrapper>
    </Modal>
  );
};

const renderField = ({ key, value, sx }: RenderFieldProps) => {
  if (typeof value === 'string') {
    return (
      <FieldItem key={`${key}-${Date.now()}`} sx={sx}>
        {key} : “{value}”
      </FieldItem>
    );
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return (
      <FieldItem key={`${key}-${Date.now()}`} sx={sx}>
        {key} : {value}
      </FieldItem>
    );
  }

  if (Array.isArray(value)) {
    return (
      <FieldCollapse
        key={`${key}-${Date.now()}`}
        sx={sx}
        startSymbol="&#91;"
        endSymbol="&#93;"
        property={key}
        value={value.join()}
      >
        {value.map((item, i) =>
          renderField({
            key: i.toString(),
            value: item,
            sx: { height: 'auto', ml: '40px' },
          }),
        )}
      </FieldCollapse>
    );
  }

  if (utils.isObject(value) && Object.keys(value as {}).length) {
    return (
      <FieldCollapse
        key={`${key}-${Date.now()}`}
        sx={sx}
        startSymbol=""
        endSymbol="&#125;"
        property={key}
        value={JSON.stringify(value)}
      >
        {Object.entries(value as {}).map(([itemKey, itemValue]) =>
          renderField({
            key: itemKey,
            value: itemValue,
            sx: { height: 'auto', ml: '40px' },
          }),
        )}
      </FieldCollapse>
    );
  }

  return null;
};

const FieldCard = ({ style, project, collection, document }: FieldCardProps) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { isError, isLoading, data, refetch } = useQuery({
    queryKey: ['document', project, collection, document],
    queryFn: () => documentServices.getDocument(project, collection, document),
    retry: 0,
    enabled: false,
  });

  useEffect(() => {
    if (collection && document) {
      refetch();
    }
  }, [collection, document]);

  return (
    <Card elevation={0} sx={style}>
      <Toaster show={isError} message={'unable to get document'} type="error" />
      <Can I="create" a="database">
        <AddFieldModal
          open={open}
          handleClose={handleClose}
          project={project}
          document={document}
          collection={collection}
          refetch={refetch}
          fieldData={data?.data}
        />
      </Can>

      <CardHeading>
        <CollectionHeading>Field</CollectionHeading>
        <Can I="create" a="database">
          <AddButton
            onClick={handleOpen}
            disabled={!document}
            startIcon={<Plus color={document ? theme.palette.primary.main : 'rgba(0, 0, 0, 0.26)'} size={20} />}
          >
            Add new field
          </AddButton>
        </Can>
      </CardHeading>
      <ItemsWrapper>
        {isLoading ? (
          <Loading>
            <CircularProgress />
          </Loading>
        ) : (
          <PerfectScrollbar options={{ suppressScrollX: true, useBothWheelAxes: false }}>
            {Object.entries(data?.data || {}).map(([key, value]) => (
              <Fragment key={`${key}-${Date.now()}`}>{renderField({ key, value })}</Fragment>
            ))}
          </PerfectScrollbar>
        )}
      </ItemsWrapper>
    </Card>
  );
};

export default FieldCard;
