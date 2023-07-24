import { ReactNode } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { clsx } from 'clsx';

const apps = [
  { id: 1, link: '/789782' },
  { id: 2, link: '/463y566g' },
  { id: 3, link: '/789753h382' },
  { id: 4, link: '/7896hg5356782' },
];

type AppLink = {
  children: ReactNode;
  link: string;
  className?: string;
};

const AppLink = ({ children, link, className }: AppLink) => {
  return (
    <Link
      to={link}
      className={clsx(
        'border-2 border-white flex items-center justify-center w-9 h-9 rounded',
        className
      )}
    >
      {children}
    </Link>
  );
};

const Toolbar = () => {
  return (
    <div className="w-[60px] h-[100%] bg-toolbar flex flex-col px-0.5 py-4 items-center">
      <PerfectScrollbar>
        {apps.map((app) => (
          <AppLink key={app.id} className="mb-2" link={app.link}>
            <Plus color="white" size={28} />
          </AppLink>
        ))}
      </PerfectScrollbar>

      <AppLink link="/create">
        <Plus color="white" size={28} />
      </AppLink>
    </div>
  );
};

export default Toolbar;
