import { useState } from 'react';
import { Box, styled } from '@mui/material';
import { useParams } from 'react-router-dom';
import PageLayout from '@layout/page';
import Typography from '@component/typography';
import { useQuery } from '@tanstack/react-query';
import collectionServices from '@service/collectionServices';
import Toaster from '@component/toaster';
import CollectionsCard from '@component/collections/collectionCard';
import DocumentsCard from '@component/collections/documentCard';
import FieldCard from '@component/collections/fieldCard';

const Collections = () => {
  const { project } = useParams() as { project: string };
  const [selectedCollection, setSelectedCollection] = useState('');
  const [selectedDocument, setSelectedDocument] = useState('');

  const handleDocument = (doc: string) => setSelectedDocument(doc);
  const handleSelected = (collection: string) => setSelectedCollection(collection);

  const { isError, isLoading, data } = useQuery({
    queryKey: ['collections', project],
    queryFn: () => collectionServices.getCollections(project),
    retry: 0,
  });

  return (
    <PageLayout page="Collections">
      <Toaster show={isError} message={'unable to get collections'} type="error" />
      <PageHeading>Collections</PageHeading>
      <CollectionWrapper>
        <CollectionsCard
          handleSelected={handleSelected}
          selected={selectedCollection}
          isLoading={isLoading}
          collections={data?.data || []}
        />
        <DocumentsCard
          selectedDocument={selectedDocument}
          handleDocument={handleDocument}
          collection={selectedCollection}
          project={project}
        />
        <FieldCard
          collection={selectedCollection}
          project={project}
          document={selectedDocument}
          style={{ mr: '0px', flexGrow: 1 }}
        />
      </CollectionWrapper>
    </PageLayout>
  );
};

const PageHeading = styled(Typography.Heading)(({ theme }) => ({
  fontSize: '20px',
  fontWeight: '500',
  color: theme.palette.content.secondary,
}));

const CollectionWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  marginTop: '40px',
  height: '100%',
});

export default Collections;
