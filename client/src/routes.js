import Home from './pages/Home';
import LeagueOverview from './pages/LeagueOverview';
import PlayerDetails from './pages/PlayerDetails';
import PlayerStats from './pages/PlayerStats';
import TeamDetails from './pages/TeamDetails';
import MasterStats from './pages/MasterStats';
import AdminHome from './pages/AdminHome';

const routes = [
  {
    path: '/',
    Component: Home,
    exact: true,
    mainNav: true,
    label: 'Home',
  },
  {
    path: '/players/:name',
    Component: PlayerDetails,
    label: 'Player Details',
  },
  // {
  //   path: '/players',
  //   Component: PlayerStats,
  //   mainNav: true,
  //   label: 'Players',
  // },
  {
    path: '/teams/:name',
    Component: TeamDetails,
    label: 'Team Details',
  },
  {
    path: '/teams',
    Component: LeagueOverview,
    mainNav: true,
    label: 'League Overview',
  },
  {
    path: '/stats',
    Component: MasterStats,
    mainNav: true,
    label: 'Master Stats',
  },
  {
    path: '/stats',
    Component: MasterStats,
    mainNav: true,
    label: 'Master Stats',
  },
  {
    path: '/admin',
    Component: AdminHome,
    mainNav: false,
    label: 'Home',
  },
  {
    path: '/admin',
    Component: AdminHome,
    mainNav: false,
    label: 'Home',
  },
];

export default routes;
