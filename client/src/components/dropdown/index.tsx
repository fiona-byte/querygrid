import { MouseEvent, ReactNode } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';

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
  return (
    <Box sx={{ flexGrow: 0, mr: dropdown.mr, ml: dropdown.ml }}>
      <Tooltip title={dropdown.tooltip}>
        <IconButton onClick={dropdown.openMenu} sx={{ p: 0 }}>
          {dropdown.title}
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '25px' }}
        id={dropdown.id}
        anchorEl={dropdown.open}
        elevation={1}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(dropdown.open)}
        onClose={dropdown.closeMenu}
      >
        {dropdown.children}
      </Menu>
    </Box>
  );
};

export default Dropdown;
