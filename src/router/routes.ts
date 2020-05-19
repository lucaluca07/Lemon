interface IRoute {
  path: string;
  component: string;
  exact?: boolean;
}

const routes: IRoute[] = [
  { path: '/', component: 'tasks' },
  { path: '/inbox/:taskId?', component: 'tasks' },
  { path: '/today/:taskId', component: 'tasks' },
  { path: '/week/:taskId', component: 'tasks' },
  { path: '/calendar', component: 'tasks' },
  { path: '/project/:projectId/:taskId?', component: 'tasks' },
];

export default routes;
