import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Button, Container, IconButton, Input, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Typography from '@component/typography';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import images from '@assets/images';
import NewProject from '@component/newProject';
import projectServices from '@service/projectServices';
import { useToaster } from '@hooks/useToaster';
import { usePagination } from '@hooks/usePagination';

type ProjectItem = {
  name: string;
  id: string;
  status: string;
};

type Projects = {
  project: ProjectItem;
};

const ProjectItem = ({ name, id, status }: ProjectItem) => {
  return (
    <ProjectCard to={`/project/${id}`}>
      <img width={32} height={32} src={images.project} alt={name} />
      <Heading sx={{ ml: '8px', color: '#57565D', fontSize: '16px' }} variant="h5">
        {name}
      </Heading>

      <Paragraph sx={{ ml: 'auto', color: '#57565D', fontSize: '14px' }}>{status}</Paragraph>
    </ProjectCard>
  );
};

const Project = () => {
  const toaster = useToaster();
  const { t } = useTranslation();
  const { paginate, paginationHandler } = usePagination();
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState<Projects[]>([]);

  const openHandler = () => setOpen(true);
  const closeHandler = () => setOpen(false);

  useQuery(['projects', paginate], () => projectServices.projects(paginate), {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    onError: (error: any) => {
      const message = error?.response?.data?.errors;
      toaster.triggerToast({ message: message || 'something went wrong', type: 'error' });
    },
    onSuccess: ({ data }) => {
      setProjects(data.data);
    },
  });

  const loadNextPage = () => {
    paginationHandler(false);
  };

  const loadPrevPage = () => {
    paginationHandler(true);
  };

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
        {projects.map(({ project }) => (
          <ProjectItem
            key={project.id}
            name={project.name}
            id={project.id}
            status={t(`translations:${project.status}`)}
          />
        ))}
      </ProjectContainer>
      <PaginationContainer>
        <IconButton onClick={loadPrevPage}>
          <ChevronLeft size={24} color="#57565C" />
        </IconButton>
        <IconButton onClick={loadNextPage}>
          <ChevronRight size={24} color="#57565C" />
        </IconButton>
      </PaginationContainer>
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
  font-weight: 600;
  text-transform: capitalize;

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
  border-bottom: 1px solid #c6d4ee;
  text-decoration: none;
  padding-top: 16px;
  padding-bottom: 16px;

  &:hover {
    background-color: #f6f6f6;
  }
`;

const PaginationContainer = styled(Container)`
  margin-top: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Project;
