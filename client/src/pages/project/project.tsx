import { useState } from 'react';
import { Box, Button, Container, Input, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Typography from '@component/typography';
import { Search } from 'lucide-react';
import images from '@assets/images';
import NewProject from '@component/newProject';

type ProjectItem = {
  name: string;
  id: string;
  status: string;
};

const ProjectItem = ({ name, id, status }: ProjectItem) => {
  return (
    <ProjectCard to={`/project/${id}`}>
      <img width={32} height={32} src={images.project} alt={name} />
      <Heading sx={{ ml: '8px', color: '#57565D' }} variant="h5">
        {name}
      </Heading>

      <Paragraph sx={{ ml: 'auto', color: '#57565D', fontSize: '16px' }}>{status}</Paragraph>
    </ProjectCard>
  );
};

const Project = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const openHandler = () => setOpen(true);
  const closeHandler = () => setOpen(false);

  return (
    <Box>
      <NewProject open={open} closeHandler={closeHandler} />
      <Box sx={{ backgroundColor: '#ECF1F9' }}>
        <TopWrapper maxWidth="lg">
          <Heading variant="h5">{t('translations:projects')}</Heading>
          <NewProjectBTN variant="contained" onClick={openHandler}>
            <Paragraph sx={{ textTransform: 'capitalize' }}>{t('translations:new_project')}</Paragraph>
          </NewProjectBTN>
        </TopWrapper>
      </Box>
      <SearchContainer>
        <SearchWrapper>
          <Search size={24} color="#57565C" />
          <SearchInput fullWidth disableUnderline={true} placeholder={t('translations:browse_projects')} />
        </SearchWrapper>
      </SearchContainer>
      <ProjectContainer>
        <ProjectItem name="Fiona" id="jlkjklj" status={t(`translations:${'active'}`)} />
      </ProjectContainer>
    </Box>
  );
};

const TopWrapper = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 92px;

  @media (max-width: 768px) {
    height: 60px;
  }
`;

const NewProjectBTN = styled(Button)(({ theme }) => ({
  display: 'flex',
  backgroundColor: theme.palette.primary.main,
  color: '#ffffff',
  borderRadius: '4px',
  padding: '12px 30px',
  textDecoration: 'none',

  '@media (max-width: 768px)': {
    padding: '10px 20px',
  },
}));

const Paragraph = styled(Typography.Paragraph)`
  font-size: 14px;
  font-weight: 500;
`;

const Heading = styled(Typography.Heading)`
  font-size: 25px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const SearchContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;

  @media (max-width: 768px) {
    margin-top: 16px;
  }
`;

const SearchWrapper = styled(Box)`
  display: flex;
  align-items: center;
  border-radius: 5px;
  border: 1px solid #bcbbbe;
  width: 300px;
  padding: 8px 9px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SearchInput = styled(Input)`
  font-size: 16px;
  margin-left: 16px;
  color: #57565c;

  input {
    padding: 0px;
  }
`;

const ProjectContainer = styled(Container)`
  margin-top: 40px;

  @media (max-width: 768px) {
    margin-top: 24px;
  }
`;

const ProjectCard = styled(Link)`
  display: flex;
  align-items: center;
  height: 64px;
  border-bottom: 1px solid #c6d4ee;
  text-decoration: none;
`;

export default Project;
