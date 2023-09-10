import { Fragment, ReactNode, useState } from 'react';
import { Collapse, SxProps, useTheme } from '@mui/material';
import { Triangle } from 'lucide-react';
import { FieldItem, Paragraph } from './styles';

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

export default FieldCollapse;
