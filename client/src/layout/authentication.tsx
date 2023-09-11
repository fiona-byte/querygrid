import { Button as MuiButton, Container as MuiContainer, GlobalStyles, Link as MuiLink } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import images from '@assets/images';
import UnionIcon from '@assets/svg/union';

const AuthLayout = () => {
  return (
    <>
      <GlobalStyles
        styles={{
          body: {
            background: 'linear-gradient(223.09deg, #487cdf 2.98%, #194bab 103.2%)',
          },
        }}
      />
      <AppLayout>
        <NavContainer>
          <Link href="https://querygrid.io">
            <Image src={images.appBrand} alt="querygrid" />
          </Link>
        </NavContainer>
        <Container>
          <FirstUnion />
          <Outlet />
          <SecondUnion />
          <BgEffect>
            {[1, 2, 3, 4, 5].map((i) => (
              <MiniEffect key={`mini-effect-${i}`}>
                <SmallEffect />
              </MiniEffect>
            ))}
            <Button variant="contained">Register</Button>
          </BgEffect>
        </Container>
      </AppLayout>
    </>
  );
};

const AppLayout = styled('div')`
  height: 100%;
`;

const NavContainer = styled(MuiContainer)`
  margin-bottom: 25px;
  height: 10%;
`;

const Link = styled(MuiLink)`
  height: 100%;
  display: inline-flex;
  align-items: center;
`;

const Image = styled('img')`
  height: 45px;
  max-width: 202px;
  width: 100%;

  @media (max-width: 600px) {
    height: 35px;
  }
`;

const Container = styled(MuiContainer)`
  position: relative;
  display: flex !important;
  justify-content: center;
  height: 80%;
`;

const FirstUnion = styled(UnionIcon)`
  position: absolute;
  left: 16px;
  bottom: 20%;

  @media (min-width: 600px) {
    left: 24px;
  }
`;

const SecondUnion = styled(UnionIcon)`
  position: absolute;
  right: 16px;
  top: 0;

  @media (min-width: 600px) {
    right: 24px;
  }
`;

const BgEffect = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #aabfe6;
  border-radius: 8px;
  position: absolute;
  padding: 60px 40px;
  top: 10%;
  right: 12%;
`;

const MiniEffect = styled('div')`
  width: 276px;
  height: 47px;
  background: rgba(255, 255, 255, 0.45);
  box-shadow: inset 0px -1px 10px rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(5px);
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 0px 20px;
  margin-bottom: 10px;
`;

const SmallEffect = styled('div')`
  width: 120px;
  height: 8px;
  background: #14213d;
  opacity: 0.5;
  border-radius: 2px;
`;

const Button = styled(MuiButton)`
  font-family: 'IBM Plex Sans';
  height: 40px;
  background: #ffc727 !important;
  opacity: 0.8;
  font-size: 14px;
  line-height: 120%;
  color: #000000;
  opacity: 0.5;
  cursor: default;
`;

export default AuthLayout;
