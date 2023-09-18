import typography from '@component/typography';
import { Box, styled, useTheme } from '@mui/material';
import { MousePointerClick, SearchX } from 'lucide-react';

type Options = {
  isEmpty: boolean;
  section?: string;
  currentSection?: string;
};

const NotificationMessage = ({ isEmpty, section, currentSection }: Options) => {
  const theme = useTheme();

  return (
    <Wrapper>
      <IconWrapper>
        {isEmpty ? (
          <SearchX size={24} color={theme.palette.content.tetiary} />
        ) : (
          <MousePointerClick size={24} color={theme.palette.content.tetiary} />
        )}
      </IconWrapper>
      {isEmpty ? (
        <Paragraph>Nothing to show</Paragraph>
      ) : (
        <Paragraph>
          Select a {section} to show {currentSection}
        </Paragraph>
      )}
    </Wrapper>
  );
};

const Wrapper = styled(Box)({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
});

const IconWrapper = styled(Box)({
  backgroundColor: '#E2E9F6',
  width: '48px',
  height: '48px',
  borderRadius: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Paragraph = styled(typography.Paragraph)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: '400',
  color: theme.palette.content.tetiary,
  marginTop: '18px',
  textAlign: 'center',
}));

export default NotificationMessage;
