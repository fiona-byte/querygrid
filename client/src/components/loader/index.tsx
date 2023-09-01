import images from '@assets/images';
import { Box, styled } from '@mui/material';

const Loader = () => {
  return (
    <LoaderWrapper>
      <Image src={images.logoAnimate} alt="querygrid" />
    </LoaderWrapper>
  );
};

const LoaderWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  backgroundColor: '#FCFCFC',
  position: 'fixed',
  top: '0px',
  zIndex: 1000,
});

const Image = styled('img')({
  width: '250px',
  height: '200px',
});

export default Loader;
