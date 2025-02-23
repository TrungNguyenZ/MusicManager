import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 2,
    label: 'Dashboard',
    icon: 'ri-dashboard-2-line',
    link: '/projects',
    isAdmin: true 
  },
  {
    id: 1,
    label: 'TableRevenue',
    icon: 'ri-line-chart-fill',
    link: '/revenue'
  },
  {
    id: 1,
    label: 'Users',
    icon: 'ri-user-line',
    link: '/user'
  }
];
