interface IRoute {
  path: string;
  component: string;
  exact?: boolean;
}

const routes: IRoute[] = [
  { path: '/', component: 'index' },
  { path: '/about', component: 'about' },
];

export default routes;
