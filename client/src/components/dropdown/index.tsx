import { MouseEvent, ReactNode } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material';
import { useMobile } from '@hooks/useMobile';

type DropdownProps = {
  tooltip: string;
  open: null | HTMLElement;
  openMenu: (event: MouseEvent<HTMLElement>) => void;
  closeMenu: () => void;
  title: JSX.Element;
  id: string;
  mr?: string;
  ml?: string;
  children?: ReactNode;
};

const Dropdown = (dropdown: DropdownProps) => {
  const isMobile = useMobile();

  return (
    <Box sx={{ flexGrow: 0, mr: dropdown.mr, ml: dropdown.ml }}>
      <Tooltip title={dropdown.tooltip}>
        <IconButton onClick={dropdown.openMenu} sx={{ p: 0 }}>
          {dropdown.title}
        </IconButton>
      </Tooltip>
      <DropdownMenu
        id={dropdown.id}
        anchorEl={dropdown.open}
        elevation={1}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{ marginTop: isMobile ? '56px' : '64px' }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(dropdown.open)}
        onClose={dropdown.closeMenu}
      >
        {dropdown.children}
      </DropdownMenu>
    </Box>
  );
};

const DropdownMenu = styled(Menu)`
  .MuiMenu-paper {
    border-radius: 0px;
    top: 0px !important;
  }
`;

export default Dropdown;
