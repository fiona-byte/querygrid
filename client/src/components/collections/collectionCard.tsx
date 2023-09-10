import { CircularProgress, IconButton, SxProps, useTheme } from '@mui/material';
import { Plus, Trash2 } from 'lucide-react';
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

type CollectionCardProps = {
  style?: SxProps;
  isLoading: boolean;
  collections: string[];
  selected: string;
  handleSelected: (collection: string) => void;
};

const CollectionsCard = ({ style, isLoading, collections, selected, handleSelected }: CollectionCardProps) => {
  const theme = useTheme();
  return (
    <Card elevation={0} sx={style}>
      <CardHeading>
        <CollectionHeading>Collections</CollectionHeading>
        <AddButton startIcon={<Plus color={theme.palette.primary.main} size={20} />}>Add</AddButton>
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

export default CollectionsCard;
