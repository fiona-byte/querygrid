import { Fragment, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CircularProgress, SxProps, useTheme } from '@mui/material';
import documentServices from '@service/documentServices';
import Toaster from '@component/toaster';
import { Plus } from 'lucide-react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Card, CardHeading, CollectionHeading, AddButton, ItemsWrapper, Loading, FieldItem } from './styles';
import FieldCollapse from './fieldCollapse';
import { utils } from '@utils/index';

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
      <CardHeading>
        <CollectionHeading>Field</CollectionHeading>
        <AddButton startIcon={<Plus color={theme.palette.primary.main} size={20} />}>Add new field</AddButton>
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
