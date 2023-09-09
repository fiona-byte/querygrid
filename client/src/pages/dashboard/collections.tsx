import { Fragment, ReactNode, useState } from 'react';
import { Box, Button, IconButton, styled, Card as MuiCard, useTheme, SxProps, Collapse } from '@mui/material';
import { Link } from 'react-router-dom';
import { Plus, Trash2, MoreVertical, Triangle } from 'lucide-react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PageLayout from '@layout/page';
import Typography from '@component/typography';
import { utils } from '@utils/index';

type CollectionCardProps = {
  style?: SxProps;
  to: string;
};

const JSONObject = {
  name: 'collection',
  id: '64ee8c7ce87a3b1823ab0ea0',
  status: 'active',
  collections: [
    'food',
    'food',
    'food',
    'food',
    'food',
    'food',
    'food',
    'food',
    'food',
    {
      name: 'food',
      id: '64ee8c7ce87a3b1823ab0ea0',
      status: 'active',
      mode: {
        name: 'food',
        id: '64ee8c7ce87a3b1823ab0ea0',
        status: 'active',
      },
    },
  ],
  food: {
    name: 'food',
    id: '64ee8c7ce87a3b1823ab0ea0',
    status: 'active',
    meg: {
      name: 'food',
      id: '64ee8c7ce87a3b1823ab0ea0',
      status: 'active',
    },
  },
};

type FieldCollapseProps = {
  property: string;
  value: string;
  children: ReactNode;
  startSymbol: string;
  endSymbol: string;
  sx?: SxProps;
};

const FieldCollapse = ({ property, children, value, startSymbol, endSymbol, sx }: FieldCollapseProps) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  return (
    <Fragment>
      <FieldItem sx={sx} onClick={() => setOpen(!open)}>
        {open ? (
          <Triangle
            style={{ marginRight: '6px', transform: 'rotate(180deg)' }}
            size={10}
            fill={theme.palette.content.tetiary}
          />
        ) : (
          <Triangle
            style={{ marginRight: '6px', transform: 'rotate(90deg)' }}
            size={10}
            fill={theme.palette.content.tetiary}
          />
        )}
        {property}
        {!open ? (
          <>
            :{startSymbol}
            <Paragraph sx={{ width: '110px' }} noWrap={true}>
              {value}
            </Paragraph>
            {endSymbol}
          </>
        ) : null}
      </FieldItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </Fragment>
  );
};

const CollectionsCard = ({ style, to }: CollectionCardProps) => {
  const theme = useTheme();
  return (
    <Card elevation={0} sx={style}>
      <CardHeading>
        <CollectionHeading>Collections</CollectionHeading>
        <AddButton startIcon={<Plus color={theme.palette.primary.main} size={20} />}>Add</AddButton>
      </CardHeading>
      <ItemsWrapper>
        <PerfectScrollbar>
          <CollectionItem to={to}>
            <Paragraph>users</Paragraph>
            <IconButton aria-label="delete" className="delete-btn">
              <Trash2 />
            </IconButton>
          </CollectionItem>
        </PerfectScrollbar>
      </ItemsWrapper>
    </Card>
  );
};

const DocumentsCard = ({ style, to }: CollectionCardProps) => {
  const theme = useTheme();
  return (
    <Card elevation={0} sx={style}>
      <CardHeading>
        <CollectionHeading>users</CollectionHeading>
        <AddButton sx={{ ml: 'auto' }} startIcon={<Plus color={theme.palette.primary.main} size={20} />}>
          Add
        </AddButton>
        <IconButton aria-label="more">
          <MoreVertical color={theme.palette.content.tetiary} size={20} />
        </IconButton>
      </CardHeading>
      <ItemsWrapper>
        <PerfectScrollbar>
          <CollectionItem to={to}>
            <Paragraph>users</Paragraph>
          </CollectionItem>
        </PerfectScrollbar>
      </ItemsWrapper>
    </Card>
  );
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
      <FieldCollapse sx={sx} startSymbol="&#91;" endSymbol="&#93;" property={key} value={value.join()}>
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
      <FieldCollapse sx={sx} startSymbol="" endSymbol="&#125;" property={key} value={JSON.stringify(value)}>
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

const FieldCard = ({ style }: CollectionCardProps) => {
  const theme = useTheme();

  return (
    <Card elevation={0} sx={style}>
      <CardHeading>
        <CollectionHeading>Field</CollectionHeading>
        <AddButton startIcon={<Plus color={theme.palette.primary.main} size={20} />}>Add new field</AddButton>
      </CardHeading>
      <ItemsWrapper>
        <PerfectScrollbar options={{ suppressScrollX: true, useBothWheelAxes: false }}>
          {Object.entries(JSONObject).map(([key, value]) => (
            <Fragment key={key}>{renderField({ key, value })}</Fragment>
          ))}
        </PerfectScrollbar>
      </ItemsWrapper>
    </Card>
  );
};

const Collections = () => {
  return (
    <PageLayout page="Collections">
      <PageHeading>Collections</PageHeading>
      <CollectionWrapper>
        <CollectionsCard to="/project/64ee8c7ce87a3b1823ab0ea0/collections" />
        <DocumentsCard to="/project/64ee8c7ce87a3b1823ab0ea0/collections" />
        <FieldCard to="/project/64ee8c7ce87a3b1823ab0ea0/collections" style={{ mr: '0px', flexGrow: 1 }} />
      </CollectionWrapper>
    </PageLayout>
  );
};

const PageHeading = styled(Typography.Heading)(({ theme }) => ({
  fontSize: '20px',
  fontWeight: '500',
  color: theme.palette.content.secondary,
}));

const CollectionHeading = styled(Typography.Paragraph)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: '500',
  color: theme.palette.content.tetiary,
}));

const Paragraph = styled(Typography.Paragraph)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: '400',
  color: theme.palette.content.tetiary,
  textTransform: 'lowercase',
}));

const Card = styled(MuiCard)({
  padding: '16px',
  height: '70%',
  marginRight: '20px',
  width: '20%',
  minWidth: '300px',
});

const CardHeading = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '20px',
});

const AddButton = styled(Button)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: '400',
  color: theme.palette.primary.main,
  textTransform: 'capitalize',
}));

const CollectionWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  marginTop: '40px',
  height: '100%',
});

const CollectionItem = styled(Link)({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  textDecoration: 'none',
  paddingLeft: '12px',
  height: '40px',

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

const ItemsWrapper = styled(Box)({
  height: '90%',

  '.ps__rail-x ps--clicking': {
    visibility: 'hidden',
  },
});

const FieldItem = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  // justifyContent: 'space-between',
  textDecoration: 'none',
  height: '40px',
  color: theme.palette.content.tetiary,
}));

export default Collections;
