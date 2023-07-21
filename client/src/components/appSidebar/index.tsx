import { ReactNode } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

const apps = [
  { id: 1, link: '/789782' },
  { id: 2, link: '/463y566g' },
  { id: 3, link: '/789753h382' },
  { id: 4, link: '/7896hg5356782' },
];

type AppLink = {
  children: ReactNode;
  link: string;
  className: string;
};

const AppLink = ({ children, link, className }: AppLink) => {
  return (
    <Link to={link} className={className}>
      {children}
    </Link>
  );
};

const AppSidebar = () => {
  return (
    <div className="w-[60px] h-[100%] bg-purple-900 flex flex-col px-1 py-4 items-center">
      <PerfectScrollbar>
        {apps.map((app) => (
          <AppLink
            className="border-2 border-white flex items-center justify-center w-[40px] h-[40px] rounded mb-2"
            key={app.id}
            link={app.link}
          >
            <Plus color="white" size={32} />
          </AppLink>
        ))}
      </PerfectScrollbar>

      <AppLink
        className="border-2 border-white flex items-center justify-center w-[40px] h-[40px] rounded"
        link="/create"
      >
        <Plus color="white" size={32} />
      </AppLink>
    </div>
  );
};

export default AppSidebar;
