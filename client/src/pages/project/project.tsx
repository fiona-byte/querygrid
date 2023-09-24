import { ChangeEvent, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Button, Container, IconButton, Input, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Typography from '@component/typography';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import images from '@assets/images';
import NewProject from '@component/newProject';
import projectServices from '@service/projectServices';
import { useDebounce } from '@hooks/useDebounce';
import { Can } from '@context/permissionContext';
import PageLayout from '@layout/page';
import { utils } from '@utils/index';
import Toaster from '@component/toaster';

type Project = {
  name: string;
  id: string;
  status: string;
};

const ProjectItem = ({ name, id, status }: Project) => {
  return (
    <ProjectCard to={`/project/${id}`}>
      <img width={32} height={32} src={images.project} alt={name} />
      <Heading noWrap sx={{ ml: '8px', color: '#57565D', fontSize: '16px' }} variant="h5">
        {name}
      </Heading>

      <Paragraph sx={{ ml: 'auto', color: '#57565D', fontSize: '14px' }}>{status}</Paragraph>
    </ProjectCard>
  );
};
const Project = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState<string | undefined>();
  const [page, setPage] = useState(1);
  const debouncedValue = useDebounce(search, 500);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value || undefined);
  };

  const openHandler = () => setOpen(true);
  const closeHandler = () => setOpen(false);

  const { data: projectQuery, isError } = useQuery({
    queryKey: ['projects', debouncedValue, page],
    queryFn: () => projectServices.projects(debouncedValue, page),
    retry: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  return (
    <PageLayout page="Projects">
      <Toaster show={isError} message={'something went wrong'} type="error" />
      <NewProject open={open} closeHandler={closeHandler} />
      <Box sx={{ backgroundColor: '#ECF1F9' }}>
        <TopWrapper maxWidth="lg">
          <Heading variant="h5">
            {t('translations:projects')}
            {!!projectQuery?.data?.count && `(${projectQuery?.data?.count})`}
          </Heading>
          <Can I="create" a="project">
            <NewProjectBTN variant="contained" onClick={openHandler}>
              <Paragraph sx={{ textTransform: 'capitalize' }}>{t('translations:new_project')}</Paragraph>
            </NewProjectBTN>
          </Can>
        </TopWrapper>
      </Box>
      <SearchContainer>
        <SearchWrapper>
          <Search size={24} color="#57565C" />
          <SearchInput
            value={search}
            onChange={handleChange}
            fullWidth
            disableUnderline={true}
            placeholder={t('translations:browse_projects')}
          />
        </SearchWrapper>
      </SearchContainer>
      {projectQuery?.data?.projects?.length ? (
        <>
          <ProjectContainer>
            {projectQuery?.data.projects.map((project) => (
              <ProjectItem
                key={project.id}
                name={project.name}
                id={project.id}
                status={t(`translations:${project.status}`)}
              />
            ))}
          </ProjectContainer>
          <PaginationContainer>
            <PaginationButton
              disabled={!utils.hasPrevious(projectQuery.data.current_page)}
              onClick={() => setPage(projectQuery.data.current_page - 1)}
            >
              <ChevronLeft size={24} color="#57565C" />
            </PaginationButton>
            <PaginationButton
              disabled={!utils.hasNext(projectQuery.data.current_page, projectQuery.data.total_pages)}
              onClick={() => setPage(projectQuery.data.current_page + 1)}
            >
              <ChevronRight size={24} color="#57565C" />
            </PaginationButton>
          </PaginationContainer>
        </>
      ) : (
        <p>No Projects</p>
      )}
    </PageLayout>
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

const PaginationButton = styled(IconButton)({
  '&.MuiButtonBase-root:disabled': {
    cursor: 'not-allowed',
    pointerEvents: 'auto',
  },
});

export default Project;
