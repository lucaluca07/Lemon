interface IRoute {
  path: string;
  component: string;
  exact?: boolean;
}

const routes: IRoute[] = [
  { path: '/', component: 'tasks' },
  { path: '/about', component: 'tasks' },
];

export default routes;
