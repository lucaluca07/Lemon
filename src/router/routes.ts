interface IRoute {
  path: string;
  component: string;
  exact?: boolean;
}

const routes: IRoute[] = [
  { path: '/', component: 'tasks' },
  { path: '/inbox', component: 'tasks' },
  { path: '/today', component: 'tasks' },
  { path: '/week', component: 'tasks' },
  { path: '/calendar', component: 'tasks' },
  { path: '/project/:id', component: 'tasks' },
];

export default routes;
