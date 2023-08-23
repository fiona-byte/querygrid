import Typography from '@component/typography';
import { Box, styled } from '@mui/material';

const AppFooter = () => {
  return (
    <FooterWrapper>
      <CopyRight>&copy; {new Date().getFullYear()} QueryGrid. All rights reserved</CopyRight>
    </FooterWrapper>
  );
};

const FooterWrapper = styled(Box)({
  backgroundColor: '#111929',
  height: '60px',
  marginTop: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const CopyRight = styled(Typography.Paragraph)({
  color: '#E5E5E5',
  fontSize: '12px',
  fontWeight: '400',
});

export default AppFooter;
