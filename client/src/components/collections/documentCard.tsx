import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CircularProgress, IconButton, SxProps, useTheme } from '@mui/material';
import documentServices from '@service/documentServices';
import Toaster from '@component/toaster';
import { MoreVertical, Plus } from 'lucide-react';
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

type DocumentCardProps = {
  style?: SxProps;
  collection: string;
  project: string;
  selectedDocument: string;
  handleDocument: (doc: string) => void;
};

const DocumentsCard = ({ style, collection, project, selectedDocument, handleDocument }: DocumentCardProps) => {
  const theme = useTheme();

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
      <CardHeading>
        <CollectionHeading>{collection}</CollectionHeading>
        <AddButton sx={{ ml: 'auto' }} startIcon={<Plus color={theme.palette.primary.main} size={20} />}>
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
