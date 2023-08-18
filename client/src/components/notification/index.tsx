import Typography from '@component/typography';
import { Box, Divider, Drawer, IconButton, styled } from '@mui/material';
import { X } from 'lucide-react';

const notifications = [
  {
    id: '1232',
    title: 'Lorem ipsum dolor set amet',
    content:
      'Lorem ipsum dolor sit amet consectetur. Ornare vitae diam posuere etiam hac pellentesque ut penatibus. Donec enim nunc ultrices felis.',
    read: false,
  },
  {
    id: '4352',
    title: 'Lorem ipsum dolor set amet',
    content:
      'Lorem ipsum dolor sit amet consectetur. Ornare vitae diam posuere etiam hac pellentesque ut penatibus. Donec enim nunc ultrices felis.',
    read: true,
  },
  {
    id: '972489',
    title: 'Lorem ipsum dolor set amet',
    content:
      'Lorem ipsum dolor sit amet consectetur. Ornare vitae diam posuere etiam hac pellentesque ut penatibus. Donec enim nunc ultrices felis.',
    read: true,
  },
];

type Notification = {
  open: boolean;
  closeNotification: () => void;
};

const UnreadIcon = () => (
  <svg
    style={{ marginLeft: '16px' }}
    xmlns="http://www.w3.org/2000/svg"
    width="6"
    height="7"
    viewBox="0 0 6 7"
    fill="none"
  >
    <circle cx="2.99927" cy="3.5" r="3" fill="#557ECD" />
  </svg>
);

const Notification = ({ open, closeNotification }: Notification) => {
  return (
    <Drawer anchor="right" open={open} onClose={closeNotification}>
      <Box
        sx={{ maxWidth: '360px', width: '100%' }}
        role="presentation"
        onClick={closeNotification}
        onKeyDown={closeNotification}
      >
        <TopWrapper sx={{ display: 'flex', alignItems: 'center' }}>
          <Heading variant="h4">Notifications (1)</Heading>
          <IconButton onClick={closeNotification}>
            <X color="#35343C" size={24} />
          </IconButton>
        </TopWrapper>
        <Box>
          {notifications.map((notification) => (
            <>
              <Item key={notification.id}>
                <ItemTitle>
                  <Heading variant="h4" sx={{ fontSize: '16px' }}>
                    {notification.title}
                  </Heading>
                  <Paragraph
                    sx={{
                      ml: 'auto',
                      fontSize: '12px',
                      fontWeight: notification.read ? '400' : '500',
                      color: '#35343c',
                    }}
                  >
                    1m
                  </Paragraph>
                  {!notification.read && <UnreadIcon />}
                </ItemTitle>
                <Paragraph sx={{ fontWeight: notification.read ? '400' : '500' }}>{notification.content}</Paragraph>
              </Item>
              <Divider sx={{ borderColor: '#C6D4EE' }} />
            </>
          ))}
        </Box>
      </Box>
    </Drawer>
  );
};

const TopWrapper = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 24px;
`;

const Heading = styled(Typography.Heading)`
  color: #35343c;
  font-size: 20px;
  font-weight: 500;
`;

const Item = styled(Box)`
  margin: 20px 24px;
`;

const ItemTitle = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const Paragraph = styled(Typography.Paragraph)`
  color: #78787d;
  font-weight: 400;
  font-size: 14px;
`;

export default Notification;
